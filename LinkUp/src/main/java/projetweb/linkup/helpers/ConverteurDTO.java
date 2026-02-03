package projetweb.linkup.helpers;

import projetweb.linkup.Annotations.Singleton;

@Singleton
public class ConverteurDTO {
    private static ConverteurDTO converteur = null;
    private ConverteurDTO() {}
    public static ConverteurDTO getInstance() {
        if(converteur == null) {
            converteur = new ConverteurDTO();
        }
        return converteur;
    }

    public final
}
