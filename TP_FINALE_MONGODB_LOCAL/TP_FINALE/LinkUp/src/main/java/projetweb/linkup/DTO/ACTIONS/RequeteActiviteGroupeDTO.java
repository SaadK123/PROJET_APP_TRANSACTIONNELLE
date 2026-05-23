package projetweb.linkup.DTO.ACTIONS;

import lombok.Getter;
import projetweb.linkup.entities.Activite;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;


public record RequeteActiviteGroupeDTO(
        String description,String titre,
        LocalDateTime tempsDebut, LocalDateTime tempsFin,
        String horaireId,long dureeEnMinute) {
}
