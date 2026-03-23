package projetweb.linkup.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "conversation")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ConversationMongo {

    @Id
    private String id;

    private List<String> participants;

    private List<Message> messages;
}
