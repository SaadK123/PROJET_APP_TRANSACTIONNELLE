package projetweb.linkup.Services;

import projetweb.linkup.entities.Activite;
import projetweb.linkup.entities.Etudiant;

import java.util.ArrayList;
import java.util.List;

public class ServiceHoraire {

    private final ServiceEtudiant serviceEtudiant;
    public ServiceHoraire(ServiceEtudiant serviceEtudiant) {
        this.serviceEtudiant = serviceEtudiant;
    }
    public List<Activite> recupererTousLesActivitesDunEtudiant(Etudiant etudiant) {
        return etudiant.getHoraire().getActivites();
    }

    public List<Activite> recupererTousLesActivitesDesEtudiants(List<Etudiant> etudiants) {
       final List<Activite> activitesDetousLesEtudiants = new ArrayList<>();

        for(Etudiant e : etudiants) {
            for(Activite activite : e.getHoraire().getActivites())
                activitesDetousLesEtudiants.add(activite);

        }

        return activitesDetousLesEtudiants;
    }
}
