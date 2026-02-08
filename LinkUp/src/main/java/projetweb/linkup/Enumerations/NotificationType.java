package projetweb.linkup.Enumerations;


import lombok.Getter;
import lombok.Setter;


@Getter
public enum NotificationType {
    NEW_GROUP_INVITATION("Vous avez recu une invitation dans le groupe"),
    SYSTEM_ALERT("Alerte systeme"); // todo regler le francais

          private final String message;
    NotificationType(String message) {
      this.message = message;
    }
}
