package projetweb.linkup.Services;


import projetweb.linkup.DTO.ACTIONS.CreateStudentDTO;
import projetweb.linkup.DTO.ACTIONS.DeleteStudentDTO;
import projetweb.linkup.DTO.ACTIONS.SucessDTO;
import projetweb.linkup.DTO.TYPES.UpdateEtudiantPassword;
import projetweb.linkup.DTO.TYPES.UpdateEtudiantProfile;
import projetweb.linkup.Exceptions.LinkUpException;
import projetweb.linkup.Util.Utilitary;
import jakarta.persistence.EntityManager;
import jakarta.persistence.NoResultException;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import projetweb.linkup.Enumerations.ERROR_TYPE;
import projetweb.linkup.entities.Etudiant;
import projetweb.linkup.entities.Group;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class ServiceEtudiant {

    private final PasswordEncoder passwordEncoder;
    @PersistenceContext
    private EntityManager entityManager;

    @Transactional
    public Etudiant getEtudiantById(String id) {

        try {
            UUID uuid = UUID.fromString(id);
         return   entityManager.createQuery("select e from Etudiant  e where e.id = :uuid",Etudiant.class)
                    .setParameter("uuid", uuid).getSingleResult();
        } catch (Exception e) {
            throw new LinkUpException(ERROR_TYPE.CHAMPS_MANQUANTS,e.getMessage());
        }
    }


    @Transactional
    public Etudiant getEtudiantByUsername(String username) {


        try {
           return  (Etudiant) entityManager.createQuery("select e from Etudiant e where username = :username")
                    .setParameter("username", username).getSingleResult();

        } catch (NoResultException e) {
           throw new LinkUpException(ERROR_TYPE.NON_EXISTANT,"etudiant nexsite pas");
        }

    }

    @Transactional
    public Optional<List<Etudiant>> getEtudiantByFirstName(String name, boolean isfirstname) {
        if (name == null || name.isBlank()) return Optional.empty();
        name = name.toLowerCase();
        List<Etudiant> etudiants = isfirstname ?
                entityManager.createQuery("select e from Etudiant e where lower(e.firstname) = :firstname ", Etudiant.class)
                        .setParameter("firstname", name).getResultList() :
                entityManager.createQuery("select e from Etudiant e where lower(e.lastname) = :lastname", Etudiant.class)
                        .setParameter("lastname", name).getResultList();


        return etudiants.isEmpty() ? Optional.empty() : Optional.of(etudiants);
    }


    public ServiceEtudiant(PasswordEncoder passwordEncoder) {

        this.passwordEncoder = passwordEncoder;
    }

    @Transactional

    @SuppressWarnings("NullPointerException")
    public Etudiant createEtudiant(CreateStudentDTO dto) {
        if (dto == null) throw new LinkUpException(ERROR_TYPE.CHAMPS_MANQUANTS, Utilitary.EXCEPTION_CHAMPS_MANQUANTS);
        Etudiant e = new Etudiant();


        e.setEmail(dto.email());
        e.setFirstname(dto.firstname());
        e.setPasswordhash(passwordEncoder.encode(dto.password()));
        e.setLastname(dto.lastname());
        e.setUsername(dto.username());
        e.setEcole(dto.ecole());
        e.setLastdate(LocalDate.now());

 try {


   entityManager.createQuery("insert into Etudiant (email,firstname,lastname,username,passwordhash,ecole,lastdate)" +
           " values (:email,:firstname,:lastname,:username,:passwordhash,:ecole,:lastdate)")
           .setParameter("email", e.getEmail()).setParameter("firstname", e.getFirstname()).setParameter("lastname", e.getLastname());
     entityManager.persist(e);

     entityManager.flush();
 }catch (Exception ex) {

     switch (ex.getMessage()) {
         case "UK_EMAIL" -> throw new LinkUpException(ERROR_TYPE.CONTRAINTE_UNIQUE, Utilitary.EXCEPTION_MESSAGE_DUPLICATION_EMAIL);
         case "UK_USERNAME" -> throw new LinkUpException(ERROR_TYPE.CONTRAINTE_UNIQUE, Utilitary.EXCEPTION_MESSAGE_DUPLICATION_USERNAME);
         default ->  throw ex;
     }
 }


        return e;
    }

    @Transactional
    public SucessDTO deleteEtudiant(DeleteStudentDTO dto) {



        String passwordHash =  passwordEncoder.encode(dto.password());
        Etudiant e = getEtudiantByEmailAndPassword(dto.email(),passwordHash);

        entityManager.remove(e);
        entityManager.flush();

      return new SucessDTO(true,Utilitary.MESSAGE_ETUDIANT_ENLEVER);
    }



    @Transactional

    Etudiant getEtudiantByEmailAndPassword(String email,String passwordHash) {
        try {

            return (Etudiant) entityManager.createQuery("select e from Etudiant  e where e.passwordhash = :passwordHash " +
                            "and e.email = :email",
                            Etudiant.class)
                    .setParameter("passwordHash",passwordHash).setParameter("email",email);
        } catch (Exception e) {
         throw new LinkUpException(ERROR_TYPE.NON_EXISTANT,Utilitary.EXCEPTION_MESSAGE_NON_EXISTANT);
        }
    }
    @Transactional
    public void updateEtudiantProfile(UpdateEtudiantProfile updateDTO) {
        Etudiant e = getEtudiantById(updateDTO.getEtudiantID());

        if (updateDTO.getUsername() != null) {
            e.setUsername(updateDTO.getUsername());
        }

        if (updateDTO.getLastname() != null) {
            e.setLastname(updateDTO.getLastname());
        }

        if (updateDTO.getFirstname() != null) {
            e.setFirstname(updateDTO.getFirstname());
        }

        if (updateDTO.getEcole() != null) {
            e.setEcole(updateDTO.getEcole());
        }
    }

    @Transactional
    public SucessDTO updateEtudiantPassword(UpdateEtudiantPassword updateEtudiantPassword){
        String etudiantId = updateEtudiantPassword.getEtudiantID();
        Etudiant e =  getEtudiantById(etudiantId);

        if( updateEtudiantPassword.getNewPassword() != null && passwordEncoder.matches(updateEtudiantPassword.getOldPassword(),e.getPasswordhash()))
            e.setPasswordhash(passwordEncoder.encode(updateEtudiantPassword.getNewPassword()));

        else{
           throw new LinkUpException(ERROR_TYPE.NON_EXISTANT, Utilitary.EXCEPTION_MESSAGE_IDENTIFIANTS_INVALIDES);
        }
       return new SucessDTO(true,Utilitary.MESSAGE_ETUDIANT_MODIFICATION);
    }





}
