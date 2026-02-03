package projetweb.linkup.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;
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


    @OneToMany(
            mappedBy = "jour",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    @OrderBy(" ASC")
   private List<Activite> activitesDuJour = new ArrayList<>();

}
