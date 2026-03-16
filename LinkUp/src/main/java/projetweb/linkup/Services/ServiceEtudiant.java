package projetweb.linkup.Services;


import projetweb.linkup.DTO.ACTIONS.CreationEtudiantDTO;
import projetweb.linkup.DTO.ACTIONS.SupprimerEtudiantDTO;
import projetweb.linkup.DTO.ACTIONS.SucessDTO;
import projetweb.linkup.DTO.TYPES.MiseAJourEtudiantMotDePasse;
import projetweb.linkup.DTO.TYPES.MiseAJourEtudiantProfil;
import projetweb.linkup.Exceptions.LinkUpException;
import projetweb.linkup.Util.Utilitary;
import jakarta.persistence.EntityManager;
import jakarta.persistence.NoResultException;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import projetweb.linkup.Enumerations.ERREUR_TYPE;
import projetweb.linkup.entities.Etudiant;
import projetweb.linkup.entities.Groupe;
import projetweb.linkup.entities.Horaire;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class ServiceEtudiant {

    private final PasswordEncoder passwordEncoder;
    private final ServiceGroupe serviceGroupe;
    @PersistenceContext
    private EntityManager entityManager;

    @Transactional
    public Etudiant getEtudiantById(String id) {

        try {
            UUID uuid = UUID.fromString(id);

         return   entityManager.createQuery("select e from Etudiant  e where e.id = :uuid",Etudiant.class)
                    .setParameter("uuid", uuid).getSingleResult();
        } catch (Exception e) {
            throw new LinkUpException(ERREUR_TYPE.CHAMPS_MANQUANTS,"aucune personne trouver");
        }
    }


    @Transactional
    public Etudiant getEtudiantByUsername(String nomUtilisateur) {


        try {
           return  (Etudiant) entityManager.createQuery("select e from Etudiant e where e.nomUtilisateur = :nomUtilisateur")
                    .setParameter("nomUtilisateur", nomUtilisateur).getSingleResult();

        } catch (NoResultException e) {
           throw new LinkUpException(ERREUR_TYPE.NON_EXISTANT,"etudiant nexsite pas");
        }

    }
    public ServiceEtudiant(PasswordEncoder passwordEncoder, ServiceGroupe serviceGroupe) {

        this.passwordEncoder = passwordEncoder;
        this.serviceGroupe = serviceGroupe;
    }

    @Transactional

    @SuppressWarnings("NullPointerException")
    public Etudiant creerEtudiant(CreationEtudiantDTO dto) {
        if (dto == null) throw new LinkUpException(ERREUR_TYPE.CHAMPS_MANQUANTS, Utilitary.EXCEPTION_CHAMPS_MANQUANTS);
        Etudiant e = new Etudiant();


        e.setCourriel(dto.courriel());
        e.setPrenom(dto.prenom());
        e.setMotDePasseHash(passwordEncoder.encode(dto.motDePasse()));
        e.setNom(dto.nom());
        e.setHoraire(new Horaire());
        e.getHoraire().setActivites(new ArrayList<>());
        e.setNomUtilisateur(dto.nomUtilisateur());
        e.setEcole(dto.ecole());
        e.setDernierDate(LocalDate.now());

 try {


   entityManager.createQuery("insert into Etudiant (courriel,prenom,nom,nomUtilisateur,motDePasseHash,ecole,dernierDate)" +
           " values (:courriel,:prenom,:nom,:nomUtilisateur,:motDePasseHash,:ecole,:dernierDate)")
           .setParameter("courriel", e.getCourriel()).setParameter("prenom", e.getPrenom()).setParameter("nom", e.getNom());
     entityManager.persist(e);

     entityManager.flush();
 }catch (Exception ex) {

     switch (ex.getMessage()) {
         case "UK_EMAIL" -> throw new LinkUpException(ERREUR_TYPE.CONTRAINTE_UNIQUE, Utilitary.EXCEPTION_MESSAGE_DUPLICATION_EMAIL);
         case "UK_USERNAME" -> throw new LinkUpException(ERREUR_TYPE.CONTRAINTE_UNIQUE, Utilitary.EXCEPTION_MESSAGE_DUPLICATION_USERNAME);
         default ->  throw ex;
     }
 }


        return e;
    }

    @Transactional
    public SucessDTO supprimerEtudiant(SupprimerEtudiantDTO dto) {


        Etudiant e = getEtudiantByCourrielEtMotDePasse(dto.courriel(),dto.motDePasse());
        serviceGroupe.quitterTousLesGroupes(e.getId().toString());
       entityManager.createQuery("delete Etudiant e where e.id = :id")
               .setParameter("id",e.getId()).getSingleResult();

        entityManager.flush();

      return new SucessDTO(true,Utilitary.MESSAGE_ETUDIANT_ENLEVER);
    }



    @Transactional

  public  Etudiant getEtudiantByCourrielEtMotDePasse(String courriel,String motDePasse) {
        try {
            ///  on recupere dabors letudiant si cest null sa va jeter une exception
            Etudiant etudiant = (Etudiant) entityManager.createQuery("select e from Etudiant  e " +
                    "where e.courriel = :courriel").setParameter("courriel",courriel).getSingleResult();
            ///  ensuite ici si cest pas le meme mot de passe sa va jeter une exception
            if(!passwordEncoder.matches(motDePasse, etudiant.getMotDePasseHash())) {
                throw new LinkUpException(ERREUR_TYPE.NON_EXISTANT,Utilitary.EXCEPTION_MESSAGE_NON_EXISTANT);
            }
            return etudiant;
        } catch (Exception e) {
         throw new LinkUpException(ERREUR_TYPE.NON_EXISTANT,Utilitary.EXCEPTION_MESSAGE_NON_EXISTANT);
        }

    }
    @Transactional
    public SucessDTO miseAJourEtudiantProfil(MiseAJourEtudiantProfil updateDTO) {
        Etudiant e = getEtudiantById(updateDTO.getEtudiantID());

        try {
            if (updateDTO.getNomUtilisateur() != null) {
                e.setNomUtilisateur(updateDTO.getNomUtilisateur());
            }

            if (updateDTO.getNom() != null) {
                e.setNom(updateDTO.getNom());
            }

            if (updateDTO.getPrenom() != null) {
                e.setPrenom(updateDTO.getPrenom());
            }

            if (updateDTO.getEcole() != null) {
                e.setEcole(updateDTO.getEcole());
            }

            ///  ici on change le profil et on persiste la nouvelle entite avec le flush
            entityManager.flush();
            return new SucessDTO(true, Utilitary.MESSAGE_ETUDIANT_MODIFICATION);

        } catch (Exception ex) {
            switch (ex.getMessage()) {
                case "UK_EMAIL" -> throw new LinkUpException(
                        ERREUR_TYPE.CONTRAINTE_UNIQUE,
                        Utilitary.EXCEPTION_MESSAGE_DUPLICATION_EMAIL
                );
                case "UK_USERNAME" -> throw new LinkUpException(
                        ERREUR_TYPE.CONTRAINTE_UNIQUE,
                        Utilitary.EXCEPTION_MESSAGE_DUPLICATION_USERNAME
                );
                default -> throw new LinkUpException(
                        ERREUR_TYPE.ERREUR_INTERNE,
                        ex.getMessage()
                );
            }
        }
    }
    @Transactional
    public SucessDTO miseAJourEtudiantMotDePasse(MiseAJourEtudiantMotDePasse miseAJourEtudiantMotDePasse){
        String etudiantId = miseAJourEtudiantMotDePasse.getEtudiantID();
        Etudiant e =  getEtudiantById(etudiantId);
           ///  si le nouveau mot de passe nest pas null et que lancien mot de passe ecrit equivaut au mot de passe alors on change
        if( miseAJourEtudiantMotDePasse.getNouveauMotDePasse() != null && passwordEncoder.matches(miseAJourEtudiantMotDePasse.getVieuxMotDePasse(),e.getMotDePasseHash()))
            e.setMotDePasseHash(passwordEncoder.encode(miseAJourEtudiantMotDePasse.getNouveauMotDePasse()));

        else{
            ///  sinon on jete une exception avec le fait que les identifiants sont invalide
           throw new LinkUpException(ERREUR_TYPE.NON_EXISTANT, Utilitary.EXCEPTION_MESSAGE_IDENTIFIANTS_INVALIDES);
        }
       return new SucessDTO(true,Utilitary.MESSAGE_ETUDIANT_MODIFICATION);
    }





}
