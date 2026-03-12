package projetweb.linkup.DTO.ACTIONS;

import lombok.Getter;
import projetweb.linkup.entities.Activite;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;


public record RequeteActiviteGroupeDTO(Activite activite, LocalDateTime jourDebut, LocalDateTime jourFin,String horaireId) {
}
