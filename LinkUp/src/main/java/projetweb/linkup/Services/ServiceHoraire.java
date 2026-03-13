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
    public SucessDTO trouverActivite(RequeteActiviteGroupeDTO activiteGroupeDTO) {
        LocalDateTime tempsDebut = activiteGroupeDTO.jourDebut();
        LocalDateTime tempsFinMax = activiteGroupeDTO.jourFin();
        Horaire horaire = getHoraireFromId(activiteGroupeDTO.horaireId());

        while (true) {
            LocalDateTime tempsFinActivite =
                    tempsDebut.plusMinutes(activiteGroupeDTO.dureeEnMinute());

            if (tempsFinActivite.isAfter(tempsFinMax)) {
                return new SucessDTO(false,);
            }

            if (!estOverlapper(tempsDebut, tempsFinActivite, horaire)) {
                // todo return le slot trouvé
            }

            tempsDebut = tempsDebut.plusMinutes(10);
        }
    }


}
