package projetweb.linkup.Services;

import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import projetweb.linkup.DTO.ACTIONS.CreateGroupDTO;
import projetweb.linkup.DTO.ACTIONS.SucessDTO;
import projetweb.linkup.DTO.TYPES.RequestInvitationDTO;
import projetweb.linkup.Exceptions.LinkUpException;
import projetweb.linkup.Util.Utilitary;
import jakarta.persistence.EntityManager;
import jakarta.persistence.NoResultException;
import jakarta.persistence.PersistenceContext;
import projetweb.linkup.Enumerations.ERROR_TYPE;
import projetweb.linkup.entities.Etudiant;
import projetweb.linkup.entities.Group;
import projetweb.linkup.entities.Invitation;

import java.util.List;

@Service
public class ServiceGroupe {



   private final ServiceEtudiant serviceEtudiant;
   private final ServiceNotification serviceNotification;
    @PersistenceContext
    private EntityManager entityManager;
    public ServiceGroupe( ServiceEtudiant serviceEtudiant,ServiceNotification serviceNotification) {

        this.serviceEtudiant = serviceEtudiant;
        this.serviceNotification = serviceNotification;
    }
   @Transactional
    public Group getGroupById(String groupId) {

        try {
            return  entityManager.
              createQuery("select g from Group g where g.id = :groupId", Group.class)
                    .setParameter("groupId", groupId).getSingleResult();
        } catch (NoResultException ex) {
        throw  new LinkUpException(ERROR_TYPE.NON_EXISTANT, Utilitary.EXCEPTION_UTILISATEUR_NON_TROUVER);
        }

    }

    @Transactional
    public SucessDTO sendRequestToAnEtudiant(RequestInvitationDTO requestInvitationDTO) {
        Group group = getGroupById(requestInvitationDTO.getGroupId());
        Etudiant e = serviceEtudiant.getEtudiantByUsername(requestInvitationDTO.getEtudiantUsername());
        if (!group.getChef().getUsername().equals(requestInvitationDTO.getEnvoyeur())) {
            // todo throw here
        }
        Invitation invitation = new Invitation(group, e, requestInvitationDTO.getType(), requestInvitationDTO.get)
        return serviceNotification.addNotificationToStudent(invitation);

    }

    @Transactional
    public SucessDTO quitterGroupe() {

    }


    @Transactional
    public SucessDTO rejoindreGroupe() {
        return null; // todo
    }
    @Transactional
    public Group createGroup(CreateGroupDTO group) {
        

        Etudiant e =  serviceEtudiant.getEtudiantById(group.chefID());

        Group g = new Group(e,group.nomGroup());
        g.getEtudiants().add(e);
        entityManager.persist(g);
        entityManager.flush();

        return g;
    }


    @Transactional
    public List<Group> getAllgroupsFromUser(String userID) {
        return entityManager.createQuery("select g from  Group g  join g.etudiants e where e.id = :userID", Group.class).
                setParameter("userID",userID).getResultList();
    }


}
