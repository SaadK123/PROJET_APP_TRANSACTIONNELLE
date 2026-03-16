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
import java.util.ArrayList;
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
        ///  ici on verifie si le debut est avant la fin et si la fin est apres le debut
        for(var activiteCourant : horaire.getActivites()) {
            if(debut.isBefore(activiteCourant.getTempsFin()) &&
                    fin.isAfter(activiteCourant.getTempsDebut())) {
            return true; /// on retourne vrai c'est overlapper
            }
        }
        return false; /// on retourne faux
    }

    @Transactional
    public SucessDTO trouverActivite(RequeteActiviteGroupeDTO activiteGroupeDTO) {
        LocalDateTime tempsDebut = activiteGroupeDTO.tempsDebut();
        LocalDateTime tempsFinMax = activiteGroupeDTO.tempsFin();
        Horaire horaire = getHoraireFromId(activiteGroupeDTO.horaireId());

        while (true) {
            ///  on demarre la fin de lactivite au temps du debut couranmment + la duree
            LocalDateTime tempsFinActivite =
                    tempsDebut.plusMinutes(activiteGroupeDTO.dureeEnMinute());


            ///  si on depasse sans trouver de un temps alors on quitte
            if (tempsFinActivite.isAfter(tempsFinMax)) {
                return new SucessDTO(false,"aucune activite trouver");
            }

            ///  si on est pas overlapper sur lactivite courante alors on la prend et on sors
            if (!estOverlapper(tempsDebut, tempsFinActivite, horaire)) {
             horaire.getActivites().add(new Activite(activiteGroupeDTO.description(),
                     tempsDebut,tempsFinActivite,activiteGroupeDTO.titre()));
             break;
            }
           ///  10 minutes par delai
            tempsDebut = tempsDebut.plusMinutes(10);
        }
        return new SucessDTO(true,"une activite a ete trouver");
    }

    @Transactional
    public SucessDTO ajouterActivitePourEtudiant(AjouterActiviteDTOEtudiant ajouter) {
        try {
            Etudiant etudiant = serviceEtudiant.getEtudiantById(ajouter.etudiantId());

            etudiant.getHoraire().getActivites().add(ajouter.activite());

            return new SucessDTO(true, "sa marche");
        } catch (Exception e) {
            throw new LinkUpException(ERREUR_TYPE.ERREUR_INTERNE,"impossible dajouter une activite pour le moment");
        }
    }


    @Transactional public SucessDTO supprimerActivite(String activiteId) {
        try {
            entityManager.createQuery("delete from Activite e  where e.id = :id")
                    .setParameter("id",UUID.fromString(activiteId)).executeUpdate();
            return new SucessDTO(true,"lactivite a ete ajouter");
        }catch (Exception e) {
            throw new LinkUpException(ERREUR_TYPE.ERREUR_INTERNE,"impossible dajouter une activite");
        }

    }


}
