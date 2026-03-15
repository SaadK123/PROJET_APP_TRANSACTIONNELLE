package projetweb.linkup.entities;

import jakarta.persistence.*;
import lombok.*;

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


    @ManyToOne
    @JoinColumn(name = "chef_id", nullable = false)
    private Etudiant chef;
    
    @Column(name = "nom_du_groupe",nullable = false)
    private String nomGroupe;


    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "groupe_etudiants",
            joinColumns = @JoinColumn(name = "groupe_id"),
            inverseJoinColumns = @JoinColumn(name = "etudiant_id")
    )
    // id etudiant ; etudiant
    private Set<Etudiant> etudiants = new HashSet<>(); // pour trie auto



    public List<Etudiant> getEtudiantsList() {
        return new ArrayList<>(etudiants);
    }

    @OneToOne(fetch = FetchType.LAZY,cascade = CascadeType.ALL)
    @JoinColumn(name = "horaire_id",unique = true)
    Horaire horaire;
    public Groupe(Etudiant chef, String nomGroupe) {
        setChef(chef);
        etudiants.add(chef);
        setNomGroupe(nomGroupe);
        this.horaire = new Horaire();
    }



}
