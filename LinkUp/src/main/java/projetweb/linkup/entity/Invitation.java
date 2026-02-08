package projetweb.linkup.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.LocalDateTimeField;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import projetweb.linkup.Enumerations.NotificationType;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "invitations")
public class Invitation extends Notification {
    private String groupName;
    private String inviteperson;
    public Invitation(String groupName,String inviteperson, NotificationType type) {
        super(type.getMessage(),type);
    }




}
