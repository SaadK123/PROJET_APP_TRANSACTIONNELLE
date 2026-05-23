package projetweb.linkup.Services;

import jakarta.persistence.EntityManager;
import jakarta.persistence.NoResultException;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import projetweb.linkup.DTO.ACTIONS.CreationConversationDTO;
import projetweb.linkup.DTO.ACTIONS.CreationDeGroupeDTO;
import projetweb.linkup.DTO.ACTIONS.ReponseInvitationGroupe;
import projetweb.linkup.DTO.ACTIONS.QuitterGroupeDTO;
import projetweb.linkup.DTO.ACTIONS.SucessDTO;
import projetweb.linkup.DTO.ACTIONS.SupprimerGroupeDTO;
import projetweb.linkup.DTO.ACTIONS.VirerEtudiantDTO;
import projetweb.linkup.DTO.TYPES.RetourInvitationDTO;
import projetweb.linkup.Enumerations.ERREUR_TYPE;
import projetweb.linkup.Enumerations.TypeInvitation;
import projetweb.linkup.Exceptions.LinkUpException;
import projetweb.linkup.Util.Utilitary;
import projetweb.linkup.entities.Etudiant;
import projetweb.linkup.entities.Groupe;
import projetweb.linkup.entities.Invitation;

import java.util.List;
import java.util.UUID;

@Service
public class ServiceGroupe  {

    private final ServiceEtudiant serviceEtudiant;
    private final ServiceNotification serviceNotification;
    private final ServiceConversation serviceConversation;

    @PersistenceContext
    private EntityManager entityManager;

    public ServiceGroupe(
            ServiceEtudiant serviceEtudiant,
            ServiceNotification serviceNotification,
            ServiceConversation serviceConversation
    ) {
        this.serviceEtudiant = serviceEtudiant;
        this.serviceNotification = serviceNotification;
        this.serviceConversation = serviceConversation;
    }

    @Transactional
    public Groupe getGroupeById(String groupeIdString) {
        try {
            UUID groupeId = UUID.fromString(groupeIdString);

            return entityManager
                    .createQuery("select g from Groupe g where g.id = :groupeId", Groupe.class)
                    .setParameter("groupeId", groupeId)
                    .getSingleResult();

        } catch (NoResultException ex) {
            throw new LinkUpException(
                    ERREUR_TYPE.NON_EXISTANT,
                    Utilitary.EXCEPTION_UTILISATEUR_NON_TROUVER
            );
        }
    }

    @Transactional
    public SucessDTO envoyerRequeteAEtudiant(RetourInvitationDTO requeteInvitationDTO) {


        Groupe groupe = getGroupeById(requeteInvitationDTO.getDestination());

        Etudiant receveur = serviceEtudiant.getEtudiantByUsername(
                requeteInvitationDTO.getEtudiantNomUtilisateur()
        );
        boolean estDedans =  serviceNotification.verifierSiDestinationEstDansUneDesNotifications(requeteInvitationDTO.getDestination(),
                receveur.getId().toString());

        if(estDedans) {
            throw new LinkUpException(
                    ERREUR_TYPE.DUPLICATION,
                    "cet etudiant a deja ete inviter dans le groupe"
            );
        }
        Etudiant envoyeur = serviceEtudiant.getEtudiantById(
                requeteInvitationDTO.getEnvoyeurId()
        );

        if (!groupe.getChef().getId().equals(envoyeur.getId())) {
            throw new LinkUpException(
                    ERREUR_TYPE.ERREUR_METIER_LOGIQUE,
                    Utilitary.MESSAGE_ACTION_DEMANDE_CHEF_INVITATION
            );
        }

        for (Etudiant membre : groupe.getEtudiants()) {
            if (membre.getId().equals(receveur.getId())) {
                throw new LinkUpException(
                        ERREUR_TYPE.DUPLICATION,
                        "cet etudiant est deja dans le groupe"
                );
            }
        }


        Invitation invitation = new Invitation(
                groupe.getId(),
                envoyeur,
                requeteInvitationDTO.getType(),
                requeteInvitationDTO.getTitre(),
                requeteInvitationDTO.getMessage(),
                TypeInvitation.GROUPE
        );

        return serviceNotification.addNotificationToStudent(invitation, receveur);
    }

    @Transactional
    public SucessDTO quitterGroupe(QuitterGroupeDTO quitterGroupeDTO) {
        Groupe groupe = getGroupeById(quitterGroupeDTO.idGroupe());
        Etudiant etudiant = serviceEtudiant.getEtudiantById(quitterGroupeDTO.idEtudiant());

        groupe.getEtudiants().remove(etudiant);

        if (groupe.getEtudiants().isEmpty()) {
            supprimerGroupeInterne(null, groupe);
            return new SucessDTO(true, "vous avez quitter le groupe");
        }

        serviceConversation.retirerEtudiantConversationGroupe(
                quitterGroupeDTO.idGroupe(),
                quitterGroupeDTO.idEtudiant()
        );

        if (estUnChef(groupe, etudiant)) {
            groupe.setChef(groupe.getEtudiantsList().get(0));
        }

        return new SucessDTO(true, "vous avez quitter le groupe");
    }

    @Transactional
    public boolean estUnChef(Groupe group, Etudiant etudiant) {
        return group.getChef().getId().equals(etudiant.getId());
    }

    @Transactional
    public SucessDTO rejoindreGroupe(RetourInvitationDTO invitation) {
        Etudiant etudiant = serviceEtudiant.getEtudiantByUsername(invitation.getEtudiantNomUtilisateur());
        Groupe group = getGroupeById(invitation.getDestination());

        group.getEtudiants().add(etudiant);

        serviceConversation.ajouterEtudiantConversationGroupe(
                group.getId().toString(),
                etudiant.getId().toString()
        );

        serviceNotification.deleteNotification(invitation.getId());

        return new SucessDTO(true, "vous avez ete ajouter dans le groupe");
    }

    @Transactional
    public Groupe creerGroupe(CreationDeGroupeDTO groupeDTO, ServiceConversation serviceConversation) {
        Etudiant chef = serviceEtudiant.getEtudiantById(groupeDTO.chefID());
        Groupe groupe = new Groupe(chef, groupeDTO.nomGroup());

        entityManager.persist(groupe);
        entityManager.flush();

        var conversationDTO = new CreationConversationDTO(
                groupeDTO.chefID(),
                groupeDTO.nomGroup(),
                groupe.getId().toString()
        );

        serviceConversation.creerConversation(conversationDTO);

        return groupe;
    }

    @Transactional
    public void supprimerGroupeInterne(String idGroupe, Groupe groupe) {
        UUID id = groupe == null ? UUID.fromString(idGroupe) : groupe.getId();

        try {
            entityManager.createQuery("delete FROM Groupe g where g.id = :id")
                    .setParameter("id", id)
                    .executeUpdate();

            supprimerConversationDuGroupeSiExiste(id.toString());

            new SucessDTO(true, "groupe supprimer");
            return;
        } catch (Exception ignored) {
        }

        new SucessDTO(false, "groupe non supprimer");
    }

    @Transactional
    public SucessDTO supprimerGroupe(SupprimerGroupeDTO supprimerGroupeDTO) {
        try {
            Groupe groupe = getGroupeById(supprimerGroupeDTO.groupeId());
            Etudiant etudiant = serviceEtudiant.getEtudiantById(supprimerGroupeDTO.chefId());

            if (!estUnChef(groupe, etudiant)) {
                throw new LinkUpException(
                        ERREUR_TYPE.ERREUR_METIER_LOGIQUE,
                        "peut pas supprimer un groupe si nest pas chef"
                );
            }

            entityManager.createQuery("delete from Groupe g where g.id = :id")
                    .setParameter("id", groupe.getId())
                    .executeUpdate();

            supprimerConversationDuGroupeSiExiste(groupe.getId().toString());

            return new SucessDTO(true, "le groupe a ete supprimer");
        } catch (LinkUpException e) {
            throw new LinkUpException(
                    ERREUR_TYPE.ERREUR_METIER_LOGIQUE,
                    e.getMessage()
            );
        } catch (Exception e) {
            throw new LinkUpException(
                    ERREUR_TYPE.ERREUR_INTERNE,
                    "Impossible de supprimer le groupe pour le moment"
            );
        }
    }

    @Transactional
    public List<Groupe> getToutGroupesDeUser(String utilisateurID) {
        return entityManager
                .createQuery(
                        "select g from Groupe g join g.etudiants e where e.id = :utilisateurID",
                        Groupe.class
                )
                .setParameter("utilisateurID", UUID.fromString(utilisateurID))
                .getResultList();
    }

    @Transactional
    public SucessDTO virerEtudiant(VirerEtudiantDTO virerEtudiantDTO) {
        String idVireur = virerEtudiantDTO.etudiantQuiVireId();
        String nomUtilisateur = virerEtudiantDTO.nomUtilisateur();
        String groupeId = virerEtudiantDTO.groupid();

        Etudiant vireur = serviceEtudiant.getEtudiantById(idVireur);
        Etudiant etudiantAVirer = serviceEtudiant.getEtudiantByUsername(nomUtilisateur);

        Groupe group = getGroupeById(groupeId);

        if (!group.getChef().getId().equals(vireur.getId())) {
            throw new LinkUpException(
                    ERREUR_TYPE.ERREUR_METIER_LOGIQUE,
                    Utilitary.MESSAGE_ACTION_DEMANDE_CHEF_INVITATION
            );
        }

        if (etudiantAVirer.getId().toString().equals(idVireur)) {
            throw new LinkUpException(
                    ERREUR_TYPE.ERREUR_METIER_LOGIQUE,
                    "vous ne pouvez pas vous virer vous meme"
            );
        }

        group.getEtudiants().remove(etudiantAVirer);

        serviceConversation.retirerEtudiantConversationGroupe(
                groupeId,
                etudiantAVirer.getId().toString()
        );

        return new SucessDTO(true, "letudiant a ete virer");
    }

    @Transactional
    public void quitterTousLesGroupes(String idEtudiant) {
        List<Groupe> groupes = getToutGroupesDeUser(idEtudiant);

        for (var groupe : groupes) {
            QuitterGroupeDTO dto = new QuitterGroupeDTO(
                    groupe.getId().toString(),
                    idEtudiant
            );

            quitterGroupe(dto);
        }

        new SucessDTO(true, "letudiant a pu quitter");
    }

    private void supprimerConversationDuGroupeSiExiste(String idGroupe) {
        try {
            serviceConversation.supprimerConversation(idGroupe);
        } catch (Exception ignored) {
        }
    }


}