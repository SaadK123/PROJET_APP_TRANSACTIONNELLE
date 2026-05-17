package projetweb.linkup.DTO.ACTIONS;

import projetweb.linkup.entities.Etudiant;

import java.util.List;

public record RetourGroupeDTO(String id, RetourEtudiantDTO chef, String nomGroupe, List <RetourEtudiantDTO> etudiants,RetourHoraireDTO retourHoraireDTO) {
}
