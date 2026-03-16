package projetweb.linkup.DTO.TYPES;

import lombok.Getter;

@Getter
public class MiseAJourEtudiantMotDePasse extends MiseAJourEtudiantDTO {
    private final String vieuxMotDePasse;
    private final String nouveauMotDePasse;

    public MiseAJourEtudiantMotDePasse(
            String etudiantID
            ,String vieuxMotDePasse
            ,String nouveauMotDePasse)
    {
        super(etudiantID);

        this.vieuxMotDePasse= vieuxMotDePasse;
        this.nouveauMotDePasse = nouveauMotDePasse;
    }

}
