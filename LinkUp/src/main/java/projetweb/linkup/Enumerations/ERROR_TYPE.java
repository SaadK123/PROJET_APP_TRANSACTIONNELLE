package projetweb.linkup.Enumerations;

public enum ERROR_TYPE {
DUPLICATION(409),
NON_EXISTANT(404),
CONTRAINTE_UNIQUE(409),
CHAMPS_MANQUANTS(400),
ERREUR_INTERNE(500),
ERREUR_METIER_LOGIQUE(409);


public final int http_code;
ERROR_TYPE(int http_code) {
  this.http_code = http_code;
}


}
