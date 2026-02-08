package projetweb.linkup.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;
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

    @MapKeyColumn(name = "jours",nullable = false)

    @OneToMany(cascade = CascadeType.ALL)
    Map<LocalDate,Jour> map = new HashMap<>();


    public Horaire(HashMap<LocalDate,Jour> map) {
        this.map = map;
    }

}
