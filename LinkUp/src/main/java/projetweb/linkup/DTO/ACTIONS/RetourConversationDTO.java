package projetweb.linkup.DTO.ACTIONS;

import java.util.List;

public record RetourConversationDTO(String id, String chefId, List<String> participantsIds, boolean estConversationGroupe, List<RetourMessageDTO> messages, String nom) {
}
