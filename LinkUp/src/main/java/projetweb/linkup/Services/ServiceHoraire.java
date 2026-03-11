package projetweb.linkup.Services;

import jakarta.persistence.Entity;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import projetweb.linkup.DTO.ACTIONS.AjouterActiviteDTO;
import projetweb.linkup.Enumerations.ERROR_TYPE;
import projetweb.linkup.Exceptions.LinkUpException;
import projetweb.linkup.Util.Utilitary;
import projetweb.linkup.entities.Activite;
import projetweb.linkup.entities.Etudiant;
import projetweb.linkup.entities.Horaire;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class ServiceHoraire {


    ServiceGroupe serviceGroupe;
    @PersistenceContext
    EntityManager entityManager;
    public ServiceHoraire(ServiceGroupe serviceGroupe) {
      this.serviceGroupe = serviceGroupe;
    }


    public Horaire getHoraireFromId(UUID id) {
        try {
          return  entityManager
                  .createQuery("select h from Horaire  h where id = :id", Horaire.class)
                  .setParameter("id",id).getSingleResult();

        } catch (Exception e) {
          throw new LinkUpException(ERROR_TYPE.NON_EXISTANT,"cet horaire n'existe pas");  // todo
        }
    }

    public List<Activite> recupererLesActivitesDunHoraire(String horaire_id) {
           return getHoraireFromId(UUID.fromString(horaire_id)).getActivites();
    }

    @Transactional public List<Activite> recupererLesActivitesDePlusieursHoraire(String... horaires_id) {
        List<Activite> allActivities = new ArrayList<>();
        for(String s : horaires_id) {
          List<Activite> activites  = recupererLesActivitesDunHoraire(s);
            allActivities.addAll(activites);
        }
        return allActivities;
    }



    @Transactional

    public

    @Transactional
    public  addActivite(AjouterActiviteDTO ajouterActiviteDTO) {
        List<String> allhoraires = getAllHorairesIdsFromGroup(ajouterActiviteDTO.destination().toString());
        List<Activite> activites = serviceHoraire.recupererLesActivitesDePlusieursHoraire(allhoraires.toArray(new String[0]));
        Activite activite = ajouterActiviteDTO.activite();
        for(var current_activite : activites) {
            if(activite.getDateDeDebut().isBefore(current_activite.getDateDeFin()) &&
                    activite.getDateDeFin().isAfter(current_activite.getDateDeDebut())) {
                throw new LinkUpException(ERROR_TYPE.DUPLICATION, Utilitary.CreerGroupeActiviteDupliquer(current_activite.getEtudiant().getUsername()));
            }

        }
    }


}
