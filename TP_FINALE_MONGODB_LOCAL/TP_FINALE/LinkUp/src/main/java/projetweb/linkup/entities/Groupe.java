package projetweb.linkup.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIncludeProperties;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.OnDelete;

import java.util.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "Groupes")
public class Groupe {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)

    private UUID id;
    /**
     * les inclusions de propriete permettent de limiter la portee
     * des choses envoyer vers le front end
     */
    @JsonIncludeProperties({"id", "nom", "prenom", "nomUtilisateur", "courriel", "ecole"})
    @ManyToOne
    @JoinColumn(name = "chef_id", nullable = false)
    private Etudiant chef;

    @Column(name = "nom_du_groupe",nullable = false)
    private String nomGroupe;


    @JsonIncludeProperties({"id", "nom", "prenom", "nomUtilisateur", "courriel", "ecole"})
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "groupe_etudiants",
            joinColumns = @JoinColumn(name = "groupe_id"),
            inverseJoinColumns = @JoinColumn(name = "etudiant_id")
    )
    // id etudiant ; etudiant
    private Set<Etudiant> etudiants = new HashSet<>();



    @JsonIgnore
    public List<Etudiant> getEtudiantsList() {
        return new ArrayList<>(etudiants);
    }


    @JsonIncludeProperties({"id", "activites"})
    @OneToOne(fetch = FetchType.EAGER,cascade = CascadeType.ALL)
    @JoinColumn(name = "horaire_id",unique = true)
    private Horaire horaire;
    public Groupe(Etudiant chef, String nomGroupe) {
        setChef(chef);
        etudiants.add(chef);
        setNomGroupe(nomGroupe);
        this.horaire = new Horaire();
    }



}
