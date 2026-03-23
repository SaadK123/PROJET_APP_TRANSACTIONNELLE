package projetweb.linkup.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "messages")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MessageMongo {

    @Id
    private String id;

    private String envoyeurId;
    private String contenu;
    private LocalDateTime tempsEnvoi;
}
