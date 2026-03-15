package projetweb.linkup.DTO.ACTIONS;

import projetweb.linkup.entities.Activite;


/**
 * ici destination peut etre un etudiant comme sa peut etre un groupe
 * @param activite
 */
public record AjouterActiviteDTOEtudiant(Activite activite, String etudiantId) {

}
