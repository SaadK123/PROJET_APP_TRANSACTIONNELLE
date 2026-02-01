package projetweb.linkup.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.TreeMap;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "Jour")
public class Jour {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private  Long id;

    @MapKeyColumn(name = "periodes_du_jour",nullable = false)
    @OneToMany(cascade = CascadeType.ALL)
    @MapKey(name = "temps_debut")
    private TreeMap<Integer,Activite> periodes = new TreeMap<>();

}
