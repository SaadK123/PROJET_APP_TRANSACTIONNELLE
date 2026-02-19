package projetweb.linkup.Services;

import DTO.ACTIONS.AjouterActiviteDTO;
import Exceptions.LinkUpException;
import Util.Utilitary;
import jakarta.persistence.EntityManager;
import jakarta.persistence.NoResultException;
import jakarta.persistence.PersistenceContext;
import projetweb.linkup.Enumerations.ERROR_TYPE;
import projetweb.linkup.entities.Activite;
import projetweb.linkup.entities.Group;

import javax.naming.LinkException;
import java.util.List;
import java.util.UUID;

public class ServiceGroupe {


   private final ServiceHoraire serviceHoraire;
    @PersistenceContext
    private EntityManager entityManager;
    public ServiceGroupe(ServiceHoraire serviceHoraire) {
        this.serviceHoraire = serviceHoraire;
    }
    public void ajouterUneActivite(AjouterActiviteDTO ajouterActiviteDTO) {
       Group group   = tryAccessingGroup(ajouterActiviteDTO.destination());

        List<Activite> activites = serviceHoraire.recupererTousLesActivitesDesEtudiants(group.getEtudiants().stream().toList());

    }


    public Group tryAccessingGroup(UUID destination) {
        Group group = null;
        try {
            group = (Group) entityManager.
             createQuery("select g from Group g where g.id = :destination", Group.class)
                   .setParameter("destination",destination.toString());

        } catch (NoResultException ex) {
         new LinkUpException(ERROR_TYPE.NON_EXISTANT, Utilitary.EXCEPTION_NO_GROUP_FOUND).throwIt();
        }
        return  group;
    }




}
