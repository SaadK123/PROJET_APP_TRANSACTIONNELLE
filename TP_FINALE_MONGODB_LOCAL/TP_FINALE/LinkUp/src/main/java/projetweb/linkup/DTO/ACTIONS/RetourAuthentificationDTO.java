package projetweb.linkup.DTO.ACTIONS;

public record RetourAuthentificationDTO(
        RetourEtudiantDTO etudiant,
        String token
) {
}