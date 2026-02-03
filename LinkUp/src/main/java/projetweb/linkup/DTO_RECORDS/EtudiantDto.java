package projetweb.linkup.DTO_RECORDS;

import jakarta.persistence.Column;
import jakarta.persistence.OneToOne;
import projetweb.linkup.entity.Horaire;

public class EtudiantDto implements Dto{
    public final String id;
    public final  String email;



    public final String username;

    public final String lastname;


    public final String firstName;


    public final String password;


    public EtudiantDto(String id,String email,String username,String lastname,String firstname,String password) {
        this.id = id;
        this.username = username;
        this.lastname =lastname;
        this.firstName = firstname;
        this.password = password;
        this.email = email;
    }

}
