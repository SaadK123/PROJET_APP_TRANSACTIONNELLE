package projetweb.linkup.Services;


import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import jakarta.persistence.TypedQuery;
import org.springframework.stereotype.Service;
import projetweb.linkup.DB_SERVICES.Action;
import projetweb.linkup.entity.Etudiant;

import java.util.HashMap;
import java.util.Optional;

@Service
public class ServiceEtudiant {




    @PersistenceContext
    private  EntityManager entityManager;




    public final HashMap<String, Action> GETS = new HashMap<>() {{

     put("GetById", new Action<ServiceEtudiant>() {
         @Override
         public Optional<ServiceEtudiant> Execute(String... obj) {

             Query jpqlQuery = entityManager.createQuery("SELECT u FROM Group u WHERE u.id=:id");
             jpqlQuery.setParameter("id", id);
             return (UserEntity) jpqlQuery.getSingleResult();
         }


     });
    }} ;// TODO



    public final Action CREATE =  new Action() {
        @Override
        public Optional<ServiceEtudiant> Execute(String... obj) {

            return Optional.empty();
        }
    };
}
