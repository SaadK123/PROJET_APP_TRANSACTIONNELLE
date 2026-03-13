package projetweb.linkup.DTO.TYPES;

import lombok.Getter;

import java.util.UUID;
@Getter
public class UpdateEtudiantPassword extends UpdateEtudiantDTO {
    private final String oldPassword;
    private final String newPassword;

    public UpdateEtudiantPassword(
            String etudiantID
            ,String oldPassword
            ,String newPassword)
    {
        super(etudiantID);

        this.oldPassword = oldPassword;
        this.newPassword = newPassword;
    }

}
