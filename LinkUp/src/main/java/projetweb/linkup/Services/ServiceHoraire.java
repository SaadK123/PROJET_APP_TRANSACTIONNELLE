package projetweb.linkup.Services;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import projetweb.linkup.DTO.ACTIONS.AjouterActiviteDTOEtudiant;
import projetweb.linkup.DTO.ACTIONS.SucessDTO;
import projetweb.linkup.Enumerations.ERROR_TYPE;
import projetweb.linkup.Exceptions.LinkUpException;
import projetweb.linkup.Util.Utilitary;
import projetweb.linkup.entities.Activite;
import projetweb.linkup.entities.Horaire;

import java.time.LocalDateTime;

@Service
public class ServiceHoraire {


     ServiceGroupe serviceGroupe;
    @PersistenceContext
    EntityManager entityManager;
    public ServiceHoraire(ServiceGroupe serviceGroupe) {
     this.serviceGroupe = serviceGroupe;
    }


    public Horaire getHoraireFromId(String id) {
        try {

          return  entityManager
                  .createQuery("select h from Horaire  h where id = :id", Horaire.class)
                  .setParameter("id",id).getSingleResult();

        } catch (Exception e) {
          throw new LinkUpException(ERROR_TYPE.NON_EXISTANT,"cet horaire n'existe pas");  // todo
        }
    }
    @Transactional
    public SucessDTO addActivite(AjouterActiviteDTOEtudiant ajouterActiviteDTO) {

        String destination =  ajouterActiviteDTO.horaireEtudiant();
        Horaire horaire =  getHoraireFromId(destination);

        Activite activite = ajouterActiviteDTO.activite();
        
        for(var currentActivite : horaire.getActivites()) {
            if(activite.getDateDeDebut().isBefore(currentActivite.getDateDeFin()) &&
                    activite.getDateDeFin().isAfter(currentActivite.getDateDeDebut())) {
             return new SucessDTO(false, Utilitary.EXCEPTION_OVERLAP);
            }
        }

        horaire.getActivites().add(ajouterActiviteDTO.activite());
        return new SucessDTO(true, "l'activite a ete ajouter");
    }

    @Transactional

    public SucessDTO findActivite() {
    }



}
