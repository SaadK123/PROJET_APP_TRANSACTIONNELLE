package projetweb.linkup.Services;

import jakarta.persistence.Entity;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import projetweb.linkup.DTO.ACTIONS.AjouterActiviteDTO;
import projetweb.linkup.DTO.ACTIONS.SucessDTO;
import projetweb.linkup.Enumerations.ERROR_TYPE;
import projetweb.linkup.Exceptions.LinkUpException;
import projetweb.linkup.Util.Utilitary;
import projetweb.linkup.entities.Activite;
import projetweb.linkup.entities.Etudiant;
import projetweb.linkup.entities.Group;
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




    public List<Activite> recupererTousLesActivitesDunGroupe(String groupeId) {
      Group group = serviceGroupe.getGroupById(groupeId);
      List<Activite> activites = new ArrayList<>(group.getHoraire().getActivites());

      for(var etudiant : group.getEtudiants()) {
          activites.addAll(etudiant.getHoraire().getActivites());
      }
      return activites;
    }

    @Transactional
    public SucessDTO addActivite(AjouterActiviteDTO ajouterActiviteDTO) {

        String destination =  ajouterActiviteDTO.destination();
         List<Activite> activites = ajouterActiviteDTO.isforGroup() ? recupererTousLesActivitesDunGroupe(destination)
                 :recupererLesActivitesDunHoraire(destination);

        Activite activite = ajouterActiviteDTO.activite();
        
        for(var currentActivite : activites) {
            if(activite.getDateDeDebut().isBefore(currentActivite.getDateDeFin()) &&
                    activite.getDateDeFin().isAfter(currentActivite.getDateDeDebut())) {
             
            }

        }


    }


}
