package projetweb.linkup.Enumerations;

import java.util.HashMap;
import java.util.HashSet;

public enum EntityType {
    ETUDIANT("etudiant"),
    ACTIVITE("activite"),
    GROUP("group"),
    HORAIRE("horaire"),
    JOUR("jour");

    /**
     * Un etudiant peut avoir un horaire
     * un horaire peut avoir plusieurs jour
     * un jour peut avoir plusieurs activite
     * une activite comporte un temps et une description
     */

    EntityType(String type) {

        
    }
}
