package projetweb.linkup.Services;


import DTO.ACTIONS.AuthentificationDTO;
import DTO.ACTIONS.CreateStudentDTO;
import jakarta.persistence.EntityManager;
import jakarta.persistence.NoResultException;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.UniqueConstraint;
import jakarta.transaction.TransactionScoped;
import jakarta.transaction.Transactional;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import projetweb.linkup.entity.Etudiant;
import projetweb.linkup.entity.Horaire;
import projetweb.linkup.entity.Jour;
import projetweb.linkup.entity.SecurityConfig;

import javax.swing.text.html.Option;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class ServiceEtudiant {

    private final PasswordEncoder passwordEncoder;
    @PersistenceContext
    private EntityManager entityManager;


    public Optional<Etudiant> getEtudiantById(String id) {
        if(id == null || id.isBlank() || id.length() != 36) return Optional.empty();
        try {
            Etudiant e = (Etudiant) entityManager.createQuery("select e from Etudiant  e where id = :id")
                    .setParameter("id",id).getSingleResult();
            return Optional.of(e);
        }catch(NoResultException ex) {
            return Optional.empty(); // todo error enum
        }
    }

    public Optional<Etudiant> getEtudiantByUsername(String username) {
        if(username == null || username.isBlank()) return Optional.empty();

        try {
            Etudiant e = (Etudiant) entityManager.createQuery("select e from Etudiant e where username = :username")
                    .setParameter("username",username).getSingleResult();
            return Optional.of(e);
        } catch (NoResultException e) {
            return Optional.empty(); // todo error enum
        }

    }

    public Optional<List<Etudiant>> getEtudiantsByFirstName(String name,boolean isfirstname) {
        if(name == null || name.isBlank()) return Optional.empty();
        name = name.toLowerCase();
        List<Etudiant> etudiants =  isfirstname ?
                entityManager.createQuery("select e from Etudiant e where lower(e.firstname) = :firstname ",Etudiant.class)
                        .setParameter("firstname",name).getResultList():
                entityManager.createQuery("select e from Etudiant e where lower(e.lastname) = :lastname",Etudiant.class)
                        .setParameter("lastname",name).getResultList();


        return etudiants.isEmpty() ? Optional.empty() : Optional.of(etudiants);
    }



    public  ServiceEtudiant( PasswordEncoder passwordEncoder) {

        this.passwordEncoder = passwordEncoder;
    }

    @Transactional
    public Optional<Etudiant> createEtudiant(CreateStudentDTO dto) {
        if(dto == null) return Optional.empty();
       Etudiant e = new Etudiant();

       e.setEmail(dto.email());
       e.setFirstname(dto.firstname());
       e.setPasswordhash(passwordEncoder.encode(dto.password()));
       e.setLastname(dto.lastname());
       e.setUsername(dto.username());
       e.setLastdate(LocalDate.now());


           entityManager.persist(e);

        entityManager.flush();

       return Optional.of(e);
    }






}
