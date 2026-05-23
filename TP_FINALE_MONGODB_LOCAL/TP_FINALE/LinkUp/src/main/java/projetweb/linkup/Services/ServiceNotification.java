package projetweb.linkup.Services;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import projetweb.linkup.DTO.ACTIONS.SucessDTO;
import projetweb.linkup.DTO.TYPES.RetourInvitationDTO;
import projetweb.linkup.DTO.TYPES.RetourNotificationDTO;
import projetweb.linkup.Enumerations.ERREUR_TYPE;
import projetweb.linkup.Exceptions.LinkUpException;
import projetweb.linkup.Util.Utilitary;
import projetweb.linkup.entities.Etudiant;
import projetweb.linkup.entities.Invitation;
import projetweb.linkup.entities.Notification;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class ServiceNotification {
    @PersistenceContext
    private EntityManager entityManager;

    private final ServiceEtudiant serviceEtudiant;

    public ServiceNotification(ServiceEtudiant serviceEtudiant) {
        this.serviceEtudiant = serviceEtudiant;
    }

    public List<RetourInvitationDTO> getToutNotificationsDeUser(String idEtudiant) {
        Etudiant etudiant = serviceEtudiant.getEtudiantById(idEtudiant);

        List<Notification> notifications = etudiant.getNotifications();
        List<RetourInvitationDTO> retours = new ArrayList<>();

        for (Notification notification : notifications) {
            if (notification instanceof Invitation invitation) {
                String destination = invitation.getDestination() == null
                        ? null
                        : invitation.getDestination().toString();

                String envoyeurId = invitation.getEnvoyeur() == null || invitation.getEnvoyeur().getId() == null
                        ? null
                        : invitation.getEnvoyeur().getId().toString();

                retours.add(new RetourInvitationDTO(
                        notification.getId().toString(),
                        etudiant.getNomUtilisateur(),
                        notification.getMessage(),
                        notification.getType(),
                        destination,
                        notification.getTitre(),
                        envoyeurId,
                        invitation.getTypeInvitation()
                ));
            } else {
                retours.add(new RetourInvitationDTO(
                        notification.getId().toString(),
                        etudiant.getNomUtilisateur(),
                        notification.getMessage(),
                        notification.getType(),
                        null,
                        notification.getTitre(),
                        null,
                        null
                ));
            }
        }

        return retours;
    }
    @Transactional
    public void supprimerToutNotificationsDeEtudiant(String idEtudiant) {
        try {
            Etudiant etudiant = serviceEtudiant.getEtudiantById(idEtudiant);

            List<Notification> notifications = new ArrayList<>(etudiant.getNotifications());

            for (Notification notification : notifications) {
                etudiant.getNotifications().remove(notification);

                Notification notificationCourante = entityManager.find(Notification.class, notification.getId());

                if (notificationCourante != null) {
                    entityManager.remove(notificationCourante);
                }
            }

            entityManager.flush();

            new SucessDTO(true, "Toutes les notifications ont été supprimées");
        } catch (Exception e) {
            throw new LinkUpException(
                    ERREUR_TYPE.ERREUR_INTERNE,
                    e.getMessage()
            );
        }
    }
    @Transactional
    public SucessDTO setToWasSeen(String idNotification) {
        // permet de mettre une notification a vu pas encore utilise
        UUID id = UUID.fromString(idNotification);
        Notification notification = entityManager.find(Notification.class, id);

        if (notification == null) {
            throw new LinkUpException(
                    ERREUR_TYPE.NON_EXISTANT,
                    Utilitary.EXCEPTION_MESSAGE_NON_EXISTANT
            );
        }

        notification.setEstVu(true);
        entityManager.persist(notification);

        return new SucessDTO(true, "");
    }

    @Transactional
    public SucessDTO deleteNotification(String idNotification) {
        // permet de retirer une notification avec son id
        UUID id = UUID.fromString(idNotification);
        Notification notification = entityManager.find(Notification.class, id);

        if (notification == null) {
            throw new LinkUpException(
                    ERREUR_TYPE.NON_EXISTANT,
                    Utilitary.EXCEPTION_MESSAGE_NON_EXISTANT
            );
        }

        entityManager.remove(notification);

        return new SucessDTO(true, "La notification a ete retirer");
    }

    @Transactional
    public SucessDTO addNotificationToStudent(Notification notification, Etudiant receveur) {
        // permet de ajouter une notification
        receveur.getNotifications().add(notification);

        return new SucessDTO(true, "Notification ajoutée");
    }

    public boolean verifierSiDestinationEstDansUneDesNotifications(String destination, String id) {
        List<RetourInvitationDTO> notifications = getToutNotificationsDeUser(id);

        for (RetourInvitationDTO invitation : notifications) {
            if (destination.equals(invitation.getDestination())) {
                return true;
            }
        }

        return false;
    }


}