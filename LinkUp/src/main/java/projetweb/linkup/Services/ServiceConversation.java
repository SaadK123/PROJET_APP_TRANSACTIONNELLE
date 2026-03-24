package projetweb.linkup.Services;


import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;

@Service
public class ServiceConversation {
   private final MongoTemplate mongoTemplate;

   public ServiceConversation(MongoTemplate mongoTemplate) {
       this.mongoTemplate = mongoTemplate;
   }
}
