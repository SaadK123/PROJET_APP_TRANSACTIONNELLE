package projetweb.linkup.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import projetweb.linkup.Enumerations.NotificationType;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Inheritance(strategy = InheritanceType.JOINED)

public  class Notification {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "message", nullable = false)
    private String message;

    @Column(name = "type", nullable = false)
    private NotificationType type;

    @Column(name = "temps_creation", nullable = false)
    private LocalDateTime tempsCreation;

    @Column(name = "titre")
    private String titre;
    @Column(name = "est_vu")
    private boolean estVu;
    public Notification(String message,String titre,NotificationType type) {
        this.type = type;
        this.message = message;
        this.tempsCreation = LocalDateTime.now();
        this.titre = titre;
    }



}
