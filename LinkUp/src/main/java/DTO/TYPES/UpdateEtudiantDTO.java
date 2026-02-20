package DTO.TYPES;

import lombok.Getter;
import projetweb.linkup.Services.ServiceEtudiant;

import java.util.UUID;
@Getter
public abstract class UpdateEtudiantDTO {

   private final UUID etudiantID;


   public UpdateEtudiantDTO(UUID etudiantID) {
      if(etudiantID == null) {
         //todo throw
      }
      this.etudiantID = etudiantID;
   }

   public void EstConforme(ServiceEtudiant etudiant) {
      
   }
}
