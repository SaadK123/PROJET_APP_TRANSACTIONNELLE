public enum Action {
TRIER_PRIX("P"),
TRIER_DUREE("D"),
QUITTER("Q");


final String commande;
Action(String commande) {
    this.commande = commande;
}

public static Action trouverAction(String action) {
    for (var e : Action.values()) {
        if (action.equalsIgnoreCase(e.commande)) return e;
    }
    return null;
}
}
