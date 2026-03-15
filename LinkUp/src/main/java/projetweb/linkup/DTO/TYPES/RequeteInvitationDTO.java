package projetweb.linkup.DTO.TYPES;

import lombok.Getter;
import projetweb.linkup.Enumerations.NotificationType;
@Getter
public class RequeteInvitationDTO extends RequeteNotificationDTO {
    private final String groupId;
    private final String envoyeurId;
    public RequeteInvitationDTO(String etudiantNomUtilisateur, String message,
                                NotificationType type,
                                String groupId, String titre, String envoyeurId) {
        super(etudiantNomUtilisateur, message, type,titre);
        this.groupId = groupId;
        this.envoyeurId = envoyeurId;
    }
}
