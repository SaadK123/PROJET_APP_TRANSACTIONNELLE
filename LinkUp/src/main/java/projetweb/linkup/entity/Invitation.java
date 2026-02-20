package projetweb.linkup.entity;

import DTO.ACTIONS.Invitation_Reponse;
import jakarta.persistence.*;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.LocalDateTimeField;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.apache.logging.log4j.util.Lazy;
import projetweb.linkup.Enumerations.NotificationType;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Invitation extends Notification {
    @ManyToOne (fetch = FetchType.LAZY)
    @JoinColumn(name = "group_id", nullable = false)
    private Group group;
    private String envoyeur;
    private String receveur;
    public Invitation(Group group,String envoyeur, String receveur, NotificationType type) {
        super(type.getMessage(),type);
        this.group = group;
        this.envoyeur = envoyeur;
        this.receveur = receveur;
    }



}
