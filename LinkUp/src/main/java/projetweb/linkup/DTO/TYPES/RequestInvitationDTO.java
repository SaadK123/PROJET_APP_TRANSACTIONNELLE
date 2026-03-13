package projetweb.linkup.DTO.TYPES;

import projetweb.linkup.Enumerations.NotificationType;

public class RequestInvitationDTO extends RequestNotificationDTO{

    public RequestInvitationDTO(String idEtudiant, String message, NotificationType type) {
        super(idEtudiant, message, type);
    }
}
