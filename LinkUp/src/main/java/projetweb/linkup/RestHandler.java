package projetweb.linkup;

import projetweb.linkup.DTO.ACTIONS.GestionErreurDTO;
import projetweb.linkup.Exceptions.LinkUpException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import projetweb.linkup.Enumerations.ERREUR_TYPE;

import java.time.LocalDateTime;

@RestControllerAdvice
public class RestHandler {

    @ExceptionHandler(LinkUpException.class)
    public ResponseEntity<GestionErreurDTO> handleLinkUp(LinkUpException ex) {
        GestionErreurDTO body = new GestionErreurDTO(
                ex.getMessage(),
                LocalDateTime.now()
        );

        return ResponseEntity
                .status(ex.getErreur().http_code)
                .body(body);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<GestionErreurDTO> handleOther(Exception ex) {
        GestionErreurDTO body = new GestionErreurDTO(

                "server error",
                LocalDateTime.now()
        );
        return ResponseEntity.status(ERREUR_TYPE.ERREUR_INTERNE.http_code).body(body);
    }
}
