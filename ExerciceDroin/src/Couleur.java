import java.awt.Color;

public enum Couleur {

    ROUGE(Color.RED),
    JAUNE(Color.YELLOW),
    VERTE(Color.GREEN),
    BLEU(Color.BLUE),
    MAUVE(new Color(128, 0, 128));

    private final Color codeCouleur;

    Couleur(Color codeCouleur) {
        this.codeCouleur = codeCouleur;
    }

    public Color getCodeCouleur() {
        return codeCouleur;
    }
    public static final String RESET = "\u001B[0m";
}
