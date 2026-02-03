package projetweb.linkup.DB_SERVICES;


import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import projetweb.linkup.DTO_RECORDS.EtudiantDto;
import projetweb.linkup.entity.Etudiant;

import java.util.List;
import java.util.Optional;

@Repository
public interface RelaiEtudiant {

    Optional<Etudiant> ActionEtudiant(String... obj);


}
