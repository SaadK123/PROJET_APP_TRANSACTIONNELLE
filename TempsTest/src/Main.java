import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        String Temps = "18:30-20:30";
        if(Est)
    }


    static class Temps {
        private  int debutHeure;
        private  int finHeure;


        public static List<Temps> Alltemps = new ArrayList<>();

        public Temps(int debut,int fin) {

            debutHeure = debut;
            finHeure = fin;


            Alltemps.add(this);
        }

        private Temps(String[] tab) {


            Alltemps.add(this);
        }
        private Temps(Duo<Integer,Integer> duo) {

        }
        private static Temps TryCreateTemps(String temps) {
            if(temps == null ||temps.isBlank()) return null;
            String[] tab = temps.split("-");
            if(tab.length <= 1) return null;
           Duo<Integer,Integer> duo = new Duo<>();
            for(String s : tab) {
                duo.addByNext(stringEnHeure(s));
            }


           // at that point the format is correct now we need to verify if someoen else overlap time
            for(Temps temp : Alltemps) {
                if(duo.first < temp.finHeure && duo.second > temp.debutHeure) {

                }
            }
        }

        public String getH(String deb) {
           if(deb.equalsIgnoreCase("debut")) {
               return debutHeure;
           } else if(deb.equalsIgnoreCase("fin")) {
               return finHeure;
           }
           return null;
        }
    }


    private static Integer stringEnHeure(String heure) {
      StringBuilder str = new StringBuilder(heure);
       str.deleteCharAt(2);


       try {
          Integer heureEnInt = Integer.parseInt(str.toString());
          if(heureEnInt >= 2100 || heureEnInt < 730) {
              return null;
          }
          return heureEnInt;
       }catch (Exception e) {
           return null;
       }


    }

    static class Duo<A,B> {

        public A first;
        public B second;

        public boolean AreObjectEquals() {
            return first.getClass() == second.getClass();
        }
        public Duo(A first,B second) {
            addFirst(first);
            addSecond(second);
        }

        public Duo() {

        }

        @NullProtected
        public void addFirst(A first) {
            if(first == null) return;
            this.first = first;
        }

        public void addByNext(A obj) {
            if(!AreObjectEquals()) return;
            if(first == null) {
                addFirst(obj);

            }else if(second == null) {
                addSecond((B) obj);
            }

        }
        @NullProtected
        public void addSecond(B second) {
            if(second == null) return;
            this.second = second;
        }

        public boolean  SameValue() {
            if(AreObjectEquals()) {
                return first.equals(second);
            }
            return false;
        }

        public boolean AreFull() {
            return first != null && second != null;
        }
    }

}