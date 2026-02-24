package projetweb.linkup.Services;

import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import projetweb.linkup.DTO.ACTIONS.AjouterActiviteDTO;
import projetweb.linkup.DTO.ACTIONS.CreateGroupDTO;
import projetweb.linkup.Exceptions.LinkUpException;
import projetweb.linkup.Util.Utilitary;
import jakarta.persistence.EntityManager;
import jakarta.persistence.NoResultException;
import jakarta.persistence.PersistenceContext;
import projetweb.linkup.Enumerations.ERROR_TYPE;
import projetweb.linkup.entities.Activite;
import projetweb.linkup.entities.Etudiant;
import projetweb.linkup.entities.Group;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
@Service
public class ServiceGroupe {


   private final ServiceHoraire serviceHoraire;
   private final ServiceEtudiant serviceEtudiant;
    @PersistenceContext
    private EntityManager entityManager;
    public ServiceGroupe(ServiceHoraire serviceHoraire, ServiceEtudiant serviceEtudiant) {
        this.serviceHoraire = serviceHoraire;
        this.serviceEtudiant = serviceEtudiant;
    }

    @Transactional
    public void ajouterUneActivite(AjouterActiviteDTO ajouterActiviteDTO) {
       Group group   = getGroupById(ajouterActiviteDTO.destination().toString());

        List<Activite> activites = serviceHoraire.recupererTousLesActivitesDuneListeDetudiants(group.getEtudiants().stream().toList());
        Activite activite = ajouterActiviteDTO.activite();
        for(var current_activite : activites) {
            if(activite.getDateDeDebut().isBefore(current_activite.getDateDeFin()) &&
            activite.getDateDeFin().isAfter(current_activite.getDateDeDebut())) {
                throw new LinkUpException(ERROR_TYPE.DUPLICATION,Utilitary.CreerGroupeActiviteDupliquer(current_activite.getEtudiant().getUsername()));
            }
        }
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
public List<Group> getALlgroupsFromUser(UUID userID) {


        List<Group> groups;

        groups = entityManager.createQuery("select g from  Group g  join g.etudiants e where e.id = :userID", Group.class).
                setParameter("userID",userID).getResultList();

         return groups;
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




}
