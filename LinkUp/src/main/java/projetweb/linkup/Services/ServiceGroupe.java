package projetweb.linkup.Services;

import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import projetweb.linkup.DTO.ACTIONS.*;
import projetweb.linkup.DTO.TYPES.RequestInvitationDTO;
import projetweb.linkup.Exceptions.LinkUpException;
import projetweb.linkup.Util.Utilitary;
import jakarta.persistence.EntityManager;
import jakarta.persistence.NoResultException;
import jakarta.persistence.PersistenceContext;
import projetweb.linkup.Enumerations.ERROR_TYPE;
import projetweb.linkup.entities.Etudiant;
import projetweb.linkup.entities.Group;
import projetweb.linkup.entities.Invitation;

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
    public Group getGroupById(String groupIdString) {

        try {
            UUID groupId = UUID.fromString(groupIdString);
            return  entityManager.
              createQuery("select g from Group g where g.id = :groupId", Group.class)
                    .setParameter("groupId", groupId).getSingleResult();
        } catch (NoResultException ex) {
        throw  new LinkUpException(ERROR_TYPE.NON_EXISTANT, Utilitary.EXCEPTION_UTILISATEUR_NON_TROUVER);
        }

    }

    @Transactional
    public SucessDTO sendRequestToAnEtudiant(RequestInvitationDTO requestInvitationDTO) {
        Group group = getGroupById(requestInvitationDTO.getGroupId());
        Etudiant receveur = serviceEtudiant.getEtudiantByUsername(requestInvitationDTO.getEtudiantUsername());
        Etudiant envoyeur =  serviceEtudiant.getEtudiantById(requestInvitationDTO.getEnvoyeurId());
        if (!group.getChef().getId().equals(envoyeur.getId())) {
           throw new LinkUpException(ERROR_TYPE.ERREUR_METIER_LOGIQUE,
                   Utilitary.MESSAGE_ACTION_DEMANDE_CHEF_INVITATION);
        }
        Invitation invitation = new Invitation(group,envoyeur,
                requestInvitationDTO.getType(), requestInvitationDTO.getTitre(),requestInvitationDTO.getMessage());
        return serviceNotification.addNotificationToStudent(invitation,receveur);

    }

    @Transactional
    public SucessDTO quitterGroupe(QuitterGroupeDTO quitterGroupeDTO) {
        Group group = getGroupById(quitterGroupeDTO.idGroupe());
        Etudiant etudiant = serviceEtudiant.getEtudiantById(quitterGroupeDTO.idEtudiant());

        group.getEtudiants().remove(etudiant);

        if (group.getEtudiants().isEmpty()) {
            SucessDTO sucessDTO = supprimerGroupe(null, group);
            if(sucessDTO.success()) {

            }
        } else if (estUnChef(group, etudiant)) {
            group.setChef(group.getEtudiantsList().get(0));
        }

        return new SucessDTO(true,"vous avez quitter le groupe");
    }

    @Transactional
    public boolean estUnChef(Group group,Etudiant etudiant) {
        return group.getChef().getId().equals(etudiant.getId());
    }



    @Transactional
    public SucessDTO rejoindreGroupe(INVITATION_GROUPE_DTO invitation) {
        Etudiant etudiant = serviceEtudiant.getEtudiantById(invitation.idEtudiant());
        Group group = getGroupById(invitation.idGroupe());

        group.getEtudiants().add(etudiant);

        return new SucessDTO(true,"vous avez ete ajouter dans le groupe");
    }
    @Transactional
    public Group createGroup(CreateGroupDTO group) {
        

        Etudiant e =  serviceEtudiant.getEtudiantById(group.chefID());

        Group g = new Group(e,group.nomGroup());
        g.getEtudiants().add(e);
        entityManager.persist(g);
        entityManager.flush();

        return g;
    }

  @Transactional
    public SucessDTO supprimerGroupe(String idGroup,Group group) {

        UUID str = group == null ? UUID.fromString(idGroup):group.getId();

        try {
            entityManager.createQuery("delete FROM Group g where g.id = :id")
                    .setParameter("id",str).executeUpdate();
            return new SucessDTO(true,"groupe supprimer");
        } catch (Exception ignored) {

        }
        return new SucessDTO(false,"groupe non supprimer");
    }



    @Transactional
    public List<Group> getAllgroupsFromUser(String userID) {
        return entityManager.createQuery("select g from  Group g  join g.etudiants e where e.id = :userID", Group.class).
                setParameter("userID",UUID.fromString(userID)).getResultList();
    }


    @Transactional
    public SucessDTO virerEtudiant(VirerEtudiantDTO virerEtudiantDTO) {
        String idVireur = virerEtudiantDTO.etudiantQuiVireId();
        String idVirer = virerEtudiantDTO.etudiantAVirerId();


        String groupId =  virerEtudiantDTO.groupid();
        Etudiant vireur = serviceEtudiant.getEtudiantById(idVireur);
        Etudiant virer  = serviceEtudiant.getEtudiantById(idVirer);

        Group group = getGroupById(groupId);

        if(!group.getChef().getId().equals(vireur.getId())) {
            throw new LinkUpException(ERROR_TYPE.ERREUR_METIER_LOGIQUE,Utilitary.MESSAGE_ACTION_DEMANDE_CHEF_INVITATION);
        }else if(idVirer.equals(idVireur)) {
                throw new LinkUpException(ERROR_TYPE.ERREUR_METIER_LOGIQUE,"vous ne pouvez pas vous virer vous meme");
        }
        group.getEtudiants().remove(virer);

        return new SucessDTO(true,"letudiant a ete virer");
    }


}
