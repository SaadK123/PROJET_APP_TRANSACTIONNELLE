package projetweb.linkup.DTO.ACTIONS;

import projetweb.linkup.entities.Invitation;

public record InvitationReponse(Invitation invitation, boolean estAcceptee) {
}
