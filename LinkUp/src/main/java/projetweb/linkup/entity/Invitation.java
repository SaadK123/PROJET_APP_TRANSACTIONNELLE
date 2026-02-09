package projetweb.linkup.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
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
    @OneToOne (fetch = FetchType.LAZY)
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
