package projetweb.linkup.Services;


import jakarta.persistence.EntityManager;
import jakarta.persistence.NoResultException;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.BasicQuery;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;
import projetweb.linkup.DTO.ACTIONS.CreationDeGroupeDTO;
import projetweb.linkup.DTO.ACTIONS.INVITATION_GROUPE_DTO;
import projetweb.linkup.DTO.ACTIONS.SucessDTO;
import projetweb.linkup.DTO.ACTIONS.SupprimerGroupeDTO;
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

    @PersistenceContext
    private EntityManager entityManager;

   private final MongoTemplate mongoTemplate;
   private final ServiceEtudiant serviceEtudiant;

   public ServiceConversation(MongoTemplate mongoTemplate, ServiceEtudiant serviceEtudiant) {
       this.mongoTemplate = mongoTemplate;
       this.serviceEtudiant = serviceEtudiant;
   }
    @Transactional
   public SucessDTO creerConversation(CreationDeGroupeDTO groupe) {
       Etudiant chef = serviceEtudiant.getEtudiantById(groupe.chefID());
       Conversation conversation = new Conversation(chef.getId()); // Créer la conversation
       //Vérifier l'insertion de la conversation
       try {
           mongoTemplate.insert(conversation); // Insérer la conversation
       }catch(Exception e){
           return new SucessDTO(false,"Error in creerConversation");

       }
    return new SucessDTO(true, "Success in creerConversation");
   }
    @Transactional
    public SucessDTO supprimerConversation(String conversationId, ServiceGroupe groupeService){
        Conversation conversation = getConversationById(conversationId);
        // Tenter de supprimer la conversation
        try {

            if(!UUID.fromString(conversationId).equals(groupeService.getGroupeById(conversationId).getId())) {
                mongoTemplate.remove(conversation);
            }
        } catch(Exception e){
            return new SucessDTO(false, "Erreur dans creerConversation");
        }
        return new SucessDTO(true, "Succès dans supprimerConversation");
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
       try{
           // Récupérer la conversation et la retourner en cas de succès
           UUID conversationId = UUID.fromString(ConversationIdString);
           Query query = new Query();
           query.addCriteria(Criteria.where("id").is(conversationId));
           return mongoTemplate.findOne(query, Conversation.class);
       } catch (Exception ex) {
           throw  new LinkUpException(ERREUR_TYPE.NON_EXISTANT, Utilitary.EXCEPTION_UTILISATEUR_NON_TROUVER);
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
    public boolean estUnChef(Conversation conversation, Etudiant etudiant) {
        return conversation.getChef().equals(etudiant.getId());
    }
}
