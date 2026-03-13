package projetweb.linkup.DTO.TYPES;

import jakarta.persistence.Column;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;
@Getter

public class UpdateEtudiantProfile extends UpdateEtudiantDTO {

    private final  String username;


    private final String lastname;

    private final String firstname;

    private final String ecole;
    public UpdateEtudiantProfile(String etudiantID,String username,String lastname,String ecole,String firstname) {
        super(etudiantID);
        this.username = username;
        this.lastname = lastname;
        this.firstname = firstname;
        this.ecole = ecole;
    }
}
