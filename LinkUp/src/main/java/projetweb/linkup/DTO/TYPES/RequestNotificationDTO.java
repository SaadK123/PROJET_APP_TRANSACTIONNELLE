package projetweb.linkup.DTO.TYPES;

import lombok.AllArgsConstructor;
import lombok.Getter;
import projetweb.linkup.Enumerations.NotificationType;
import projetweb.linkup.entities.Notification;
@AllArgsConstructor
@Getter
public class RequestNotificationDTO {
    private final String etudiantUsername;
    private final String message;
    private final NotificationType type;
    private final String titre;
}
