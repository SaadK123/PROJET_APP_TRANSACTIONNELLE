package projetweb.linkup.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import projetweb.linkup.entity.Activite;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "jour")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Jour {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column (name = "date_du_jour")
    private LocalDate dateDuJour;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn (name = "jour_id", nullable = false)
    private List<Activite> activitesDuJour = new ArrayList<>();


}