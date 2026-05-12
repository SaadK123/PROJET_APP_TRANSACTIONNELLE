package projetweb.linkup.DTO.ACTIONS;

import projetweb.linkup.entities.Message;

public record EnvoyerMessageDTO(Message message, String conversationId) {
}
