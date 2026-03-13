package projetweb.linkup.Services;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import jdk.jshell.execution.Util;
import projetweb.linkup.DTO.ACTIONS.SucessDTO;
import projetweb.linkup.Enumerations.ERROR_TYPE;
import projetweb.linkup.Exceptions.LinkUpException;
import projetweb.linkup.Util.Utilitary;
import projetweb.linkup.entities.Etudiant;
import projetweb.linkup.entities.Notification;

import java.util.List;
import java.util.UUID;

public class ServiceNotification {
    @PersistenceContext
    private  EntityManager entityManager;
    private  final ServiceEtudiant serviceEtudiant;



    public ServiceNotification(ServiceEtudiant serviceEtudiant) {
        this.serviceEtudiant = serviceEtudiant;
    }
    public List<Notification> getAllNotificationsFromUser(String idEtudiant) {

     try {
         return entityManager
                 .createQuery("select n from Notification n join n.receveurs e where e.id = :id", Notification.class)
                 .setParameter("id",idEtudiant).getResultList();
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
    public SucessDTO addNotificationToStudent(String idEtudiant) {

    }


}
