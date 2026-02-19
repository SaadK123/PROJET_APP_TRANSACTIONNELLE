package projetweb.linkup.Services;


import DTO.ACTIONS.CreateStudentDTO;
import DTO.ACTIONS.DeleteStudentDTO;
import DTO.ACTIONS.UpdateEtudiantDTO;
import DTO.ACTIONS.UpdateStudentDTO;
import Exceptions.LinkUpException;
import Util.Utilitary;
import jakarta.persistence.EntityManager;
import jakarta.persistence.NoResultException;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import projetweb.linkup.Enumerations.ERROR_TYPE;
import projetweb.linkup.entity.Etudiant;

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
    public Optional<Etudiant> getEtudiantById(String id) {
        if (id == null || id.isBlank() || id.length() != 36) return Optional.empty();
        try {
            Etudiant e = (Etudiant) entityManager.createQuery("select e from Etudiant  e where id = :id")
                    .setParameter("id", id).getSingleResult();
            return Optional.of(e);
        } catch (NoResultException ex) {
            return Optional.empty(); // todo error enum
        }
    }

    @Transactional
    public Optional<Etudiant> getEtudiantByUsername(String username) {
        if (username == null || username.isBlank()) return Optional.empty();

        try {
            Etudiant e = (Etudiant) entityManager.createQuery("select e from Etudiant e where username = :username")
                    .setParameter("username", username).getSingleResult();
            return Optional.of(e);
        } catch (NoResultException e) {
            return Optional.empty(); // todo error enum
        }

    }

    @Transactional
    public Optional<List<Etudiant>> getEtudiantsByFirstName(String name, boolean isfirstname) {
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
    public Optional<Etudiant> createEtudiant(CreateStudentDTO dto) {
        if (dto == null) new LinkUpException(ERROR_TYPE.CHAMPS_MANQUANTS, Utilitary.EXCEPTION_CHAMPS_MANQUANTS).throwIt();
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
         case "UK_EMAIL" -> new LinkUpException(ERROR_TYPE.CONTRAINTE_UNIQUE, Utilitary.EXCEPTION_MESSAGE_DUPLICATION_EMAIL).throwIt();
         case "UK_USERNAME" -> new LinkUpException(ERROR_TYPE.CONTRAINTE_UNIQUE, Utilitary.EXCEPTION_MESSAGE_DUPLICATION_USERNAME).throwIt();
         default -> throw ex;
     }
 }


        return Optional.of(e);
    }

    @Transactional
    public Optional<Etudiant> deleteEtudiant(DeleteStudentDTO dto) {
        if (dto == null) return Optional.empty();
        if (dto.email() == null || dto.password() == null) return Optional.empty();

        Etudiant e = entityManager.createQuery(
                        "select e from Etudiant e where e.email = :email and e.passwordhash = :password",
                        Etudiant.class
                )
                .setParameter("email", dto.email()).setParameter("password", passwordEncoder.encode(dto.password())).getResultList().get(0);


        if (e == null) new LinkUpException(ERROR_TYPE.NON_EXISTANT, Utilitary.EXCEPTION_MESSAGE_NON_EXISTANT).throwIt();

        if (!passwordEncoder.matches(dto.password(), e.getPasswordhash())) {
            return Optional.empty();
        }

        entityManager.remove(e);
        entityManager.flush();

        return Optional.of(e);
    }

    @Transactional
    public Optional<Etudiant> updateEtudiant(){

    }

}
