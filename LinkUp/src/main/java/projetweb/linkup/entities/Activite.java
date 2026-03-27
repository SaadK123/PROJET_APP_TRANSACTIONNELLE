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
    private LocalDateTime tempsDebut;

    @Column(nullable = false)
    private LocalDateTime tempsFin;

    @Column(nullable = false)
    private String titre;

   public Activite(String description,LocalDateTime tempsDebut,
                   LocalDateTime tempsFin,String titre) {
    this.description = description;
    this.titre = titre;
    this.tempsDebut = tempsDebut;
    this.tempsFin = tempsFin;

   }
   }

