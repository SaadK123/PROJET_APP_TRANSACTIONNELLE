package projetweb.linkup.entities;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity()
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(

name="Etudiants",

uniqueConstraints = {
        @UniqueConstraint(name = "UK_EMAIL", columnNames = "courriel"),
        @UniqueConstraint(name = "UK_USERNAME",columnNames = "nomUtilisateur")
}


)

public class Etudiant  {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;


    @Column(name = "dernier_date_connecte")
    private LocalDate dernierDate;
    @Column(name = "courriel", nullable = false,unique = true)
    private String courriel;


    @Column(name = "nomUtilisateur",nullable = false,unique = true)
    private String nomUtilisateur;

    @Column(name = "nom",nullable = false)
    private String nom;

    @Column(name = "prenom",nullable = false)
    private String prenom;


    @JsonIgnore
    @Column(name="motDePasse",nullable = false)
    private String motDePasseHash;

    @Column(name= "ecole", nullable = false)
    private String ecole;


    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY,orphanRemoval = true)
    @JoinColumn(name = "horaire_id")
    private Horaire horaire = new Horaire();

    @JsonIgnore
    @PrePersist
    public void prePersist() {
        if (horaire == null) {
            horaire = new Horaire();
        }
    }
    @OneToMany(cascade = CascadeType.ALL,orphanRemoval = true)
    @JoinColumn(name  = "notification_id")
    private List<Notification> notifications = new ArrayList<>();


}

