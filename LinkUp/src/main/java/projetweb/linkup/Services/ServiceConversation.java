package projetweb.linkup.Services;


import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;
import projetweb.linkup.DTO.ACTIONS.SucessDTO;
import projetweb.linkup.DTO.TYPES.RequeteInvitationDTO;

@Service
public class ServiceConversation {
   private final MongoTemplate mongoTemplate;

   public ServiceConversation(MongoTemplate mongoTemplate) {
       this.mongoTemplate = mongoTemplate;
   }

   public SucessDTO creerConversation(RequeteInvitationDTO invitation) {
    return null;
   }
}
