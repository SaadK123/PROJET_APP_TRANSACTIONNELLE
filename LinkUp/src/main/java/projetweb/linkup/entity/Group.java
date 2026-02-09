package projetweb.linkup.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.UUID;

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

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "group_etudiants",
            joinColumns = @JoinColumn(name = "group_id"),
            inverseJoinColumns = @JoinColumn(name = "etudiant_id")
    )
    // id etudiant ; etudiant
    private Set<Etudiant> etudiants;




    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "horaire_id", nullable = false)
    private Horaire horaireCommun;

}
