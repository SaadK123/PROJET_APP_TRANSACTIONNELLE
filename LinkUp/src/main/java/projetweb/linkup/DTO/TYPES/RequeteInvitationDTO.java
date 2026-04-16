package projetweb.linkup.DTO.TYPES;

import lombok.Getter;
import projetweb.linkup.Enumerations.NotificationType;
@Getter
public class RequeteInvitationDTO extends RequeteNotificationDTO {
    private final String destination; // a changer
    private final String envoyeurId;
    public RequeteInvitationDTO(String etudiantNomUtilisateur, String message, NotificationType type,
                                String groupId, String titre, String envoyeurId) {

        super(etudiantNomUtilisateur, message, type,titre);
        this.destination = groupId;
        this.envoyeurId = envoyeurId;
    }
}
