package projetweb.linkup;

import projetweb.linkup.DTO.ACTIONS.HandlerErreurDTO;
import projetweb.linkup.Exceptions.LinkUpException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import projetweb.linkup.Enumerations.ERROR_TYPE;

import java.time.LocalDateTime;

@RestControllerAdvice
public class RestHandler {

    @ExceptionHandler(LinkUpException.class)
    public ResponseEntity<HandlerErreurDTO> handleLinkUp(LinkUpException ex) {
        HandlerErreurDTO body = new HandlerErreurDTO(
                ex.getMessage(),
                LocalDateTime.now()
        );

        return ResponseEntity
                .status(ex.getError().http_code)
                .body(body);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<HandlerErreurDTO> handleOther(Exception ex) {
        HandlerErreurDTO body = new HandlerErreurDTO(

                "server error",
                LocalDateTime.now()
        );
        return ResponseEntity.status(ERROR_TYPE.DEFAULT.http_code).body(body);
    }
}
