package projetweb.linkup.DTO.ACTIONS;

import projetweb.linkup.Enumerations.ERREUR_TYPE;
import projetweb.linkup.Exceptions.LinkUpException;
import projetweb.linkup.entities.Etudiant;

import java.util.UUID;

public record VirerEtudiantDTO(String nomUtilisateur, String etudiantQuiVireId, String groupid) {
    
}
