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
import projetweb.linkup.DTO.TYPES.RequeteNotificationDTO;
import projetweb.linkup.Enumerations.ERREUR_TYPE;
import projetweb.linkup.Exceptions.LinkUpException;
import projetweb.linkup.Util.Utilitary;
import projetweb.linkup.entities.Conversation;
import projetweb.linkup.entities.Etudiant;
import projetweb.linkup.entities.Groupe;
import projetweb.linkup.entities.Notification;

import java.util.UUID;

@Service
public class ServiceConversation {

    @PersistenceContext
    private EntityManager entityManager;

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

            Conversation conversation = id==null ? new Conversation(chefId, dto.nomGroupe()) : new Conversation(id, chefId, dto.nomGroupe());
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

           Conversation conversation = mongoTemplate.findOne(query, Conversation.class);

           return conversation;
       } catch (Exception e) {
           throw new LinkUpException(ERREUR_TYPE.NON_EXISTANT,"conversation nexiste pas");
       }
   }
   public SucessDTO invitationConversation(RequeteInvitationDTO invitation, ServiceEtudiant serviceEtudiant, ServiceNotification serviceNotification, RequeteNotificationDTO notificationDTO){

       Conversation conversation = getConversationById(invitation.getDestination());
       UUID receiver = serviceEtudiant.getEtudiantByUsername(invitation.getEtudiantNomUtilisateur()).getId();
       UUID sender =  serviceEtudiant.getEtudiantById(invitation.getEnvoyeurId()).getId();
       // Vérifier si la conversation fait partie d'un groupe
       if(conversation.isEstConversationGroupe()){
           return new SucessDTO(false, "Impossible d'inviter à une conversation qui fait partie d'un groupe");
           // Vérifier si celui qui invite est chef
       } else if(!estUnChef(conversation, sender)){
           return new SucessDTO(false, "Impossible d'inviter sans être le chef");
           // Vérifier si l'étudiant tente de s'inviter lui-même
       } else if (receiver == sender){
           return  new SucessDTO(false, "Impossible de s'inviter soi-même à une conversation");
           // Vérifier si l'étudiant tente d'inviter un étudiant déjà dans la conversation
       } else if (conversation.getParticipants().contains(receiver)){
           return  new SucessDTO(false, "impossible d'inviter un étudiant déjà dans la conversation");
       }
       // Récupérer l'objet de l'étudiant receiver
       Etudiant receiverEtudiant = serviceEtudiant.getEtudiantById(receiver.toString());
       // Créer une notification
       Notification notification = new Notification(
               notificationDTO.getMessage(),
               notificationDTO.getTitre(),
               notificationDTO.getType());
       // Envoyer la notification de l'invitation à l'étudiant receiver
       serviceNotification.addNotificationToStudent(notification, receiverEtudiant);
       return  new SucessDTO(true, "Étudiant " + invitation.getEtudiantNomUtilisateur() + " invité à la conversation " + conversation.getNom() + " avec succès");
   }
    @Transactional
    public SucessDTO rejoindreConversation(INVITATION_GROUPE_DTO invitation){

    UUID etudiantId = serviceEtudiant.getEtudiantById((invitation.idEtudiant())).getId();
    Conversation conversation = getConversationById(invitation.idGroupe());
    conversation.getParticipants().add(etudiantId);
    return new SucessDTO(true, invitation.getClass() + " ajouté au groupe " + invitation.idGroupe());
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
            SucessDTO result = supprimerConversation(conversation.getId().toString());
            if (!result.success()) {
                return new SucessDTO(false, "Erreur dans supression de la conversation, alors impossible de quitter la conversation");
            }
        } else if (estUnChef(conversation, etudiantId)) {
            // si le gars qui a quitter est le chef on choisi le nouveau chef
            conversation.getParticipants().stream().findFirst().orElse(null);
        }
        mongoTemplate.save(conversation);
        return new SucessDTO(true,"vous avez quitter la conversation");
    }
    @Transactional
    public SucessDTO virerEtudiant(VirerEtudiantDTO virerDto, ServiceEtudiant serviceEtudiant){
       // Trouver le l'étudiant viré et l'étudiant qui vire
       UUID vireur = UUID.fromString(virerDto.etudiantQuiVireId());
       UUID etudiantVirer = serviceEtudiant.getEtudiantByUsername(virerDto.nomUtilisateur()).getId();
       // Trouver la conversation
       Conversation conversation = getConversationById(virerDto.groupid());
       // Vérifier si la conversation ne fait pas partie d'un groupe
       if(conversation.isEstConversationGroupe()){
           return new SucessDTO(false, "Impossible de virer un étudiant d'une conversation dans un groupe");
           // Vérifer si le vireur est chef
       } else if(!estUnChef(conversation, vireur)){
           return new SucessDTO(false, "Impossible de virer un étudiant sans être le chef");
           // Vérifier si l'étudiant viré existe
       } else if(serviceEtudiant.etudiantExiste(etudiantVirer.toString())){
           return new SucessDTO(false, "Impossible de virer un étudiant qui n'existe pas");
           // Vérifier si le vireur tente de se virer
       } else if(etudiantVirer == vireur){
           return  new SucessDTO(false, "Impossible de se virer soi-même");
       }
       // Virer l'étudiant
       conversation.getParticipants().remove(etudiantVirer);
       return  new SucessDTO(true, "Etudiant " + virerDto.nomUtilisateur() + " Viré avec succès");
    }
    @Transactional
    private boolean estUnChef(Conversation conversation, UUID etudiantId) {
        return conversation.getChef().equals(etudiantId);
    }
}
