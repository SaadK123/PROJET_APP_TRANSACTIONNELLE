package projetweb.linkup.DTO.ACTIONS;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import java.lang.annotation.Repeatable;

public record CreateStudentDTO(  @NotBlank String firstname,
                                 @NotBlank String lastname,
                                 @NotBlank String username,
                                 @NotBlank String ecole,
                                 @NotBlank String password,
                                 @NotBlank @Email String email) {

}
