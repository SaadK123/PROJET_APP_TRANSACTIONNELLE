package projetweb.linkup.DTO.TYPES;

import lombok.AllArgsConstructor;
import lombok.Getter;
import projetweb.linkup.Enumerations.NotificationType;

@AllArgsConstructor
@Getter
public class RequeteNotificationDTO {
    private final String etudiantNomUtilisateur;
    private final String message;
    private final NotificationType type;
    private final String titre;
}
