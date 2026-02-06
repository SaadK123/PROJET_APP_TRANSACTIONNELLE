package projetweb.linkup.Services;


import jakarta.persistence.NoResultException;
import jakarta.persistence.TypedQuery;
import org.springframework.stereotype.Service;
import projetweb.linkup.DB_SERVICES.Action;
import projetweb.linkup.entity.Etudiant;

import java.util.HashMap;
import java.util.Optional;

@Service
public class ServiceEtudiant {







    public final HashMap<String,Action<Etudiant>> GETS = new HashMap<>() {{
        put("getById", new Action<Etudiant>() {
            @Override
            public Optional<Etudiant> Execute(HashMap<String,String> data) {
              String id = data.get("id");
              if(id == null) return Optional.empty();

              try {
                    Etudiant e = EntityManagement.entity.entityManager.createQuery(
                                    "select e from Etudiant e where e.id = :id",
                                    Etudiant.class
                            ).setParameter("id", id)
                            .getSingleResult();

                    return Optional.of(e);
                } catch (NoResultException ex) {
                    return Optional.empty();
                }

            };


        });
        put("GetByEmail", new Action<Etudiant>() {
            @Override
            public Optional<Etudiant> Execute(HashMap<String, String> data) {
                String email = data.get("email");
                if(email == null) return Optional.empty();

                try {
                    Etudiant e = (Etudiant) EntityManagement.entity.entityManager.createQuery("select e from Etudiant  e where email = :email");
                    return Optional.of(e);
                } catch (Exception e) {
                    return Optional.empty();
                }
            }
        });
    }};
}
