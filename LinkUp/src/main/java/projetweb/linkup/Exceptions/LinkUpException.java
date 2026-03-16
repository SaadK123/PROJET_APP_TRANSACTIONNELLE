package projetweb.linkup.Exceptions;


import lombok.Getter;
import lombok.Setter;
import projetweb.linkup.Enumerations.ERREUR_TYPE;


@Getter
@Setter
public  class LinkUpException extends RuntimeException {

    @Getter
    private final ERREUR_TYPE erreur;
    private final String message;
    public LinkUpException(ERREUR_TYPE erreur, String message) {
        this.erreur = erreur;
        this.message = message;
    }



}
