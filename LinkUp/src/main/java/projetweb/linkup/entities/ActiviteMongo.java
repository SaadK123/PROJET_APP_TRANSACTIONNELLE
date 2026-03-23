package projetweb.linkup.entities;


import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "activite")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ActiviteMongo {

    @Id
    private String id;
    private boolean estRepete=false;
    private String description;
    private LocalDateTime tempsDebut;
    private LocalDateTime tempsFin;
    private String titre;

    public ActiviteMongo(String description,LocalDateTime tempsDebut,
                    LocalDateTime tempsFin,String titre) {
     this.description = description;
     this.titre = titre;
     this.tempsDebut = tempsDebut;
     this.tempsFin = tempsFin;

    }
}
