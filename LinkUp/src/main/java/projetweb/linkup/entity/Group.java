package projetweb.linkup.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Map;
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

    @MapKey(name = "id")
    @ManyToMany
    // id etudiant ; etudiant
    private Map<UUID,Etudiant> etudiants;




    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Horaire horaireCommun;

}
