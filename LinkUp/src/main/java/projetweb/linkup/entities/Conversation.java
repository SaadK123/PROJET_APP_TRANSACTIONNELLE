package projetweb.linkup.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.*;

@Document(collection = "conversation")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Conversation {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;


    private UUID chef;

    private Set<UUID> participants;


    private List<Message> messages;

    private String nom;

    public Conversation(UUID groupeID, UUID chef, String nom) {
        this.chef = chef;
        this.nom = nom;
        this.id=groupeID;
        this.participants = new HashSet<>();
        this.messages = new ArrayList<>();
        this.participants.add(chef);
    }

    public Conversation(UUID chef, String nom) {
        this.chef = chef;
        this.nom = nom;
        this.participants = new HashSet<>();
        this.messages = new ArrayList<>();
        this.participants.add(chef);
    }



}
