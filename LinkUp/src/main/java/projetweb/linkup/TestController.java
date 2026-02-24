package projetweb.linkup;

import projetweb.linkup.DTO.ACTIONS.CreateGroupDTO;
import projetweb.linkup.DTO.ACTIONS.CreateStudentDTO;
import projetweb.linkup.DTO.ACTIONS.DeleteStudentDTO;
import org.springframework.web.bind.annotation.*;
import projetweb.linkup.Services.ServiceEtudiant;
import projetweb.linkup.Services.ServiceGroupe;
import projetweb.linkup.entities.Etudiant;
import projetweb.linkup.entities.Group;

@RestController
public class TestController {

        private final ServiceEtudiant serviceEtudiant;
        private final ServiceGroupe serviceGroupe;
        public TestController(ServiceEtudiant serviceEtudiant,ServiceGroupe serviceGroupe) {
                this.serviceEtudiant = serviceEtudiant;
                this.serviceGroupe = serviceGroupe;
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

        @GetMapping("/api/getEtudiant")
        public Etudiant getEtudiant(@RequestParam String id) {
                return serviceEtudiant.getEtudiantById(id);
        }

        @PostMapping("/api/createGroup")
        public Group createGroup(@RequestBody CreateGroupDTO dto) {
                return serviceGroupe.createGroup(dto);
        }






}
