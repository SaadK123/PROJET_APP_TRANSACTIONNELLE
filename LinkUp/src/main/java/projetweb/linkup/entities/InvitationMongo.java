package projetweb.linkup.entities;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import projetweb.linkup.Enumerations.NotificationType;

@Getter
@Setter
@NoArgsConstructor
public class InvitationMongo extends NotificationMongo {
    private Groupe groupe;

    private Etudiant envoyeur;

    public InvitationMongo(Groupe groupe, Etudiant envoyeur, NotificationType type, String titre, String message) {
        super(message, titre, type);
        this.groupe = groupe;
        this.envoyeur = envoyeur;
    }
}
