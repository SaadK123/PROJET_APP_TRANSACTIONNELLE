package projetweb.linkup.Services;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import projetweb.linkup.DTO.ACTIONS.SucessDTO;
import projetweb.linkup.Enumerations.ERREUR_TYPE;
import projetweb.linkup.Exceptions.LinkUpException;
import projetweb.linkup.Util.Utilitary;
import projetweb.linkup.entities.Etudiant;
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

    public List<Notification> getToutNotificationsDeUser(String idEtudiant) {
   // ici on recupere tout less notifications  de lutilisateur
     try {
         return serviceEtudiant.getEtudiantById(idEtudiant).getNotifications();
     }catch (Exception e) {


         throw new LinkUpException(ERREUR_TYPE.NON_EXISTANT, Utilitary.EXCEPTION_MESSAGE_NON_EXISTANT);
     }
       
    }

    @Transactional
    public SucessDTO setToWasSeen(String idNotification) {
        // permet de mettre une notification a vu (pas encore utilise)
        UUID id = UUID.fromString(idNotification);
        Notification notification = entityManager.find(Notification.class, id);
        if(notification == null) {
            throw new LinkUpException(ERREUR_TYPE.NON_EXISTANT, Utilitary.EXCEPTION_MESSAGE_NON_EXISTANT);

        }

        notification.setEstVu(true);
        entityManager.persist(notification);
        return new SucessDTO(true,"");
    }

    @Transactional
        public SucessDTO deleteNotification(String idNotification) {
        // permet de retirer une notification avec son id
        UUID id = UUID.fromString(idNotification);
        Notification notification = entityManager.find(Notification.class, id);
        if(notification == null) {
            throw new LinkUpException(ERREUR_TYPE.NON_EXISTANT, Utilitary.EXCEPTION_MESSAGE_NON_EXISTANT);

        }
        entityManager.remove(notification);

        return new SucessDTO(true,"La notification a ete retirer");
    }



    @Transactional
    public SucessDTO addNotificationToStudent(Notification notification,Etudiant receveur) {
       // permet de ajouter une notification
       receveur.getNotifications().add(notification);

        return new SucessDTO(true,"Notification ajoutée");
    }





}
