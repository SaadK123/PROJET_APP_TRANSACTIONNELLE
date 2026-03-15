package projetweb.linkup.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Horaire {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @OneToMany(fetch = FetchType.LAZY,orphanRemoval = true,cascade = CascadeType.ALL)
    @JoinColumn(name = "horaire_id",nullable = false)
    private List<Activite> activites = new ArrayList<>();


    public String getId() {
        return id.toString();

    }

    @PrePersist
    public void prePersist() {
        if (activites == null) {
            activites = new ArrayList<>();
        }
    }
}
