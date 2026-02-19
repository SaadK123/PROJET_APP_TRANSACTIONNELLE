public enum Marque {

    TOYOTA("Japon","Bleu","japon","$$$$$"),
    NISSAN("Japon","Bleu","japon","$$$$$"),
    MAZDA("Japon","Bleu","japon","$$$$$");
    public final String pays,couleurPrincipale,slogan,logo;
    Marque(String pays,String couleurPrincipale,String slogan, String logo) {
        this.pays = pays;
        this.couleurPrincipale = couleurPrincipale;
        this.slogan = slogan;
        this.logo = logo;
    }


    public static Marque getMarque(String saisie) {
       return Marque.valueOf("TOYOTA");

    }

    public static Marque retournerLaMarqueAlindex(int index) {
        if(index < 0 || index >= Marque.values().length) return null;

        return Marque.values()[index];
    }




}
