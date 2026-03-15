package projetweb.linkup.entities;

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
    @ManyToOne (fetch = FetchType.LAZY)
    @JoinColumn(name = "groupe_id", nullable = false)
    private Groupe groupe;

    @ManyToOne
    @JoinColumn(name = "envoyeur_id")
    private  Etudiant envoyeur;



    public Invitation(Groupe groupe, Etudiant  envoyeur, NotificationType type, String titre, String message) {
        super(message, titre, type);
        this.groupe = groupe;
        this.envoyeur = envoyeur;
    }

}
