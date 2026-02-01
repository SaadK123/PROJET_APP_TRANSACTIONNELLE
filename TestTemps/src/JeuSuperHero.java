import java.util.*;

public class JeuSuperHero {
    private static final Random rnd = new Random();
    private final List<Hero> heros_totales;
    private final List<Hero> heroes_in = new ArrayList<>();
    private final List<Hero> heroes_deja_venu = new ArrayList<>();
    private boolean fin = false;
    private JeuSuperHero(String filegame) {
    heros_totales = loadHeros(filegame);
    }

    private  List<Hero> loadHeros(String filegame) {
         String[] tab = FileReader.ArrayReading(filegame);
          if(tab == null) {
              throw new IllegalArgumentException();
          }
         return Creator.parseToHeros(Arrays.stream(tab).toList());
    }


    private void verifierTentative(Action action,Hero choisi) {
     switch (action) {
         case QUITTER -> {
             fin = true;

         }
         case REFUSER -> {
           if(!EstDedans(choisi)) {
               fin = true;
           }else {
               System.out.println("bien jouer");
           }
         }


         // accepter
         default -> {
          if(EstDedans(choisi)) {
              fin = true;
          }else {

          }
         }
     }
    }

    private boolean EstDedans(Hero choisi) {
        for(Hero curr : heroes_deja_venu) {
            if(curr.nom().equals(choisi.nom())) {
                return true;
            }
        }
        return false;
    }

    private Hero choisirUnHeroRandom() {
        return heros_totales.get(rnd.nextInt(0,heros_totales.size()));
    }
    public void Play() {
        Hero choisi = choisirUnHeroRandom();

        System.out.println("voici l'hero choisi :" + choisi.nom());

        Action e = Action.readAction();

        verifierTentative(e,choisi);
    }
    public static JeuSuperHero createGame(String filegame) {
        if(filegame == null || filegame.isBlank()) throw new IllegalArgumentException();

        return new JeuSuperHero(filegame);
    }
}
