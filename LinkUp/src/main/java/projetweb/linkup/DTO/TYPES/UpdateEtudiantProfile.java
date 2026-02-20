package projetweb.linkup.DTO.TYPES;

import jakarta.persistence.Column;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;
@Getter

public class UpdateEtudiantProfile extends UpdateEtudiantDTO {

    private String username;


    private String lastname;

    private String firstname;

    private String password;
    public UpdateEtudiantProfile(UUID etudiantID,String username,String lastname,String password) {
        super(etudiantID);
        this.username = username;
        this.lastname = lastname;
        this.password = password;
    }
}
