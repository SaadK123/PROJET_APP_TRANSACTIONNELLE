package projetweb.linkup.Services;
import java.util.List;
import projetweb.linkup.entity.Etudiant;

public interface EtudiantService {

    List<Etudiant> findAllEtudiants();
    Etudiant findEtudiantById(String id);
    void saveEtudiant(Etudiant etudiant);
    void deleteEtudiantById(String id);

}
