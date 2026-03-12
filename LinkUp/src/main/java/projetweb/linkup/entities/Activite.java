package projetweb.linkup.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.UUID;

@Entity
@Table(name = "activite")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public   class Activite {


    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    @Column(name = "estRepete",nullable = false)
    private boolean estRepete = false;

    @Column(nullable = false)
    private String description;


    @Column(nullable = false)
    private LocalDateTime dateDeDebut;

    @Column(nullable = false)
    private LocalDateTime dateDeFin;

    @Column(nullable = false)
    private String titre;

   @Column(name = "est_activite_groupe",nullable = false)
    private boolean estActiviteGroupe;

   @OneToOne
   @JoinColumn(name = "etudiant_id",nullable = false)
   private Etudiant etudiant;


}