package projetweb.linkup.DTO.TYPES;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public abstract class MiseAJourEtudiantDTO {

   private final String etudiantID;


   public MiseAJourEtudiantDTO(String etudiantID) {
      this.etudiantID = etudiantID;
   }


}
