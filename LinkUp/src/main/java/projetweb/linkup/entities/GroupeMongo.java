package projetweb.linkup.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIncludeProperties;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Document(collection = "groupes")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class GroupeMongo {

    @Id
    private String id;

    @JsonIncludeProperties({"nomUtilisateur", "nom", "prenom", "courriel", "ecole", "id"})
    private Etudiant chef;

    private String nomGroupe;

    @JsonIncludeProperties({"nomUtilisateur", "nom", "prenom", "courriel", "ecole"})
    private Set<Etudiant> etudiants = new HashSet<>();

    @JsonIncludeProperties({"id", "activites"})
    private Horaire horaire;

    @JsonIgnore
    public List<Etudiant> getEtudiantsList() {
        return new ArrayList<>(etudiants);
    }

    public GroupeMongo(Etudiant chef, String nomGroupe) {
        this.chef = chef;
        this.nomGroupe = nomGroupe;
        this.etudiants.add(chef);
        this.horaire = new Horaire();
    }
}
