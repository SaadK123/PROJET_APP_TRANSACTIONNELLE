package projetweb.linkup.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import projetweb.linkup.Interfaces.ParserJson;

import java.util.*;

@Entity()
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name="Etudiants")
public class Etudiant  implements ParserJson {

    private final  static Set<String> contenu = new HashSet<>(){{
        add("id");
        add("email");
        add("username");
        add("lastname");
        add("firstname");
        add("password");
    }};

    public static Set<String> getContenu() {
        return Collections.unmodifiableSet(contenu);
    }


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


    @Override
    public String toJson() {
    return null; // todo
    }

}

