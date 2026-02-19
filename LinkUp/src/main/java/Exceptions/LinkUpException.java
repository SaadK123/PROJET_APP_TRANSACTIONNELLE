package Exceptions;


import lombok.Getter;
import lombok.Setter;
import projetweb.linkup.Enumerations.ERROR_TYPE;
import projetweb.linkup.Enumerations.ERROR_TYPES;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public abstract class LinkUpException extends RuntimeException {
    private final String http_code;
    private final ERROR_TYPE error;
    private final String message;
    public LinkUpException(String http_code,ERROR_TYPE error,String message) {
        this.error = error;
        this.http_code = http_code;
        this.message = message;
    }
    
    public void throwIt() {
        throw this;
    }

}
