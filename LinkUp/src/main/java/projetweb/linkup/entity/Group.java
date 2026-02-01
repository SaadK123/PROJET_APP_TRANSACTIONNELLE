package projetweb.linkup.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Map;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "Groups")
public class Group {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)

    private String id;

    @MapKey(name = "id")
    @OneToMany
    // id etudiant ; etudiant
    private Map<String,Etudiant> etudiants;


    @OneToOne(cascade = CascadeType.ALL)
    private Horaire horaireCommun = new Horaire();

}
