package Exceptions;


import lombok.Getter;
import lombok.Setter;
import projetweb.linkup.Enumerations.ERROR_TYPES;

@Getter
@Setter
public class LinkUpException extends RuntimeException {
    private final String code,http_code;
    private final ERROR_TYPES error;
    public LinkUpException(String message,String code,String http_code,ERROR_TYPES error) {
        super(message);
        this.code = code;
        this.http_code = http_code;
        this.error = error;
    }

}
