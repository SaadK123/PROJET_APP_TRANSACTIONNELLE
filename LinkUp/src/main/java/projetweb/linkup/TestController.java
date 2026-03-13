package projetweb.linkup;

import projetweb.linkup.DTO.ACTIONS.CreateGroupDTO;
import projetweb.linkup.DTO.ACTIONS.CreateStudentDTO;
import projetweb.linkup.DTO.ACTIONS.DeleteStudentDTO;
import org.springframework.web.bind.annotation.*;
import projetweb.linkup.DTO.ACTIONS.SucessDTO;
import projetweb.linkup.Services.ServiceEtudiant;
import projetweb.linkup.Services.ServiceGroupe;
import projetweb.linkup.Services.ServiceHoraire;
import projetweb.linkup.Services.ServiceNotification;
import projetweb.linkup.entities.Etudiant;
import projetweb.linkup.entities.Group;
import projetweb.linkup.entities.Horaire;

import java.util.List;

@RestController
public class TestController {

        private final ServiceEtudiant serviceEtudiant;
        private final ServiceGroupe serviceGroupe;
        private final ServiceHoraire serviceHoraire;
        private final ServiceNotification serviceNotification;

        public TestController(ServiceEtudiant serviceEtudiant, ServiceGroupe serviceGroupe, ServiceHoraire serviceHoraire,ServiceNotification serviceNotification) {
                this.serviceEtudiant = serviceEtudiant;
                this.serviceGroupe = serviceGroupe;
                this.serviceHoraire = serviceHoraire;
                this.serviceNotification = serviceNotification;
        }
        @GetMapping("/api/health")
        public String health() { return "OK"; }

        @GetMapping("/api/healths")
        public String verifyParam(@RequestParam String s) {
                return "34324";
        }

        @PostMapping("api/createEtudiant")
        public Etudiant createUser(@RequestBody  CreateStudentDTO dto) {
               return serviceEtudiant.createEtudiant(dto);
        }
        @DeleteMapping("api/deleteEtudiant")
        public SucessDTO deleteUser(@RequestBody DeleteStudentDTO dto) {
                return serviceEtudiant.deleteEtudiant(dto);
        }


        @GetMapping("api/getGroup")

        public List<Group> getAllGroupsFromEtudiant(@RequestParam String id) {
               return serviceGroupe.getAllgroupsFromUser(id);
        }


        @PostMapping("api/addInvitationGroup")


        @GetMapping("api/getHoraire")
        public Horaire getHoraireById(@RequestParam String id) {
                return serviceHoraire.getHoraireFromId(id);
        }


        @GetMapping("api/getEtudiant")
        public Etudiant getEtudiant(@RequestParam String id) {
                return serviceEtudiant.getEtudiantById(id);
        }

        @PostMapping("api/createGroup")
        public Group createGroup(@RequestBody CreateGroupDTO dto) {
                return serviceGroupe.createGroup(dto);
        }






}
