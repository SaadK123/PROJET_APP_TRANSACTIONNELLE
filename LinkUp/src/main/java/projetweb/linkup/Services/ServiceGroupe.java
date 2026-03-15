package projetweb.linkup.Services;

import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import projetweb.linkup.DTO.ACTIONS.*;
import projetweb.linkup.DTO.TYPES.RequeteInvitationDTO;
import projetweb.linkup.Exceptions.LinkUpException;
import projetweb.linkup.Util.Utilitary;
import jakarta.persistence.EntityManager;
import jakarta.persistence.NoResultException;
import jakarta.persistence.PersistenceContext;
import projetweb.linkup.Enumerations.ERREUR_TYPE;
import projetweb.linkup.entities.Etudiant;
import projetweb.linkup.entities.Groupe;
import projetweb.linkup.entities.Horaire;
import projetweb.linkup.entities.Invitation;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class ServiceGroupe {



   private final ServiceEtudiant serviceEtudiant;
   private final ServiceNotification serviceNotification;
    @PersistenceContext
    private EntityManager entityManager;
    public ServiceGroupe( ServiceEtudiant serviceEtudiant,ServiceNotification serviceNotification) {

        this.serviceEtudiant = serviceEtudiant;
        this.serviceNotification = serviceNotification;
    }
   @Transactional
    public Groupe getGroupeById(String groupeIdString) {

        try {
            UUID groupeId = UUID.fromString(groupeIdString);
            return  entityManager.
              createQuery("select g from Groupe g where g.id = :groupeId", Groupe.class)
                    .setParameter("groupeId", groupeId).getSingleResult();
        } catch (NoResultException ex) {
        throw  new LinkUpException(ERREUR_TYPE.NON_EXISTANT, Utilitary.EXCEPTION_UTILISATEUR_NON_TROUVER);
        }

    }

    @Transactional
    public SucessDTO envoyerRequeteAEtudiant(RequeteInvitationDTO requeteInvitationDTO) {
        Groupe groupe = getGroupeById(requeteInvitationDTO.getGroupId());
        Etudiant receveur = serviceEtudiant.getEtudiantByUsername(requeteInvitationDTO.getEtudiantNomUtilisateur());
        Etudiant envoyeur =  serviceEtudiant.getEtudiantById(requeteInvitationDTO.getEnvoyeurId());
        if (!groupe.getChef().getId().equals(envoyeur.getId())) {
           throw new LinkUpException(ERREUR_TYPE.ERREUR_METIER_LOGIQUE,
                   Utilitary.MESSAGE_ACTION_DEMANDE_CHEF_INVITATION);
        }
        Invitation invitation = new Invitation(groupe,envoyeur,
                requeteInvitationDTO.getType(), requeteInvitationDTO.getTitre(),requeteInvitationDTO.getMessage());
        return serviceNotification.addNotificationToStudent(invitation,receveur);

    }

    @Transactional
    public SucessDTO quitterGroupe(QuitterGroupeDTO quitterGroupeDTO) {
        Groupe groupe = getGroupeById(quitterGroupeDTO.idGroupe());
        Etudiant etudiant = serviceEtudiant.getEtudiantById(quitterGroupeDTO.idEtudiant());

        groupe.getEtudiants().remove(etudiant);

        if (groupe.getEtudiants().isEmpty()) {
            SucessDTO sucessDTO = supprimerGroupe(null, groupe);
            if(sucessDTO.success()) {

            }
        } else if (estUnChef(groupe, etudiant)) {
            groupe.setChef(groupe.getEtudiantsList().get(0));
        }

        return new SucessDTO(true,"vous avez quitter le groupe");
    }

    @Transactional
    public boolean estUnChef(Groupe group, Etudiant etudiant) {
        return group.getChef().getId().equals(etudiant.getId());
    }



    @Transactional
    public SucessDTO rejoindreGroupe(INVITATION_GROUPE_DTO invitation) {
        Etudiant etudiant = serviceEtudiant.getEtudiantById(invitation.idEtudiant());
        Groupe group = getGroupeById(invitation.idGroupe());

        group.getEtudiants().add(etudiant);

        return new SucessDTO(true,"vous avez ete ajouter dans le groupe");
    }
    @Transactional
    public Groupe creerGroupe(CreationDeGroupeDTO groupe) {
        

        Etudiant e =  serviceEtudiant.getEtudiantById(groupe.chefID());

        Groupe g = new Groupe(e,groupe.nomGroup());
        g.setHoraire(new Horaire());
        g.getHoraire().setActivites(new ArrayList<>());
        entityManager.persist(g);
        entityManager.flush();

        return g;
    }

  @Transactional
    public SucessDTO supprimerGroupe(String idGroupe, Groupe groupe) {

        UUID str = groupe == null ? UUID.fromString(idGroupe):groupe.getId();

        try {
            entityManager.createQuery("delete FROM Groupe g where g.id = :id")
                    .setParameter("id",str).executeUpdate();
            return new SucessDTO(true,"groupe supprimer");
        } catch (Exception ignored) {

        }
        return new SucessDTO(false,"groupe non supprimer");
    }



    @Transactional
    public List<Groupe> getToutGroupesDeUser(String utilisateurID) {
        return entityManager.createQuery("select g from  Groupe g  join g.etudiants e where e.id = :utilisateurID", Groupe.class).
                setParameter("utilisateurID",UUID.fromString(utilisateurID)).getResultList();
    }


    @Transactional
    public SucessDTO virerEtudiant(VirerEtudiantDTO virerEtudiantDTO) {
        String idVireur = virerEtudiantDTO.etudiantQuiVireId();
        String idVirer = virerEtudiantDTO.etudiantAVirerId();


        String groupeId =  virerEtudiantDTO.groupid();
        Etudiant vireur = serviceEtudiant.getEtudiantById(idVireur);
        Etudiant virer  = serviceEtudiant.getEtudiantById(idVirer);

        Groupe group = getGroupeById(groupeId);

        if(!group.getChef().getId().equals(vireur.getId())) {
            throw new LinkUpException(ERREUR_TYPE.ERREUR_METIER_LOGIQUE,Utilitary.MESSAGE_ACTION_DEMANDE_CHEF_INVITATION);
        }else if(idVirer.equals(idVireur)) {
                throw new LinkUpException(ERREUR_TYPE.ERREUR_METIER_LOGIQUE,"vous ne pouvez pas vous virer vous meme");
        }
        group.getEtudiants().remove(virer);

        return new SucessDTO(true,"letudiant a ete virer");
    }


}
