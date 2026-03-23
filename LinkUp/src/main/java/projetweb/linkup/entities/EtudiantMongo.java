package projetweb.linkup.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Document(collection = "etudiants")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class EtudiantMongo {
    @Id
    private String id;

    private LocalDate dernierDate;

    private String courriel;

    private String nomUtilisateur;

    private String nom;

    private String prenom;

    @JsonIgnore
    private String motDePasseHash;

    private String ecole;

    private Horaire horaire = new Horaire();

    private List<Notification> notifications = new ArrayList<>();
}
