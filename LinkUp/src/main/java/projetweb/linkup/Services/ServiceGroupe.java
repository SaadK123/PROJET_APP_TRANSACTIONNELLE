package projetweb.linkup.Services;

import jakarta.transaction.Synchronization;
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
import java.util.Locale;
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
            // on tente de recuperer letudiant sinon on renvoie un message inexistant
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
        // on envoie une requete vers letudiant pour linviter a un groupe
         // 1. on recupere le groupe
        Groupe groupe = getGroupeById(requeteInvitationDTO.getGroupId());
        // on recuperer le receeur et lenvoyeur
        Etudiant receveur = serviceEtudiant.getEtudiantByUsername(requeteInvitationDTO.getEtudiantNomUtilisateur());
        Etudiant envoyeur =  serviceEtudiant.getEtudiantById(requeteInvitationDTO.getEnvoyeurId());
        if (!groupe.getChef().getId().equals(envoyeur.getId())) {
            // si il essaye de sinviter lui meme sa marche pas  (garder tant que ya pas de jwt)
           throw new LinkUpException(ERREUR_TYPE.ERREUR_METIER_LOGIQUE,
                   Utilitary.MESSAGE_ACTION_DEMANDE_CHEF_INVITATION);
        }
        // sinon alors on creer une invitation par rapport aux deux
        Invitation invitation = new Invitation(groupe,envoyeur,
                requeteInvitationDTO.getType(), requeteInvitationDTO.getTitre(),requeteInvitationDTO.getMessage());
        return serviceNotification.addNotificationToStudent(invitation,receveur);

    }

    @Transactional
    public SucessDTO quitterGroupe(QuitterGroupeDTO quitterGroupeDTO) {
        // on tente de quitter le groupe on get le groupe et letudiant qui veut quitter
        Groupe groupe = getGroupeById(quitterGroupeDTO.idGroupe());
        Etudiant etudiant = serviceEtudiant.getEtudiantById(quitterGroupeDTO.idEtudiant());

        // on retire letudiant du HashSet
        groupe.getEtudiants().remove(etudiant);

        if (groupe.getEtudiants().isEmpty()) {
            // si la liste est vide alors on supprime le groupe avec
            SucessDTO sucessDTO = supprimerGroupeInterne(null, groupe);
            if(sucessDTO.success()) {

            }
        } else if (estUnChef(groupe, etudiant)) {
            // si le gars qui a quitter est le chef on choisi le nouveau chef
            groupe.setChef(groupe.getEtudiantsList().get(0));
        }

        return new SucessDTO(true,"vous avez quitter le groupe");
    }


    /**
     *
     * methode qui verifie si cest un chef
     * @param group
     * @param etudiant
     * @return boolean
     */
    @Transactional
    public boolean estUnChef(Groupe group, Etudiant etudiant) {
        return group.getChef().getId().equals(etudiant.getId());
    }



    @Transactional
    public SucessDTO rejoindreGroupe(INVITATION_GROUPE_DTO invitation) {
        // on recoit un dto ici si il clique accepter dans le front alors letudiant va rejoindre le groupe
        Etudiant etudiant = serviceEtudiant.getEtudiantById(invitation.idEtudiant());
        Groupe group = getGroupeById(invitation.idGroupe());
       // on ajoute letudiant
        group.getEtudiants().add(etudiant);

        return new SucessDTO(true,"vous avez ete ajouter dans le groupe");
    }
    @Transactional
    public Groupe creerGroupe(CreationDeGroupeDTO groupeDTO) {
        // creer un groupe ici fonctionne pratiquement toujours on pourrais faire une limite
        Etudiant chef = serviceEtudiant.getEtudiantById(groupeDTO.chefID());
        Groupe g = new Groupe(chef,groupeDTO.nomGroup());
          // on persiste lentite pour la mettre dans la bd ( pas requis mais safe)
        entityManager.persist(g);
        entityManager.flush();

        return g;
    }

  @Transactional
    public SucessDTO supprimerGroupeInterne(String idGroupe, Groupe groupe) {
     // ici on peut supprimer un groupe soit avec lid soit avec lobjet qui recupere le id
        UUID str = groupe == null ? UUID.fromString(idGroupe):groupe.getId();

        try {
            // on tente de supprimer le groupe mais tfacon sa va toujours marcher
            entityManager.createQuery("delete FROM Groupe g where g.id = :id")
                    .setParameter("id",str).executeUpdate();
            return new SucessDTO(true,"groupe supprimer");
        } catch (Exception ignored) {

        }
        return new SucessDTO(false,"groupe non supprimer");
    }

    @Transactional public SucessDTO supprimerGroupe(SupprimerGroupeDTO supprimerGroupeDTO) {
        try {
            // cette methode permet a un gars de supprimer le groupe avec un dto on sassure que cest le chef qui supprime
            Groupe groupe = getGroupeById(supprimerGroupeDTO.groupeId());
            Etudiant etudiant = serviceEtudiant.getEtudiantById(supprimerGroupeDTO.chefId());
           if(!estUnChef(groupe,etudiant)) {
               // si cest pas le chef on jete ( garder tant que ya pas de jwt
              throw new LinkUpException(ERREUR_TYPE.ERREUR_METIER_LOGIQUE
                      ,"peut pas supprimer un groupe si nest pas chef");
           }
           // ici on delete le groupe la requete sql
           entityManager.createQuery("delete from Groupe g where g.id = :id")
                   .setParameter("id",groupe.getId()).executeUpdate();
           return new SucessDTO(true,"le groupe a ete supprimer");
        }catch (LinkUpException e) {
            //
            throw new LinkUpException(ERREUR_TYPE.ERREUR_METIER_LOGIQUE,e.getMessage());
        } catch (Exception e) {
            throw new LinkUpException(ERREUR_TYPE.ERREUR_INTERNE,
                    "Impossible de supprimer le groupe pour le moment");
        }

    }



    @Transactional
    public List<Groupe> getToutGroupesDeUser(String utilisateurID) {
        // permet de retourner tout les groupe ou un user est dedans
        return entityManager.createQuery("select g from  Groupe g  join g.etudiants e where e.id = :utilisateurID", Groupe.class).
                setParameter("utilisateurID",UUID.fromString(utilisateurID)).getResultList();
    }


    @Transactional
    public SucessDTO virerEtudiant(VirerEtudiantDTO virerEtudiantDTO) {
        // permet de virer un utilisateur dun groupe peut pas se virer sois meme
        String idVireur = virerEtudiantDTO.etudiantQuiVireId();
        String nomUtilisateur = virerEtudiantDTO.nomUtilisateur();


        String groupeId =  virerEtudiantDTO.groupid();
        Etudiant vireur = serviceEtudiant.getEtudiantById(idVireur);
        Etudiant virer  = serviceEtudiant.getEtudiantByUsername(nomUtilisateur);

        Groupe group = getGroupeById(groupeId);

        if(!group.getChef().getId().equals(vireur.getId())) {
            throw new LinkUpException(ERREUR_TYPE.ERREUR_METIER_LOGIQUE,Utilitary.MESSAGE_ACTION_DEMANDE_CHEF_INVITATION);
        }else if(virer.getId().toString().equals(idVireur)) {
                throw new LinkUpException(ERREUR_TYPE.ERREUR_METIER_LOGIQUE,"vous ne pouvez pas vous virer vous meme");
        }
        group.getEtudiants().remove(virer);

        return new SucessDTO(true,"letudiant a ete virer");
    }

    @Transactional
    public SucessDTO quitterTousLesGroupes(String idEtudiant) {
        // permet de quitter tout les groupes le moment de la suppression
        List<Groupe>  groupes = getToutGroupesDeUser(idEtudiant);
        for(var groupe : groupes) {
            QuitterGroupeDTO dto = new QuitterGroupeDTO(groupe.getId().toString(),idEtudiant);
           quitterGroupe(dto);
        }

        return new SucessDTO(true,"letudiant a pu quitter");
    }


}
