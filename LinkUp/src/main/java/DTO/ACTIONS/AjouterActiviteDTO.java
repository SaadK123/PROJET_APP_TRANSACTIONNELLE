package DTO.ACTIONS;

import jakarta.websocket.OnMessage;
import projetweb.linkup.entities.Activite;

import java.util.UUID;


/**
 * ici destination peut etre un etudiant comme sa peut etre un groupe
 *
 * @param ajouteur_id
 *
 * @param activite
 *
 * @param destination
 */
public record AjouterActiviteDTO(UUID ajouteur_id, Activite activite, UUID destination) {

}
