package projetweb.linkup.DTO.ACTIONS;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record CreationEtudiantDTO(@NotBlank String prenom,
                                  @NotBlank String nom,
                                  @NotBlank String nomUtilisateur,
                                  @NotBlank String ecole,
                                  @NotBlank String motDePasse,
                                  @NotBlank @Email String courriel) {

}
