package projetweb.linkup.DTO.ACTIONS;

import projetweb.linkup.Enumerations.NotificationType;

public record RetourNotificationDTO(String id,String titre,String message,NotificationType type,Boolean estVu,String tempsCreation,RetourGroupeDTO groupe,RetourEtudiantDTO envoyeur) {
}
