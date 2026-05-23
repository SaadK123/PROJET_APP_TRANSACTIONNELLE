package projetweb.linkup.DTO.TYPES;

import lombok.AllArgsConstructor;
import lombok.Getter;
import projetweb.linkup.Enumerations.NotificationType;

@AllArgsConstructor
@Getter
public class RetourNotificationDTO {
    private final String id;
    private final String etudiantNomUtilisateur;
    private final String message;
    private final NotificationType type;
    private final String titre;

}
