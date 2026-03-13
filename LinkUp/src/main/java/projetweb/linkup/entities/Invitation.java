package projetweb.linkup.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.List;
import projetweb.linkup.Enumerations.NotificationType;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Invitation extends Notification {
    @ManyToOne (fetch = FetchType.LAZY)
    @JoinColumn(name = "group_id", nullable = false)
    private Group group;

    @ManyToOne
    @JoinColumn(name = "envoyeur_id")
    private  Etudiant envoyeur;



    public Invitation(Group group, Etudiant  envoyeur, NotificationType type) {
        super(type.getMessage(),type);
        this.group = group;
        this.envoyeur = envoyeur;
    }

}
