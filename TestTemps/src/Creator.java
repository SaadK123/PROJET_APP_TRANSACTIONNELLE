import java.util.ArrayList;
import java.util.List;

public abstract class Creator {
    public static Hero parseToHero(String hero) {
        return new Hero(hero);
    }
    public static List<Hero> parseToHeros(List<String> heros_string) {


        List<Hero> heroes = new ArrayList<>();
      for(int i = heros_string.size()-1; i >= 0; --i) {
          String index_current_hero = heros_string.get(i);
          for(int e = i-1; e >= 0; --e) {
              String current_hero = heros_string.get(e);
              if(current_hero.equals(index_current_hero)) {
                  heros_string.remove(e);
              }
          }
          heroes.add(new Hero(index_current_hero));
      }
      return heroes;
    }
}
