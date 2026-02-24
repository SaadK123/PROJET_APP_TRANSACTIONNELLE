package projetweb.linkup.Services;

import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import projetweb.linkup.entities.Activite;
import projetweb.linkup.entities.Etudiant;

import java.util.ArrayList;
import java.util.List;
@Service
public class ServiceHoraire {

    private final ServiceEtudiant serviceEtudiant;
    public ServiceHoraire(ServiceEtudiant serviceEtudiant) {
        this.serviceEtudiant = serviceEtudiant;
    }
    @Transactional
    public List<Activite> recupererTousLesActivitesDunEtudiant(Etudiant etudiant) {
        return etudiant.getHoraire().getActivites();
    }

  @Transactional
    public List<Activite> recupererTousLesActivitesDuneListeDetudiants(List<Etudiant> etudiants) {
       final List<Activite> activitesDetousLesEtudiants = new ArrayList<>();

        for(Etudiant e : etudiants) {
            activitesDetousLesEtudiants.addAll(e.getHoraire().getActivites());
        }

        return activitesDetousLesEtudiants;
    }
}
