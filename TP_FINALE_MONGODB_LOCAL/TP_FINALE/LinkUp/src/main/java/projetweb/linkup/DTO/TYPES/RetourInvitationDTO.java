package projetweb.linkup.DTO.TYPES;

import lombok.Getter;
import projetweb.linkup.Enumerations.NotificationType;
import projetweb.linkup.Enumerations.TypeInvitation;

@Getter
public class RetourInvitationDTO extends RetourNotificationDTO {
    private final String destination; // a changer
    private final String envoyeurId;
    private TypeInvitation typeInvitation;
    public RetourInvitationDTO(String id,String etudiantNomUtilisateur, String message, NotificationType type,
                               String destination, String titre, String envoyeurId,TypeInvitation typeInvitation) {

        super(id,etudiantNomUtilisateur, message, type,titre);
        this.destination = destination;
        this.envoyeurId = envoyeurId;
        this.typeInvitation = typeInvitation;
    }
}
