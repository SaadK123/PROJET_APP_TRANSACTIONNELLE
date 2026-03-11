package projetweb.linkup.entities;

import jakarta.persistence.*;
import lombok.*;

import java.util.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "Groups")
public class Group {
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
            name = "group_etudiants",
            joinColumns = @JoinColumn(name = "group_id"),
            inverseJoinColumns = @JoinColumn(name = "etudiant_id")
    )
    // id etudiant ; etudiant
    private Set<Etudiant> etudiants = new HashSet<>(); // pour trie auto


    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "horaire_id",unique = true)
    Horaire horaire;
    public Group(Etudiant chef,String nomGroupe) {
        setChef(chef);
        etudiants.add(chef);
        setNomGroupe(nomGroupe);
    }



}
