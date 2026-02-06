package projetweb.linkup.Services;

import org.springframework.expression.spel.ast.OpAnd;
import org.springframework.stereotype.Service;
import projetweb.linkup.entity.Etudiant;
import projetweb.linkup.repository.EtudiantRepository;

import java.util.List;
import java.util.Optional;

@Service
public class EtudiantServiceImpl implements  EtudiantService{

    private EtudiantRepository etudiantRepository;

    @Override
    public List<Etudiant> findAllEtudiants() {
        return etudiantRepository.findAll();
    }

    @Override
    public Etudiant findEtudiantById(String id) {

        Optional <Etudiant> etudiant = etudiantRepository.findById(id);
        return null;
    }

    @Override
    public void saveEtudiant(Etudiant etudiant) {

    }

    @Override
    public void deleteEtudiantById(String id) {

    }
}
