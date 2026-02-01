package projetweb.linkup;


import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import projetweb.linkup.entity.Etudiant;
import projetweb.linkup.repository.EtudiantRepository;

@SpringBootTest
public class RepositorySmokeTest {

    @Autowired
    private EtudiantRepository etudiantRepository;

    @Test
    void saveAndReadEtudiant() {
        Etudiant e = new Etudiant();
        e.setEmail("test@exemple.com");
        e.setUsername("testuser");
        e.setLastname("Test");
        e.setFirstName("User");
        e.setPassword("1234");

        Etudiant saved = etudiantRepository.save(e);

        assert etudiantRepository.findById(saved.getId()).isPresent();
    }
}
