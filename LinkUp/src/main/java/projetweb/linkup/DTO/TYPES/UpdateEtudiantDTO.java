package projetweb.linkup.DTO.TYPES;

import lombok.Getter;
import lombok.Setter;
import projetweb.linkup.Enumerations.ERROR_TYPE;
import projetweb.linkup.Services.ServiceEtudiant;

import java.util.UUID;
@Getter
@Setter
public abstract class UpdateEtudiantDTO {

   private final String etudiantID;


   public UpdateEtudiantDTO(String etudiantID) {
      this.etudiantID = etudiantID;
   }


}
