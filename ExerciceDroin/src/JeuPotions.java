import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

public class JeuPotions {
    private List<Potion> potions;


    public JeuPotions(int nombre) {
      potions = demarrerJeu(nombre);
    }

    private static List<Potion>  demarrerJeu(int nombre) {
        List<Potion> potions = new ArrayList<>();
        for(int i = 0; i < nombre; ++i) {
            potions.add(Potion.genererPotion());
        }
        return potions;
    }

    public void faireAction(Action e) {


        switch (e) {
            case TRIER_DUREE: {
                potions.sort(Comparator.comparing(Potion::getDureeEnMinutes));
                break;
            }
            case TRIER_PRIX: {
                potions.sort(Comparator.comparing(Potion::getPrix));
                break;
            }

            case null, default: {
              throw new IllegalArgumentException();
            }
        }
    }

    public void afficher() {
        for(Potion p : potions) {
            System.out.println(p.toString());
        }
    }
}
