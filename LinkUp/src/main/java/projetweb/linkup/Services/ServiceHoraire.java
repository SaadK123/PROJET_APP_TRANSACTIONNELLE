package projetweb.linkup.Services;

import jakarta.persistence.Entity;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import projetweb.linkup.Enumerations.ERROR_TYPE;
import projetweb.linkup.Exceptions.LinkUpException;
import projetweb.linkup.entities.Activite;
import projetweb.linkup.entities.Etudiant;
import projetweb.linkup.entities.Horaire;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class ServiceHoraire {



    @PersistenceContext
    EntityManager entityManager;
    public ServiceHoraire() {

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


}
