package projetweb.linkup.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import projetweb.linkup.entity.Etudiant;

import java.util.Optional;

public interface EtudiantRepository extends JpaRepository<Etudiant, String> {

    Optional<Etudiant> findByEmail(String email);
    Optional <Etudiant> findByUsername(String username);
}
