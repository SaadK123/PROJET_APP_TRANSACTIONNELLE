package projetweb.linkup;

import org.springframework.web.bind.annotation.*;
import projetweb.linkup.DTO.ACTIONS.*;
import projetweb.linkup.DTO.TYPES.RequestInvitationDTO;
import projetweb.linkup.DTO.TYPES.UpdateEtudiantPassword;
import projetweb.linkup.DTO.TYPES.UpdateEtudiantProfile;
import projetweb.linkup.Services.ServiceEtudiant;
import projetweb.linkup.Services.ServiceGroupe;
import projetweb.linkup.Services.ServiceHoraire;
import projetweb.linkup.Services.ServiceNotification;
import projetweb.linkup.entities.Etudiant;
import projetweb.linkup.entities.Group;
import projetweb.linkup.entities.Horaire;
import projetweb.linkup.entities.Notification;

import java.util.List;
@CrossOrigin(origins = {"http://localhost:3000", "http://127.0.0.1:3000"})
@RestController
@RequestMapping("/api")
public class TestController {

        private final ServiceEtudiant serviceEtudiant;
        private final ServiceGroupe serviceGroupe;
        private final ServiceHoraire serviceHoraire;
        private final ServiceNotification serviceNotification;
        public TestController(
                ServiceEtudiant serviceEtudiant,
                ServiceGroupe serviceGroupe,
                ServiceHoraire serviceHoraire, ServiceNotification serviceNotification
        ) {
                this.serviceEtudiant = serviceEtudiant;
                this.serviceGroupe = serviceGroupe;
                this.serviceHoraire = serviceHoraire;
            this.serviceNotification = serviceNotification;
        }

        @GetMapping("/health")
        public String health() {
                return "OK";
        }

        @PostMapping("/etudiants")
        public Etudiant createEtudiant(@RequestBody CreateStudentDTO dto) {
                return serviceEtudiant.createEtudiant(dto);
        }

        @DeleteMapping("/etudiants")
        public SucessDTO deleteEtudiant(@RequestBody DeleteStudentDTO dto) {
                return serviceEtudiant.deleteEtudiant(dto);
        }
        @PostMapping("/etudiant/auth")
        public Etudiant getEtudiantByAuth(@RequestBody AuthentificationDTO auth) {
                return serviceEtudiant.getEtudiantByEmailAndPassword(auth.email(),auth.password());
        }

        @GetMapping("/etudiant")
        public Etudiant getEtudiantById(@RequestParam String id) {
                return serviceEtudiant.getEtudiantById(id);
        }

        @GetMapping("/etudiant/username")
        public Etudiant getEtudiantByUsername(@RequestParam String username) {
                return serviceEtudiant.getEtudiantByUsername(username);
        }



        @PutMapping("/etudiants/profil")
        public SucessDTO updateEtudiantProfile(@RequestBody UpdateEtudiantProfile dto) {
                return serviceEtudiant.updateEtudiantProfile(dto);
        }

        @PutMapping("/etudiants/password")
        public SucessDTO updateEtudiantPassword(@RequestBody UpdateEtudiantPassword dto) {
                return serviceEtudiant.updateEtudiantPassword(dto);
        }

        @PostMapping("/groupes")
        public Group createGroup(@RequestBody CreateGroupDTO dto) {
                return serviceGroupe.createGroup(dto);
        }

        @GetMapping("/groupes")
        public List<Group> getGroupsFromEtudiant(@RequestParam String idEtudiant) {
                return serviceGroupe.getAllgroupsFromUser(idEtudiant);
        }

        @PostMapping("/groupes/invitations")
        public SucessDTO envoyerInvitationGroupe(@RequestBody RequestInvitationDTO dto) {
                return serviceGroupe.sendRequestToAnEtudiant(dto);
        }

        @PostMapping("/groupes/quitter")
        public SucessDTO quitterGroupe(@RequestBody QuitterGroupeDTO dto) {
                return serviceGroupe.quitterGroupe(dto);
        }

        @GetMapping("/horaire")
        public Horaire getHoraireById(@RequestParam String id) {
                return serviceHoraire.getHoraireFromId(id);
        }

        @GetMapping("/notifications")
        public List<Notification> getAllNotificationsFromEtudiant(@RequestParam String idEtudiant) {
                return serviceNotification.getAllNotificationsFromUser(idEtudiant);
        }

        @PutMapping("/notifications/vue")
        public SucessDTO setNotificationToWasSeen(@RequestParam String idNotification) {
                return serviceNotification.setToWasSeen(idNotification);
        }

        @DeleteMapping("/notifications")
        public SucessDTO deleteNotification(@RequestParam String idNotification) {
                return serviceNotification.deleteNotification(idNotification);
        }



        @PostMapping("/groupes/ajouter")

        public SucessDTO ajouterEtudiantDansGroupe(@RequestBody INVITATION_GROUPE_DTO invitation) {
                return serviceGroupe.rejoindreGroupe(invitation);
        }


        @PostMapping("/groupes/virer")

        public SucessDTO virerEtudiantDunGroupe(@RequestBody VirerEtudiantDTO virerEtudiantDTO) {
                return serviceGroupe.virerEtudiant(virerEtudiantDTO);
        }

        @PostMapping("/groupes/activites/ajouter")

        public SucessDTO ajouterActivite(@RequestBody RequeteActiviteGroupeDTO requeteActiviteGroupeDTO) {
                return serviceHoraire.trouverActivite(requeteActiviteGroupeDTO);
        }

        @PostMapping("/etudiants/activites/ajouter")

        public SucessDTO ajouterActivitePourEtudiant(@RequestBody AjouterActiviteDTOEtudiant ajouterActiviteDTOEtudiant) {
                return serviceHoraire.ajouterActivitePourEtudiant(ajouterActiviteDTOEtudiant);
        }
}