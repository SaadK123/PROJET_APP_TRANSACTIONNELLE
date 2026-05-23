package projetweb.linkup.Services;

import com.mongodb.client.MongoClient;
import jakarta.transaction.Transactional;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;
import projetweb.linkup.DTO.ACTIONS.CreationConversationDTO;
import projetweb.linkup.DTO.ACTIONS.EnvoyerMessageDTO;
import projetweb.linkup.DTO.ACTIONS.QuitterGroupeDTO;
import projetweb.linkup.DTO.ACTIONS.SucessDTO;
import projetweb.linkup.DTO.ACTIONS.VirerEtudiantDTO;
import projetweb.linkup.DTO.TYPES.RetourInvitationDTO;
import projetweb.linkup.Enumerations.ERREUR_TYPE;
import projetweb.linkup.Enumerations.TypeInvitation;
import projetweb.linkup.Exceptions.LinkUpException;
import projetweb.linkup.entities.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class ServiceConversation   {

    private final MongoTemplate mongoTemplate;
    private final ServiceEtudiant serviceEtudiant;
    private final ServiceNotification serviceNotification;

    public ServiceConversation(MongoTemplate mongoTemplate, ServiceEtudiant serviceEtudiant, MongoClient mongo, ServiceNotification serviceNotification) {
        this.mongoTemplate = mongoTemplate;
        this.serviceEtudiant = serviceEtudiant;
        this.serviceNotification = serviceNotification;
    }

    @Transactional
    public SucessDTO creerConversation(CreationConversationDTO dto) {
        try {
            UUID chefId = UUID.fromString(dto.chefId());

            UUID idConversation = dto.idConversation() == null
                    ? null
                    : UUID.fromString(dto.idConversation());

            Conversation conversation = dto.idConversation() == null
                    ? new Conversation(chefId, dto.nomConversation())
                    : new Conversation(idConversation, chefId, dto.nomConversation());

            mongoTemplate.insert(conversation);

            return new SucessDTO(true, "Success in creerConversation");
        } catch (Exception e) {
            return new SucessDTO(false, e.getMessage());
        }
    }

    @Transactional
    public SucessDTO supprimerConversation(String conversationId) {
        Conversation conversation = getConversationById(conversationId);

        try {
            mongoTemplate.remove(conversation);
        } catch (Exception e) {
            return new SucessDTO(false, "Error in supprimerconversation");
        }

        return new SucessDTO(true, "Success in supprimerConversation");
    }

    @Transactional
    public Conversation getConversationById(String conversationIdString) {
        try {
            UUID conversationId = UUID.fromString(conversationIdString);

            Query query = new Query(
                    Criteria.where("id").is(conversationId)
            );

            Conversation conversation = mongoTemplate.findOne(query, Conversation.class);

            if (conversation == null) {
                throw new LinkUpException(
                        ERREUR_TYPE.NON_EXISTANT,
                        "conversation nexiste pas"
                );
            }

            return conversation;
        } catch (LinkUpException e) {
            throw e;
        } catch (Exception e) {
            throw new LinkUpException(
                    ERREUR_TYPE.NON_EXISTANT,
                    "conversation nexiste pas"
            );
        }
    }

    @Transactional
    public SucessDTO invitationConversation(
            RetourInvitationDTO invitationDTO,
            ServiceEtudiant serviceEtudiant,
            ServiceNotification serviceNotification
    ) {
        Conversation conversation = getConversationById(invitationDTO.getDestination());


        Etudiant recevant = serviceEtudiant.getEtudiantByUsername(invitationDTO.getEtudiantNomUtilisateur());


        if(serviceNotification.verifierSiDestinationEstDansUneDesNotifications(conversation.getId().toString()
                ,recevant.getId().toString())) {
            throw new LinkUpException(
                    ERREUR_TYPE.DUPLICATION,
                    "cet etudiant est deja dans la conversation"
            );
        }
        UUID sender = UUID.fromString(invitationDTO.getEnvoyeurId());

        if (conversation.isEstConversationGroupe()) {
            return new SucessDTO(false, "Impossible d'inviter à une conversation qui fait partie d'un groupe");
        }

        if (!estUnChef(conversation, sender)) {
            return new SucessDTO(false, "Impossible d'inviter sans être le chef");
        }

        if (recevant.getId().equals(sender)) {
            return new SucessDTO(false, "Impossible de s'inviter soi-même à une conversation");
        }

        if (conversation.getParticipants().contains(recevant.getId())) {
            return new SucessDTO(false, "impossible d'inviter un étudiant déjà dans la conversation");
        }

        Etudiant envoyeur = serviceEtudiant.getEtudiantById(sender.toString());

        Invitation invitation = new Invitation(
                conversation.getId(),
                envoyeur,
                invitationDTO.getType(),
                invitationDTO.getTitre(),
                invitationDTO.getMessage(),
                TypeInvitation.CONVERSATION
        );

        serviceNotification.addNotificationToStudent(invitation, recevant);

        return new SucessDTO(
                true,
                "Étudiant " + invitationDTO.getEtudiantNomUtilisateur() + " invité à la conversation " + conversation.getNom() + " avec succès"
        );
    }

    @Transactional
    public SucessDTO rejoindreConversation(RetourInvitationDTO invitation, ServiceNotification serviceNotification) {
        UUID etudiantId = serviceEtudiant.getEtudiantByUsername(invitation.getEtudiantNomUtilisateur()).getId();
        Conversation conversation = getConversationById(invitation.getDestination());

        if (conversation.getParticipants().contains(etudiantId)) {
            return new SucessDTO(false, "cet etudiant est deja dans la conversation");
        }

        conversation.getParticipants().add(etudiantId);
        mongoTemplate.save(conversation);

        serviceNotification.deleteNotification(invitation.getId());

        return new SucessDTO(true, "ajouté à la conversation " + conversation.getNom());
    }

    @Transactional
    public SucessDTO quitterConversation(QuitterGroupeDTO quitterDto) {
        UUID etudiantId = UUID.fromString(quitterDto.idEtudiant());
        Conversation conversation = getConversationById(quitterDto.idGroupe());

        if (conversation.isEstConversationGroupe()) {
            return new SucessDTO(false, "Impossible de quitter une conversation dans un groupe");
        }

        conversation.getParticipants().remove(etudiantId);

        if (conversation.getParticipants().isEmpty()) {
            supprimerConversation(conversation.getId().toString());
            return new SucessDTO(true, "vous avez quitter la conversation");
        }

        if (estUnChef(conversation, etudiantId)) {
            conversation.setChef(conversation.getParticipants().stream().toList().get(0));
        }

        mongoTemplate.save(conversation);

        return new SucessDTO(true, "vous avez quitter la conversation");
    }

    @Transactional
    public SucessDTO virerEtudiantConversation(VirerEtudiantDTO virerDto) {
        UUID idVireur = UUID.fromString(virerDto.etudiantQuiVireId());
        String nomUtilisateur = virerDto.nomUtilisateur();
        String conversationId = virerDto.groupid();

        Etudiant vireur = serviceEtudiant.getEtudiantById(idVireur.toString());
        Conversation conversation = getConversationById(conversationId);

        if (conversation.isEstConversationGroupe()) {
            throw new LinkUpException(
                    ERREUR_TYPE.ERREUR_METIER_LOGIQUE,
                    "Impossible de virer un étudiant d'une conversation dans un groupe"
            );
        }

        if (!conversation.getChef().equals(idVireur)) {
            throw new LinkUpException(
                    ERREUR_TYPE.ERREUR_METIER_LOGIQUE,
                    "Seul le chef peut virer un etudiant"
            );
        }

        if (vireur.getNomUtilisateur().equals(nomUtilisateur)) {
            throw new LinkUpException(
                    ERREUR_TYPE.ERREUR_METIER_LOGIQUE,
                    "Vous ne pouvez pas vous virer vous meme"
            );
        }

        if (!serviceEtudiant.etudiantExiste(nomUtilisateur)) {
            throw new LinkUpException(
                    ERREUR_TYPE.ERREUR_METIER_LOGIQUE,
                    "Impossible de virer un étudiant qui n'existe pas"
            );
        }

        Etudiant etudiantAVirer = serviceEtudiant.getEtudiantByUsername(nomUtilisateur);

        conversation.getParticipants().remove(etudiantAVirer.getId());
        mongoTemplate.save(conversation);

        return new SucessDTO(true, "L'etudiant a été viré de la conversation");
    }

    @Transactional
    public SucessDTO ajouterEtudiantConversationGroupe(String conversationId, String idEtudiant) {
        Conversation conversation = getConversationById(conversationId);

        if (!conversation.isEstConversationGroupe()) {
            return new SucessDTO(false, "Cette conversation n'est pas une conversation de groupe");
        }

        UUID etudiantId = UUID.fromString(idEtudiant);

        conversation.getParticipants().add(etudiantId);
        mongoTemplate.save(conversation);

        return new SucessDTO(true, "etudiant ajoute a la conversation du groupe");
    }

    @Transactional
    public SucessDTO retirerEtudiantConversationGroupe(String conversationId, String idEtudiant) {
        Conversation conversation = getConversationById(conversationId);

        if (!conversation.isEstConversationGroupe()) {
            return new SucessDTO(false, "Cette conversation n'est pas une conversation de groupe");
        }

        UUID etudiantId = UUID.fromString(idEtudiant);

        conversation.getParticipants().remove(etudiantId);
        mongoTemplate.save(conversation);

        return new SucessDTO(true, "etudiant retire de la conversation du groupe");
    }

    @Transactional
    public SucessDTO envoyerMessage(EnvoyerMessageDTO envoyerMessageDTO) {
        Conversation conversation = getConversationById(envoyerMessageDTO.conversationId());
        Message message = envoyerMessageDTO.message();

        if (message == null) {
            return new SucessDTO(false, "message manquant");
        }

        if (message.getEnvoyeurId() == null) {
            return new SucessDTO(false, "envoyeur manquant");
        }

        if (!conversation.getParticipants().contains(message.getEnvoyeurId())) {
            return new SucessDTO(false, "cet etudiant ne fait pas partie de la conversation");
        }

        if (message.getId() == null) {
            message.setId(UUID.randomUUID());
        }

        if (message.getTempsEnvoi() == null) {
            message.setTempsEnvoi(LocalDateTime.now());
        }

        if (conversation.getMessages() == null) {
            conversation.setMessages(new ArrayList<>());
        }

        conversation.getMessages().add(message);
        mongoTemplate.save(conversation);

        return new SucessDTO(true, "Message envoyé avec succès");
    }

    @Transactional
    protected boolean estUnChef(Conversation conversation, UUID etudiantId) {
        return conversation.getChef().equals(etudiantId);
    }

    public List<Conversation> getConversationsParEtudiant(String idEtudiant) {
        UUID uuidEtudiant = UUID.fromString(idEtudiant);

        Query query = new Query();
        query.addCriteria(Criteria.where("participants").is(uuidEtudiant));

        return mongoTemplate.find(query, Conversation.class);
    }


}