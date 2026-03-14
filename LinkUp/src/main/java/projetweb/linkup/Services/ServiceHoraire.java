package projetweb.linkup.Services;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import projetweb.linkup.DTO.ACTIONS.RequeteActiviteGroupeDTO;
import projetweb.linkup.DTO.ACTIONS.SucessDTO;
import projetweb.linkup.Enumerations.ERROR_TYPE;
import projetweb.linkup.Exceptions.LinkUpException;
import projetweb.linkup.entities.Activite;
import projetweb.linkup.entities.Horaire;

import java.time.LocalDateTime;
import java.util.UUID;

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
         UUID uuid = UUID.fromString(id);
          return  entityManager
                  .createQuery("select h from Horaire  h where id = :id", Horaire.class)
                  .setParameter("id",uuid).getSingleResult();

        } catch (Exception e) {
          throw new LinkUpException(ERROR_TYPE.NON_EXISTANT,"cet horaire n'existe pas");  // todo
        }
    }
    @Transactional
    public boolean estOverlapper(LocalDateTime debut,LocalDateTime fin,Horaire horaire) {
        for(var currentActivite : horaire.getActivites()) {
            if(debut.isBefore(currentActivite.getTempsFin()) &&
                    fin.isAfter(currentActivite.getTempsDebut())) {
            return true;
            }
        }
        return false;
    }

    @Transactional
    public SucessDTO trouverActivite(RequeteActiviteGroupeDTO activiteGroupeDTO) {
        LocalDateTime tempsDebut = activiteGroupeDTO.tempsDebut();
        LocalDateTime tempsFinMax = activiteGroupeDTO.tempsFin();
        Horaire horaire = getHoraireFromId(activiteGroupeDTO.horaireId());

        while (true) {
            LocalDateTime tempsFinActivite =
                    tempsDebut.plusMinutes(activiteGroupeDTO.dureeEnMinute());

            if (tempsFinActivite.isAfter(tempsFinMax)) {
                return new SucessDTO(false,"aucune activite trouver");
            }

            if (!estOverlapper(tempsDebut, tempsFinActivite, horaire)) {
             horaire.getActivites().add(new Activite(activiteGroupeDTO.description(),
                     tempsDebut,tempsFinActivite,activiteGroupeDTO.titre()));
             break;
            }

            tempsDebut = tempsDebut.plusMinutes(10);
        }
        return new SucessDTO(true,"une activite a ete trouver");
    }


}
