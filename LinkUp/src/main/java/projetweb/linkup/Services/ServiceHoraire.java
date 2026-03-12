package projetweb.linkup.Services;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import projetweb.linkup.DTO.ACTIONS.RequeteActiviteGroupeDTO;
import projetweb.linkup.DTO.ACTIONS.SucessDTO;
import projetweb.linkup.Enumerations.ERROR_TYPE;
import projetweb.linkup.Exceptions.LinkUpException;
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
    public boolean estOverlapper(LocalDateTime debut,LocalDateTime fin,Horaire horaire) {
        for(var currentActivite : horaire.getActivites()) {
            if(debut.isBefore(currentActivite.getDateDeFin()) &&
                    fin.isAfter(currentActivite.getDateDeDebut())) {
            return true;
            }
        }
        return false;
    }

    @Transactional

    public SucessDTO findActivite(RequeteActiviteGroupeDTO  activiteGroupeDTO) {
        LocalDateTime tempsDebut = activiteGroupeDTO.jourDebut();
        LocalDateTime tempsFinMax = activiteGroupeDTO.jourFin();
        Horaire horaire =  getHoraireFromId(activiteGroupeDTO.horaireId());

        while(!tempsDebut.isAfter(tempsFinMax)) {
            LocalDateTime tempsFinActivite = LocalDateTime.from(tempsDebut).plusMinutes(10);
            if(!estOverlapper(tempsDebut,tempsFinActivite,horaire)) {

            }
        }
    }



}
