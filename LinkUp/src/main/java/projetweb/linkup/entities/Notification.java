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

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "notification_receveurs",
            joinColumns = @JoinColumn(name = "notification_id",nullable = false),
            inverseJoinColumns = @JoinColumn(name = "etudiant_id",nullable = false)
    )
    private List<Etudiant> receuveurs;
    public Notification(String message,NotificationType type) {
        this.type = type;
        this.message = message;
        this.tempsCreation = LocalDateTime.now();
    }



}
