package projetweb.linkup.DTO.TYPES;

import lombok.Getter;
import projetweb.linkup.Enumerations.NotificationType;
@Getter
public class RequestInvitationDTO extends RequestNotificationDTO{
    private final String groupId;
    private final String envoyeurId;
    public RequestInvitationDTO(String etudiantUsername, String message, NotificationType type,
                                String groupId, String titre,String envoyeurId) {
        super(etudiantUsername, message, type,titre);
        this.groupId = groupId;
        this.envoyeurId = envoyeurId;
    }
}
