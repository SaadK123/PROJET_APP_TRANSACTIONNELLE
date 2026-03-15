package projetweb.linkup.Enumerations;


import lombok.Getter;
import lombok.Setter;


@Getter
public enum NotificationType {
    NOUVELLE_GROUPE_INVITATION("Vous avez recu une invitation dans le groupe"),
    ALERTE_SYSTEME("Alerte systeme"); // todo regler le francais

          private final String message;
    NotificationType(String message) {
      this.message = message;
    }
}
