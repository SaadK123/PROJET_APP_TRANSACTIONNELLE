package projetweb.linkup.entity;


import jakarta.persistence.*;
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

    @Column(name = "email", nullable = false,unique = true)
    private String email;


    @Column(name = "username",nullable = false,unique = true)
    private String username;

    @Column(name = "lastname",nullable = false)
    private String lastname;

    @Column(name = "firstname",nullable = false)
    private String firstName;

    @Column(name="password",nullable = false)
    private String password;

    @OneToOne
    private Horaire horaire;

    @OneToMany(mappedBy = "", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Notification> notifications;
}

