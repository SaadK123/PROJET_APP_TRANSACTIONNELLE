package Exceptions;


import lombok.Getter;
import lombok.Setter;
import projetweb.linkup.Enumerations.ERROR_TYPE;


@Getter
@Setter
public  class LinkUpException extends RuntimeException {

    private final ERROR_TYPE error;
    private final String message;
    public LinkUpException(ERROR_TYPE error,String message) {
        this.error = error;
        this.message = message;
    }

    public void throwIt() {
        throw this;
    }

}
