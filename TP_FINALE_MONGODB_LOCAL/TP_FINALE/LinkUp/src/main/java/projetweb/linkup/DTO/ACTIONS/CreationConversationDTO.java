package projetweb.linkup.DTO.ACTIONS;

import com.mongodb.lang.Nullable;


public record CreationConversationDTO(String chefId, String nomConversation, @Nullable String idConversation) {
}
