import DTO.ACTIONS.HandlerErreurDTO;
import Exceptions.LinkUpException;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.ErrorResponse;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import projetweb.linkup.Enumerations.ERROR_TYPE;

import java.time.LocalDateTime;

@RestControllerAdvice
public class RestHandler {

    @ExceptionHandler(LinkUpException.class)
    public HandlerErreurDTO handleLinkUp(LinkUpException ex) {

        return new HandlerErreurDTO(ex.getError().http_code, ex.getMessage(), LocalDateTime.now());
    }


    @ExceptionHandler(Exception.class)
    public HandlerErreurDTO handleOther(Exception ex, HttpServletRequest req) {
        HandlerErreurDTO body = new HandlerErreurDTO(
                ERROR_TYPE.DEFAULT.http_code,
                "Unexpected server error",
                LocalDateTime.now()
        );
        return body;
    }

}
