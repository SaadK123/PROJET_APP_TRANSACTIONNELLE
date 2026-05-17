package projetweb.linkup.DTO.ACTIONS;
import projetweb.linkup.entities.Horaire;
public record RetourEtudiantDTO(String etudiantId, String nomUtilisateur, String prenom, String nom, String email, RetourHoraireDTO retourHoraireDTO) {

}
