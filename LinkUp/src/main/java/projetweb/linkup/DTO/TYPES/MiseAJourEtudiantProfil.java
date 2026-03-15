package projetweb.linkup.DTO.TYPES;

import lombok.Getter;

@Getter

public class MiseAJourEtudiantProfil extends MiseAJourEtudiantDTO {

    private final  String nomUtilisateur;


    private final String nom;

    private final String prenom;

    private final String ecole;
    public MiseAJourEtudiantProfil(String etudiantID, String nomUtilisateur, String nom,
                                   String ecole, String prenom) {
        super(etudiantID);
        this.nomUtilisateur = nomUtilisateur;
        this.nom = nom;
        this.prenom = prenom;
        this.ecole = ecole;
    }
}
