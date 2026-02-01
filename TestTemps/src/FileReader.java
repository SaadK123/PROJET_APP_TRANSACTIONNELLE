import java.io.Closeable;
import java.io.FileInputStream;
import java.util.Scanner;

public class FileReader {


    public static String read(String file) {
        FileInputStream fl = open(file);
        StringBuilder lines = null;
        if(fl != null) {
            Scanner input = new Scanner(fl);
           lines = new StringBuilder();
            while (input.hasNextLine()) {
                lines.append(input.nextLine()).append("\n");
            }
            closeFile(fl);
            input.close();
        }
        if(lines == null) return null;

        return lines.toString();
    }

    public static String[] ArrayReading(String file) {
        FileInputStream fl = open(file);

        if(fl != null) {
            StringBuilder lines = new StringBuilder();
            Scanner input = new Scanner(fl);

            while (input.hasNextLine()) {
                lines.append(input.nextLine()).append("\n");
            }

            input.close();
            closeFile(fl);
            return lines.toString().split("\n");
        }
        return null;
    }

    private static FileInputStream open(String file) {
        FileInputStream fl = null;
        try {
            fl = new FileInputStream(file);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        return fl;
    }
    private static void closeFile(Closeable closeable) {
        try {
            closeable.close();
        }catch (Exception e) {
           // nothing
        }
    }
}
