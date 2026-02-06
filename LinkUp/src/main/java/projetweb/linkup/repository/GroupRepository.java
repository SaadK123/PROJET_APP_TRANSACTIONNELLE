package projetweb.linkup.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import projetweb.linkup.entity.Group;

public interface GroupRepository extends JpaRepository<Group, String> {
}
