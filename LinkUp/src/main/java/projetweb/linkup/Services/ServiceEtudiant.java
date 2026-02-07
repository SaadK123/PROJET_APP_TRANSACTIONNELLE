package projetweb.linkup.Services;


import jakarta.persistence.EntityManager;
import jakarta.persistence.NoResultException;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Service;
import projetweb.linkup.entity.Etudiant;

import java.util.List;
import java.util.Optional;

@Service
public class ServiceEtudiant {

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

    public Optional<List<Etudiant>> getEtudiantsByFirstName(String firstname) {
        if(firstname == null || firstname.isBlank()) return Optional.empty();
        firstname = firstname.toLowerCase();
        List<Etudiant> etudiants =  entityManager.createQuery("select e from Etudiant e where lower(e.firstName) like concat(:firstname, '%')",Etudiant.class)
                .setParameter("firstname",firstname).getResultList();

        return etudiants.isEmpty() ? Optional.empty() : Optional.of(etudiants);
    }


    
    public Optional<List<Etudiant>> getEtudiantsByLastName(String lastname) {
        if(lastname == null || lastname.isBlank()) return Optional.empty();
        lastname = lastname.toLowerCase();
        List<Etudiant> etudiants = entityManager.createQuery("select  e from Etudiant e where lower(e.lastname) like concat(:lastname,'%')",Etudiant.class)
                .setParameter("lastname",lastname).getResultList();

        return etudiants.isEmpty() ? Optional.empty() : Optional.of(etudiants);
    }
}
