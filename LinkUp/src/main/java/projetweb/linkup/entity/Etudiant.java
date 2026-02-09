package projetweb.linkup.entity;


import jakarta.persistence.*;

import java.time.LocalDate;
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
        @UniqueConstraint(name = "UK_EMAIL", columnNames = "email"),
        @UniqueConstraint(name = "UK_USERNAME",columnNames = "username")
}


)

public class Etudiant  {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;


    @Column(name = "lastdateconnected")
    private LocalDate lastdate;
    @Column(name = "email", nullable = false,unique = true)
    private String email;


    @Column(name = "username",nullable = false,unique = true)
    private String username;

    @Column(name = "lastname",nullable = false)
    private String lastname;

    @Column(name = "firstname",nullable = false)
    private String firstname;

    @Column(name="password",nullable = false)
    private String passwordhash;


    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Horaire horaire;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)

    private List<Notification> notifications;

}

