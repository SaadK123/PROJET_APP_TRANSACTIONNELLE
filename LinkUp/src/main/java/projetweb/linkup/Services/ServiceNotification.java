package projetweb.linkup.Services;

import jakarta.persistence.Entity;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import projetweb.linkup.Enumerations.ERROR_TYPE;
import projetweb.linkup.Exceptions.LinkUpException;
import projetweb.linkup.Util.Utilitary;
import projetweb.linkup.entities.Notification;

import javax.swing.*;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public class ServiceNotification {
    @PersistenceContext
    private  EntityManager entityManager;
    private final ServiceEtudiant serviceEtudiant;

    public ServiceNotification(ServiceEtudiant serviceEtudiant) {
        this.serviceEtudiant = serviceEtudiant;
    }


    public List<Notification> getAllNotificationsFromUser(String idString) {


      boolean doesStudentExist  =  serviceEtudiant.doesStudentExist(idString);

      if(!doesStudentExist) {
          throw new LinkUpException(ERROR_TYPE.NON_EXISTANT, Utilitary.EXCEPTION_MESSAGE_NON_EXISTANT);

      }
      UUID  id = UUID.fromString(idString);
        List<Notification> notifications = entityManager
                .createQuery("select n from Notification n join n.receveurs e where e.id = :id", Notification.class)
                .setParameter("id",id).getResultList();

        return notifications;
    }

}
