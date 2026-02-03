package projetweb.linkup.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import projetweb.linkup.DTO_RECORDS.Dto;
import projetweb.linkup.Interfaces.JsonEntity;

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
    private Integer dateDeFin;

    @Column(nullable = false)
    private String titre;


    @Override
    public Dto toDto() {

    }
}
