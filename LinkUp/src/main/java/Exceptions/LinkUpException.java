package Exceptions;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LinkUpException extends RuntimeException {
    private String code,message,http_code;
    public LinkUpException(String message,String code,String http_code) {
        super(message);
    }

}
