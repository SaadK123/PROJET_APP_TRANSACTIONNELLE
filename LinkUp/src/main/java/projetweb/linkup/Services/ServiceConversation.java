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
import projetweb.linkup.entities.Conversation;
import projetweb.linkup.entities.Etudiant;
import projetweb.linkup.entities.Groupe;

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

           Conversation conversation = mongoTemplate.findOne(query, Conversation.class);

           return conversation;
       } catch (Exception e) {
           throw new LinkUpException(ERREUR_TYPE.NON_EXISTANT,"conversation nexiste pas");
       }
   }
//   public SucessDTO InvitationConversation(RequeteInvitationDTO invitation){
//
//       Conversation conversation = getConversationById(invitation.getDestination());
//       Etudiant sender = serviceEtudiant.getEtudiantByUsername(invitation.getEtudiantNomUtilisateur());
//       Etudiant receiver =  serviceEtudiant.getEtudiantById(invitation.getEnvoyeurId());
//
//       
//
//
//   }
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
            supprimerConversation(conversation.getId().toString());
        } else if (estUnChef(conversation, etudiantId)) {
            // si le gars qui a quitter est le chef on choisi le nouveau chef
            conversation.setChef(conversation.getParticipants().stream().toList().get(0));
        }

        return new SucessDTO(true,"vous avez quitter la conversation");
    }
    @Transactional
    public void virerEtudiant(VirerEtudiantDTO virerDto){

    }
    @Transactional
    public boolean estUnChef(Conversation conversation, UUID etudiantId) {
        return conversation.getChef().equals(etudiantId);
    }
}
