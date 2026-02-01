import java.util.Scanner;

public abstract class ReadInput {
    static Scanner input = new Scanner(System.in);

    static String readString() {
        return input.nextLine();
    }

    static Integer readInteger() {
        return Integer.parseInt(input.nextLine());
    }


}
