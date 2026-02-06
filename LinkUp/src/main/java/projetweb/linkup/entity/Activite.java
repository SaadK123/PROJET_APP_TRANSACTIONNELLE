package projetweb.linkup.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import projetweb.linkup.entity.Jour;

import java.time.LocalTime;

@Entity
@Table(name = "activite")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Activite {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(nullable = false)
    private String description = "";

    @Column(nullable = false)
    private LocalTime dateDeDebut;

    @Column(nullable = false)
    private LocalTime dateDeFin;

    @Column(nullable = false)
    private String titre;


    // todo ajouter un timestamp
}