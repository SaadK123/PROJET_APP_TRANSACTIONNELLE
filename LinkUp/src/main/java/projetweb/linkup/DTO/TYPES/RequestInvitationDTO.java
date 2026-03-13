package projetweb.linkup.DTO.TYPES;

import lombok.Getter;
import projetweb.linkup.Enumerations.NotificationType;
@Getter
public class RequestInvitationDTO extends RequestNotificationDTO{
    private String groupId;
    private String envoyeur;
    public RequestInvitationDTO(String idEtudiant, String message, NotificationType type,
                                String groupId,String envoyeur) {
        super(idEtudiant, message, type);
        this.groupId = groupId;
        this.envoyeur = envoyeur;
    }
}
