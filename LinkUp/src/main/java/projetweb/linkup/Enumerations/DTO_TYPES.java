package projetweb.linkup.Enumerations;

import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.LinkedHashSet;

public enum DTO_TYPES {
    ETUDIANT(),
    ACTIVITE(),
    GROUP(),
    JOUR(),
    HORAIRE();


    private LinkedHashSet<String> informations;

    DTO_TYPES(LinkedHashSet<String> informations) {
        this.informations = informations;
    }
}
