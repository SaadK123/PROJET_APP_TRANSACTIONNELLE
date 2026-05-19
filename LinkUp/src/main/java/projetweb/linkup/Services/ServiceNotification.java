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


    public List<Notification> getToutNotificationsDeUser(String idEtudiant) {
   // ici on recupere tout less notifications  de lutilisateur
     try {
         return serviceEtudiant.getEtudiantById(idEtudiant).getNotifications();
     }catch (Exception e) {


         throw new LinkUpException(ERREUR_TYPE.NON_EXISTANT, Utilitary.EXCEPTION_MESSAGE_NON_EXISTANT);
     }
       
    }

    @Transactional
    public SucessDTO supprimerToutNotificationsDeEtudiant(String idEtudiant) {
        try {
            Etudiant etudiant = serviceEtudiant.getEtudiantById(idEtudiant);

            etudiant.getNotifications().clear();

            entityManager.createQuery("delete from Notification n where n.etudiant.id = :id")
                    .setParameter("id", etudiant.getId())
                    .executeUpdate();

            entityManager.createQuery("delete from Invitation i where i.envoyeur.id = :id")
                    .setParameter("id", etudiant.getId())
                    .executeUpdate();

            entityManager.flush();

            return new SucessDTO(true, "Toutes les notifications ont été supprimées");
        } catch (Exception e) {
            throw new LinkUpException(
                    ERREUR_TYPE.NON_EXISTANT,
                    Utilitary.EXCEPTION_MESSAGE_NON_EXISTANT
            );
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


    // select n from Notification where n.sender.id := id or n.receveur.id := id


    @Transactional
    public SucessDTO addNotificationToStudent(Notification notification,Etudiant receveur) {
       // permet de ajouter une notification
       receveur.getNotifications().add(notification);

        return new SucessDTO(true,"Notification ajoutée");
    }

    public boolean verifierEtudiantDejaInviter(Etudiant aInviter,UUID destinationId) {
        for(Notification notification : aInviter.getNotifications()) {
            if(notification instanceof Invitation invitation && invitation.getGroupe()
                    .getId().equals(destinationId)) {
                return false;
            }
        }
        return true;
    }

    public void supprimerInvitationParDestination(String destination,UUID idEtudiant) {
        Etudiant etudiant = serviceEtudiant.getEtudiantById(idEtudiant.toString());
        List<Notification> notifications = etudiant.getNotifications();
        for (Notification notification : notifications) {
            if(notification instanceof Invitation invitation && invitation.getGroupe()
                    .getId().toString().equals(destination)) {
                deleteNotification(notification.getId().toString());
            }
        }

    }








}
