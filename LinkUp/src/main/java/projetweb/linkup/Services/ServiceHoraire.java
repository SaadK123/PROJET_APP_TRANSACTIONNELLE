package projetweb.linkup.Services;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import projetweb.linkup.DTO.ACTIONS.AjouterActiviteDTOEtudiant;
import projetweb.linkup.DTO.ACTIONS.RequeteActiviteGroupeDTO;
import projetweb.linkup.DTO.ACTIONS.SucessDTO;
import projetweb.linkup.Enumerations.ERREUR_TYPE;
import projetweb.linkup.Exceptions.LinkUpException;
import projetweb.linkup.entities.Activite;
import projetweb.linkup.entities.Etudiant;
import projetweb.linkup.entities.Horaire;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class ServiceHoraire {


    private final ServiceEtudiant serviceEtudiant;
    ServiceGroupe serviceGroupe;
    @PersistenceContext
    EntityManager entityManager;
    public ServiceHoraire(ServiceGroupe serviceGroupe, ServiceEtudiant serviceEtudiant) {
     this.serviceGroupe = serviceGroupe;
        this.serviceEtudiant = serviceEtudiant;
    }


    public Horaire getHoraireFromId(String id) {
        try {
         UUID uuid = UUID.fromString(id);
          return  entityManager
                  .createQuery("select h from Horaire  h where id = :id", Horaire.class)
                  .setParameter("id",uuid).getSingleResult();

        } catch (Exception e) {
          throw new LinkUpException(ERREUR_TYPE.NON_EXISTANT,"cet horaire n'existe pas");  // todo
        }
    }
    @Transactional
    public boolean estOverlapper(LocalDateTime debut,LocalDateTime fin,Horaire horaire) {
        for(var activiteCourant : horaire.getActivites()) {
            if(debut.isBefore(activiteCourant.getTempsFin()) &&
                    fin.isAfter(activiteCourant.getTempsDebut())) {
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

    @Transactional
    public SucessDTO ajouterActivitePourEtudiant(AjouterActiviteDTOEtudiant ajouter) {
        Etudiant etudiant = serviceEtudiant.getEtudiantById(ajouter.etudiantId());

        try {
            etudiant.getHoraire().getActivites().add(ajouter.activite());

        } catch (Exception e) {
              return new SucessDTO(false,"marche pas");
        }
        return new SucessDTO(true,"sa marche");
    }


}
