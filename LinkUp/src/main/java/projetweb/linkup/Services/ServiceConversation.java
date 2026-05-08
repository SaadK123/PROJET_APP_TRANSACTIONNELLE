package projetweb.linkup.Services;


import jakarta.persistence.EntityManager;
import jakarta.persistence.NoResultException;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;
import projetweb.linkup.DTO.ACTIONS.*;
import projetweb.linkup.DTO.TYPES.RequeteInvitationDTO;
import projetweb.linkup.Enumerations.ERREUR_TYPE;
import projetweb.linkup.Exceptions.LinkUpException;
import projetweb.linkup.Util.Utilitary;
import projetweb.linkup.entities.*;

import java.util.UUID;

@Service
public class ServiceConversation {



   private final MongoTemplate mongoTemplate;
   private final ServiceEtudiant serviceEtudiant;

   public ServiceConversation(MongoTemplate mongoTemplate, ServiceEtudiant serviceEtudiant) {
       this.mongoTemplate = mongoTemplate;
       this.serviceEtudiant = serviceEtudiant;
   }
    @Transactional
   public SucessDTO creerConversation(CreationConversationDTO dto, UUID id) {
        try {
            UUID chefId = UUID.fromString(dto.chefId());

            Conversation conversation = id==null ? new Conversation(chefId, dto.nomConversation()) : new Conversation(id, chefId, dto.nomConversation());
            mongoTemplate.insert(conversation);

            return new SucessDTO(true, "Success in creerConversation");
        } catch (Exception e) {
            return new SucessDTO(false, "Error in creerConversation");
        }
   }



    @Transactional
    public SucessDTO supprimerConversation(String conversationId){
        Conversation conversation = getConversationById(conversationId);
        // Tenter de supprimer la conversation
        try {
            mongoTemplate.remove(conversation);
        } catch(Exception e){
            return new SucessDTO(false, "Error in supprimerconversation");
        }
        return new SucessDTO(true, "Success in supprimerConversation");
    }
//   @Transactional
//   public SucessDTO supprimerConversationAvecDTO(SupprimerGroupeDTO groupe){
//       Conversation conversation = getConversationById(groupe.groupeId()); // Trouver la conversation
//       // Tenter de supprimer la conversation
//       try {
//           mongoTemplate.remove(conversation);
//       } catch(LinkUpException e){
//           return new SucessDTO(false, "Error in supprimerconversation");
//       }
//       return new SucessDTO(true, "Success in supprimerConversation");
//   }
   @Transactional
   public Conversation getConversationById(String ConversationIdString){
       // Tenter de trouver une conversation
       try{
           UUID conversationId = UUID.fromString(ConversationIdString);
           // Créer la conversation et la retourner en cas de succès
           Query query = new Query(
                   org.springframework.data.mongodb.core.query.Criteria.where("id").is(conversationId)
           );

           return mongoTemplate.findOne(query, Conversation.class);
       } catch (Exception e) {
           throw new LinkUpException(ERREUR_TYPE.NON_EXISTANT,"conversation nexiste pas");
       }
   }

   @Transactional
    public SucessDTO invitationConversation(RequeteInvitationDTO invitation, ServiceEtudiant serviceEtudiant, ServiceNotification serviceNotification){

        Conversation conversation = getConversationById(invitation.getDestination());
        Etudiant receiver = serviceEtudiant.getEtudiantByUsername(invitation.getEtudiantNomUtilisateur());
        UUID sender =  UUID.fromString(invitation.getEnvoyeurId());
        // Vérifier si la conversation fait partie d'un groupe
        if(conversation.isEstConversationGroupe()){
            return new SucessDTO(false, "Impossible d'inviter à une conversation qui fait partie d'un groupe");
            // Vérifier si celui qui invite est chef
        } else if(!estUnChef(conversation, sender)){
            return new SucessDTO(false, "Impossible d'inviter sans être le chef");
            // Vérifier si l'étudiant tente de s'inviter lui-même
        } else if (receiver.getId() == sender){
            return  new SucessDTO(false, "Impossible de s'inviter soi-même à une conversation");
            // Vérifier si l'étudiant tente d'inviter un étudiant déjà dans la conversation
        } else if (conversation.getParticipants().contains(receiver)){
            return  new SucessDTO(false, "impossible d'inviter un étudiant déjà dans la conversation");
        }

        // Créer une notification
        Notification notification = new Notification(
                invitation.getMessage(),
                invitation.getTitre(),
                invitation.getType());
        // Envoyer la notification de l'invitation à l'étudiant receiver
        serviceNotification.addNotificationToStudent(notification, receiver);
        return  new SucessDTO(true, "Étudiant " + invitation.getEtudiantNomUtilisateur() + " invité à la conversation " + conversation.getNom() + " avec succès");
    }
    @Transactional
    public SucessDTO rejoindreConversation(INVITATION_GROUPE_DTO invitation,ServiceNotification serviceNotification){

    UUID etudiantId = serviceEtudiant.getEtudiantById((invitation.idEtudiant())).getId();
    Conversation conversation = getConversationById(invitation.idGroupe());
    conversation.getParticipants().add(etudiantId);
    serviceNotification.supprimerInvitationParDestination(invitation.idGroupe(), etudiantId);


    return new SucessDTO(true,  " ajouté au groupe " + invitation.idGroupe());
}
    @Transactional
    public SucessDTO quitterConversation(QuitterGroupeDTO quitterDto){
       // Vérifier que la conversation ne fait pas partie d'un groupe


       UUID etudiantId = UUID.fromString(quitterDto.idEtudiant());
       Conversation conversation = getConversationById(quitterDto.idGroupe());
        if(conversation.isEstConversationGroupe()){
            return new SucessDTO(false, "Impossible de quitter une conversation dans un groupe");
        }


        // on retire l'etudiant de la conversation
        conversation.getParticipants().remove(etudiantId);

        if (conversation.getParticipants().isEmpty()) {
            // si la liste est vide alors on supprime la conversation
            supprimerConversation(conversation.getId().toString());
        } else if (estUnChef(conversation, etudiantId)) {
            // si le gars qui a quitter est le chef on choisi le nouveau chef
            conversation.setChef(conversation.getParticipants().stream().toList().get(0));
        }

        return new SucessDTO(true,"vous avez quitter la conversation");
    }
    @Transactional
    public SucessDTO virerEtudiantConversation(VirerEtudiantDTO virerDto){

        UUID idVireur = UUID.fromString(virerDto.etudiantQuiVireId());
        String nomUtilisateur = virerDto.nomUtilisateur();

        String conversationId = virerDto.groupid();


        Etudiant vireur = serviceEtudiant.getEtudiantById(idVireur.toString());


        Conversation conversation = getConversationById(conversationId);

        // Vérifier si la conversation ne fait pas partie d'un groupe
        if(conversation.isEstConversationGroupe()) {
            throw new LinkUpException(ERREUR_TYPE.ERREUR_METIER_LOGIQUE, "Impossible de virer un étudiant d'une conversation dans un groupe");
        } else if(!conversation.getChef().equals(idVireur)){
            throw new LinkUpException(ERREUR_TYPE.ERREUR_METIER_LOGIQUE, "Seul le chef peut virer un etudiant");
        }else if(vireur.getNomUtilisateur().equals(nomUtilisateur)){
            throw new LinkUpException(ERREUR_TYPE.ERREUR_METIER_LOGIQUE, "Vous ne pouvez pas vous virer vous meme");
            // Vérifier si l'étudiant viré existe
        } else if(serviceEtudiant.etudiantExiste(nomUtilisateur)) {
            throw new LinkUpException(ERREUR_TYPE.ERREUR_METIER_LOGIQUE, "Impossible de virer un étudiant qui n'existe pas");
        }

        conversation.getParticipants().remove(serviceEtudiant.getEtudiantByUsername(nomUtilisateur).getId());

        return new SucessDTO(true, "L'etudiant  a été viré de la conversation ");


    }
    @Transactional
    public SucessDTO envoyerMessage(EnvoyerMessageDTO envoyerMessageDTO){
       Conversation conversation = getConversationById(envoyerMessageDTO.conversationId());
       conversation.getMessages().add(envoyerMessageDTO.message());
       return  new SucessDTO(true, "Message envoyé avec succès");
    }
    @Transactional
    private boolean estUnChef(Conversation conversation, UUID etudiantId) {
        return conversation.getChef().equals(etudiantId);
    }
}
