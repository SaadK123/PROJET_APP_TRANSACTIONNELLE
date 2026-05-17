package projetweb.linkup.DTO.ACTIONS;

import projetweb.linkup.entities.Activite;

import java.util.List;

public record RetourHoraireDTO(String id,List<Activite> activites) {
}
