import java.util.Comparator;
import java.util.Random;

public enum Potion  {

    POTION_BAVARDAGE_INCONTROLE(
            Couleur.ROUGE,
            4,
            "Potion de bavardage incontrôlé",
            "Impossible de s'arrêter de parler.",
            240
    ),

    ELIXIR_DE_CHANCE_MAL_PLACE(
            Couleur.JAUNE,
            17,
            "Élixir de chance mal placée",
            "Obtenir énormément de chance, mais jamais au bon moment.",
            1440
    ),

    POTION_DE_RALENTISSEMENT_SELECTIF(
            Couleur.VERTE,
            12,
            "Potion de ralentissement sélectif",
            "Ralentir tout sauf soi... ou l'inverse, au hasard.",
            15
    ),

    ELIXIR_DE_GRAVITE_CAPRICIEUSE(
            Couleur.BLEU,
            19,
            "Élixir de gravité capricieuse",
            "Flotter à 30 centimètres du sol, sauf quand on éternue ou tousse.",
            30
    ),

    ELIXIR_DE_SENS_EXAGERE(
            Couleur.MAUVE,
            5,
            "Élixir de sens exagéré",
            "Un sens au hasard devient surpuissant.",
            60
    );

    private final Couleur couleur;
    private final int prix;
    private final String nom;
    private final String description;
    private final float dureeEnMinutes;

    Potion(Couleur couleur, int prix, String nom, String description, float dureeEnMinutes) {
        this.couleur = couleur;
        this.prix = prix;
        this.nom = nom;
        this.description = description;
        this.dureeEnMinutes = dureeEnMinutes;
    }

    public Couleur getCouleur() {
        return couleur;
    }

    public int getPrix() {
        return prix;
    }

    public String getNom() {
        return nom;
    }

    public String getDescription() {
        return description;
    }

    public float getDureeEnMinutes() {
        return dureeEnMinutes;
    }

    private final static Random rnd = new Random();
    public static Potion genererPotion() {
        return Potion.values()[rnd.nextInt(Potion.values().length)];
    }


    public  String toString() {
        return couleur.getCodeCouleur() + getDescription() + (char)'-'
                +  getPrix() + "$" + '-' + getDureeEnMinutes() + Couleur.RESET ;
    }

}
