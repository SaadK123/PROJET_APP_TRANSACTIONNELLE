package projetweb.linkup.DTO.ACTIONS;

import projetweb.linkup.entities.Activite;


/**
 * dto pour ajouer une activite chez un etudiant
 * @param activite
 */
public record AjouterActiviteDTOEtudiant(Activite activite, String etudiantId) {

}
