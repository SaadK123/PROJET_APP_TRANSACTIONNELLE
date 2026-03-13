package projetweb.linkup.Services;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import projetweb.linkup.DTO.TYPES.RequestNotificationDTO;
import projetweb.linkup.DTO.ACTIONS.SucessDTO;
import projetweb.linkup.Enumerations.ERROR_TYPE;
import projetweb.linkup.Enumerations.NotificationType;
import projetweb.linkup.Exceptions.LinkUpException;
import projetweb.linkup.Util.Utilitary;
import projetweb.linkup.entities.Etudiant;
import projetweb.linkup.entities.Invitation;
import projetweb.linkup.entities.Notification;

import java.util.List;
import java.util.UUID;
@Service
public class ServiceNotification {
    @PersistenceContext
    private  EntityManager entityManager;
    private  final ServiceEtudiant serviceEtudiant;



    public ServiceNotification(ServiceEtudiant serviceEtudiant) {
        this.serviceEtudiant = serviceEtudiant;
    }
    public List<Notification> getAllNotificationsFromUser(String idEtudiant) {

     try {
         return serviceEtudiant.getEtudiantById(idEtudiant).getNotifications();
     }catch (Exception e) {


         throw new LinkUpException(ERROR_TYPE.NON_EXISTANT, Utilitary.EXCEPTION_MESSAGE_NON_EXISTANT);
     }
       
    }

    @Transactional
    public void setToWasSeen(String idNotification) {
        UUID id = UUID.fromString(idNotification);
        Notification notification = entityManager.find(Notification.class, id);
        if(notification == null) {
            throw new LinkUpException(ERROR_TYPE.NON_EXISTANT, Utilitary.EXCEPTION_MESSAGE_NON_EXISTANT);

        }

        notification.setEstVu(true);
        entityManager.persist(notification);
    }

    @Transactional
        public void deleteNotification(String idNotification) {
        UUID id = UUID.fromString(idNotification);
        Notification notification = entityManager.find(Notification.class, id);
        if(notification == null) {
            throw new LinkUpException(ERROR_TYPE.NON_EXISTANT, Utilitary.EXCEPTION_MESSAGE_NON_EXISTANT);

        }
        entityManager.remove(notification);
    }



    @Transactional
    public SucessDTO addNotificationToStudent(Invitation invitation,Etudiant receveur) {

       receveur.getNotifications().add(invitation);

        return new SucessDTO(true,"Notification ajoutée");
    }


}
