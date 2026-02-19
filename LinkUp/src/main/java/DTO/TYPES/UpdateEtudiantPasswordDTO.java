package DTO.TYPES;

import lombok.Getter;

import java.util.UUID;
@Getter
public class UpdateEtudiantPasswordDTO extends UpdateEtudiantDTO {
    private final String oldPassword;
    private final String newPassword;

    public UpdateEtudiantPasswordDTO(
            UUID etudiantID
            ,String oldPassword
            ,String newPassword)
    {
        super(etudiantID);

        this.oldPassword = oldPassword;
        this.newPassword = newPassword;
    }



}
