package projetweb.linkup;

import DTO.ACTIONS.AuthentificationDTO;
import DTO.ACTIONS.CreateStudentDTO;
import org.springframework.web.bind.annotation.*;
import projetweb.linkup.Services.ServiceEtudiant;
import projetweb.linkup.entity.Etudiant;

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
        public Etudiant createUser(@RequestBody CreateStudentDTO dto) {
               return serviceEtudiant.createEtudiant(dto).orElseThrow();
        }





}
