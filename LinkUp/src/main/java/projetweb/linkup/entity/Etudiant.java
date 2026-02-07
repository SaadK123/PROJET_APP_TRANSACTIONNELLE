package projetweb.linkup.entity;


import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity()
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name="Etudiants")
public class Etudiant  {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;


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

    @OneToOne
    private Horaire horaire;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Notification> notifications;
}

