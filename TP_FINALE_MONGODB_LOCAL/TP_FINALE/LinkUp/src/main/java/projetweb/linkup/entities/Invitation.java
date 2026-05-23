package projetweb.linkup.entities;

import com.fasterxml.jackson.annotation.JsonIncludeProperties;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import projetweb.linkup.Enumerations.NotificationType;
import projetweb.linkup.Enumerations.TypeInvitation;

import java.util.UUID;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Invitation extends Notification {

    @Column(name = "destination_id", nullable = false)
    private UUID destination;

    @JsonIncludeProperties({"id", "nom", "prenom", "nomUtilisateur", "courriel", "ecole"})
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "envoyeur_id")
    private Etudiant envoyeur;

    @Enumerated(EnumType.STRING)
    @Column(name = "type_invitation", nullable = false)
    private TypeInvitation typeInvitation;

    public Invitation(
            UUID destination,
            Etudiant envoyeur,
            NotificationType type,
            String titre,
            String message,
            TypeInvitation typeInvitation
    ) {
        super(message, titre, type);
        this.destination = destination;
        this.envoyeur = envoyeur;
        this.typeInvitation = typeInvitation;
    }
}