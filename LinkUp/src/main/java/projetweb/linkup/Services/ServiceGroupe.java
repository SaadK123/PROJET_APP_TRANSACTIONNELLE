package projetweb.linkup.Services;

import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import projetweb.linkup.DTO.ACTIONS.CreateGroupDTO;
import projetweb.linkup.DTO.ACTIONS.SucessDTO;
import projetweb.linkup.Exceptions.LinkUpException;
import projetweb.linkup.Util.Utilitary;
import jakarta.persistence.EntityManager;
import jakarta.persistence.NoResultException;
import jakarta.persistence.PersistenceContext;
import projetweb.linkup.Enumerations.ERROR_TYPE;
import projetweb.linkup.entities.Etudiant;
import projetweb.linkup.entities.Group;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
@Service
public class ServiceGroupe {



   private final ServiceEtudiant serviceEtudiant;
    @PersistenceContext
    private EntityManager entityManager;
    public ServiceGroupe( ServiceEtudiant serviceEtudiant) {

        this.serviceEtudiant = serviceEtudiant;
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
    public SucessDTO sendRequestToAnEtudiant(String username) {
     Etudiant e = serviceEtudiant.getEtudiantByUsername(username);

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
