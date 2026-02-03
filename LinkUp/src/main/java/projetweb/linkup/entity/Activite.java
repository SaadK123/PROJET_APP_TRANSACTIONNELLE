package projetweb.linkup.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.extern.apachecommons.CommonsLog;
import org.springframework.cglib.core.Local;
import projetweb.linkup.Interfaces.JsonEntity;

import java.time.LocalTime;
import java.util.HashMap;

@Getter
@Entity
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name="Activite")
public class Activite implements JsonEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(nullable = false)
    private String description = "";


    @Column(nullable = false)
    private LocalTime DateDeDebut;
    @Column(nullable = false)
    private LocalTime dateDeFin;

    @Column(nullable = false)
    private String titre;



   private HashMap<String,String>
   @Override
    public HashMap<String,String> toDto() {

   }
}
