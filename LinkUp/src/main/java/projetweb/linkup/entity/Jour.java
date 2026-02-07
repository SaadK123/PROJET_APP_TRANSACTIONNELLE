package projetweb.linkup.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import projetweb.linkup.entity.Activite;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "jour")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Jour {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Activite> activitesDuJour = new ArrayList<>();


}