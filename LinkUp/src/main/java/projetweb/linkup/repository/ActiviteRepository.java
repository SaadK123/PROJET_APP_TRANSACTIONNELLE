package projetweb.linkup.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import projetweb.linkup.entity.Activite;

public interface ActiviteRepository extends JpaRepository<Activite, String> {
}
