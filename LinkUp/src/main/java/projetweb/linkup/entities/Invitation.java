package projetweb.linkup.entities;

import com.fasterxml.jackson.annotation.JsonIncludeProperties;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import projetweb.linkup.Enumerations.NotificationType;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Invitation extends Notification {
    @JsonIncludeProperties({"id", "nomGroupe", "chef"})
    @ManyToOne (fetch = FetchType.EAGER)
    @JoinColumn(name = "groupe_id", nullable = false)
    private Groupe groupe;

    @JsonIncludeProperties({"id", "nom", "prenom", "nomUtilisateur", "courriel", "ecole"})
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "envoyeur_id")
    private Etudiant envoyeur;



    public Invitation(Groupe groupe, Etudiant  envoyeur, NotificationType type, String titre, String message) {
        super(message, titre, type);
        this.groupe = groupe;
        this.envoyeur = envoyeur;
    }

}
