package projetweb.linkup.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.*;

@Entity
@Getter
@Setter
public class Horaire {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private long String;

    @MapKeyColumn(name = "jours",nullable = false)

    @OneToMany(cascade = CascadeType.ALL)
    Map<String,Jour> liste = new HashMap<>();


}
