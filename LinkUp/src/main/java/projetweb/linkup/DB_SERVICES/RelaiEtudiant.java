package projetweb.linkup.DB_SERVICES;


import org.springframework.stereotype.Repository;
import projetweb.linkup.entity.Etudiant;

import java.util.Optional;

@Repository
public interface RelaiEtudiant {

    Optional<Etudiant> ActionEtudiant(String... obj);


}
