package projetweb.linkup;

import DTO.ACTIONS.CreateStudentDTO;
import DTO.ACTIONS.DeleteStudentDTO;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;
import projetweb.linkup.Services.ServiceEtudiant;
import projetweb.linkup.entities.Etudiant;

import java.util.Optional;

@RestController
public class TestController {

        private final ServiceEtudiant serviceEtudiant;
        public TestController(ServiceEtudiant serviceEtudiant) {
                this.serviceEtudiant = serviceEtudiant;
        }
        @GetMapping("/api/health")
        public String health() { return "OK"; }

        @GetMapping("/api/healths")
        public String verifyParam(@RequestParam String s) {
                return "34324";
        }

        @PostMapping("/api/createUser")
        public Etudiant createUser(@RequestBody  CreateStudentDTO dto) {
               return serviceEtudiant.createEtudiant(dto).orElseThrow();
        }
        @DeleteMapping("/api/deleteUser")
        public Etudiant deleteUser(@RequestBody DeleteStudentDTO dto) {
                return serviceEtudiant.deleteEtudiant(dto).orElseThrow();
        }
     /*   @PutMapping("/api/updateUser")
        public Etudiant updateUser(@RequestBody UpdateStudentDTO dto) {
                return serviceEtudiant.updateEtudiant(dto).orElseThrow();
        }
        */






}
