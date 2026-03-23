package projetweb.linkup.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import projetweb.linkup.Enumerations.NotificationType;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class NotificationMongo {

    private String id;

    private String message;

    private NotificationType type;

    private LocalDateTime tempsCreation;

    private String titre;

    private boolean estVu;

    public NotificationMongo(String message, String titre, NotificationType type) {
        this.type = type;
        this.message = message;
        this.tempsCreation = LocalDateTime.now();
        this.titre = titre;
        this.estVu = false;
    }
}
