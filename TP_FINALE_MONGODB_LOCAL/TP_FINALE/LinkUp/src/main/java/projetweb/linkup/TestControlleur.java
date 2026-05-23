package projetweb.linkup;

import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import projetweb.linkup.DTO.ACTIONS.*;
import projetweb.linkup.DTO.TYPES.RetourInvitationDTO;
import projetweb.linkup.DTO.TYPES.MiseAJourEtudiantMotDePasse;
import projetweb.linkup.DTO.TYPES.MiseAJourEtudiantProfil;

import java.time.Duration;
import java.util.*;

import projetweb.linkup.DTO.TYPES.RetourNotificationDTO;
import projetweb.linkup.Services.*;
import projetweb.linkup.entities.*;

@CrossOrigin(
        origins = {"http://localhost:3000", "http://127.0.0.1:3000", "http://localhost:3001"},
        allowCredentials = "true"
)
@RestController
@RequestMapping("/api")
public class TestControlleur {

        private static final String NOM_COOKIE_TOKEN = "token";
        private static final int TEMPS_EXPIRATION_COOKIE_SECONDES = 60 * 60 * 2;

        private final ServiceEtudiant serviceEtudiant;
        private final ServiceGroupe serviceGroupe;
        private final ServiceHoraire serviceHoraire;
        private final ServiceNotification serviceNotification;
        private final ServiceConversation serviceConversation;
        private final ServiceToken serviceToken;

        public TestControlleur(
                ServiceEtudiant serviceEtudiant,
                ServiceGroupe serviceGroupe,
                ServiceHoraire serviceHoraire,
                ServiceNotification serviceNotification,
                ServiceConversation serviceConversation,
                ServiceToken serviceToken
        ) {
                this.serviceEtudiant = serviceEtudiant;
                this.serviceGroupe = serviceGroupe;
                this.serviceHoraire = serviceHoraire;
                this.serviceNotification = serviceNotification;
                this.serviceConversation = serviceConversation;
                this.serviceToken = serviceToken;
        }

        private RetourHoraireDTO convertirHoraireEnRetourDTO(Horaire horaire) {
                if (horaire == null) {
                        return null;
                }

                String horaireId = horaire.getId() == null ? null : horaire.getId().toString();

                return new RetourHoraireDTO(
                        horaireId,
                        horaire.getActivites()
                );
        }

        private RetourEtudiantDTO convertirEtudiantEnRetourDTO(Etudiant etudiant) {
                if (etudiant == null) {
                        return null;
                }

                String etudiantId = etudiant.getId() == null ? null : etudiant.getId().toString();

                return new RetourEtudiantDTO(
                        etudiantId,
                        etudiant.getNomUtilisateur(),
                        etudiant.getPrenom(),
                        etudiant.getNom(),
                        etudiant.getCourriel(),
                        convertirHoraireEnRetourDTO(etudiant.getHoraire())
                );
        }

        private List<RetourEtudiantDTO> convertirEtudiantsEnRetourDTO(List<Etudiant> etudiants) {
                List<RetourEtudiantDTO> retourEtudiants = new ArrayList<>();

                if (etudiants == null) {
                        return retourEtudiants;
                }

                for (Etudiant etudiant : etudiants) {
                        retourEtudiants.add(convertirEtudiantEnRetourDTO(etudiant));
                }

                return retourEtudiants;
        }

        private RetourGroupeDTO convertirGroupeEnRetourDTO(Groupe groupe) {
                if (groupe == null) {
                        return null;
                }

                String groupeId = groupe.getId() == null ? null : groupe.getId().toString();

                return new RetourGroupeDTO(
                        groupeId,
                        convertirEtudiantEnRetourDTO(groupe.getChef()),
                        groupe.getNomGroupe(),
                        convertirEtudiantsEnRetourDTO(groupe.getEtudiants().stream().toList()),
                        convertirHoraireEnRetourDTO(groupe.getHoraire())
                );
        }

        private List<RetourGroupeDTO> convertirGroupesEnRetourDTO(List<Groupe> groupes) {
                List<RetourGroupeDTO> retourGroupes = new ArrayList<>();

                if (groupes == null) {
                        return retourGroupes;
                }

                for (Groupe groupe : groupes) {
                        retourGroupes.add(convertirGroupeEnRetourDTO(groupe));
                }

                return retourGroupes;
        }





        private RetourMessageDTO convertirMessageEnRetourDTO(Message message) {
                if (message == null) {
                        return null;
                }

                String messageId = message.getId() == null ? null : message.getId().toString();
                String envoyeurId = message.getEnvoyeurId() == null ? null : message.getEnvoyeurId().toString();
                String tempsEnvoi = message.getTempsEnvoi() == null ? null : message.getTempsEnvoi().toString();

                return new RetourMessageDTO(
                        messageId,
                        envoyeurId,
                        message.getContenu(),
                        tempsEnvoi
                );
        }

        private List<RetourMessageDTO> convertirMessagesEnRetourDTO(List<Message> messages) {
                List<RetourMessageDTO> retourMessages = new ArrayList<>();

                if (messages == null) {
                        return retourMessages;
                }

                for (Message message : messages) {
                        retourMessages.add(convertirMessageEnRetourDTO(message));
                }

                return retourMessages;
        }

        private List<String> convertirParticipantsEnString(Set<UUID> participants) {
                List<String> participantsIds = new ArrayList<>();

                if (participants == null) {
                        return participantsIds;
                }

                for (UUID participantId : participants) {
                        participantsIds.add(participantId.toString());
                }

                return participantsIds;
        }

        private RetourConversationDTO convertirConversationEnRetourDTO(Conversation conversation) {
                if (conversation == null) {
                        return null;
                }

                String conversationId = conversation.getId() == null ? null : conversation.getId().toString();
                String chefId = conversation.getChef() == null ? null : conversation.getChef().toString();

                return new RetourConversationDTO(
                        conversationId,
                        chefId,
                        convertirParticipantsEnString(conversation.getParticipants()),
                        conversation.isEstConversationGroupe(),
                        convertirMessagesEnRetourDTO(conversation.getMessages()),
                        conversation.getNom()
                );
        }

        private List<RetourConversationDTO> convertirConversationsEnRetourDTO(List<Conversation> conversations) {
                List<RetourConversationDTO> retourConversations = new ArrayList<>();

                if (conversations == null) {
                        return retourConversations;
                }

                for (Conversation conversation : conversations) {
                        retourConversations.add(convertirConversationEnRetourDTO(conversation));
                }

                return retourConversations;
        }

        private void ajouterCookieToken(HttpServletResponse response, String token) {
                ResponseCookie cookie = ResponseCookie.from(NOM_COOKIE_TOKEN, token)
                        .httpOnly(true)
                        .secure(false)
                        .sameSite("Lax")
                        .path("/")
                        .maxAge(Duration.ofSeconds(TEMPS_EXPIRATION_COOKIE_SECONDES))
                        .build();

                response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
        }

        private void supprimerCookieToken(HttpServletResponse response) {
                ResponseCookie cookie = ResponseCookie.from(NOM_COOKIE_TOKEN, "")
                        .httpOnly(true)
                        .secure(false)
                        .sameSite("Lax")
                        .path("/")
                        .maxAge(0)
                        .build();

                response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
        }

        @PostMapping("/etudiants")
        public RetourEtudiantDTO createEtudiant(@RequestBody CreationEtudiantDTO dto) {
                Etudiant etudiant = serviceEtudiant.creerEtudiant(dto);
                return convertirEtudiantEnRetourDTO(etudiant);
        }

        @DeleteMapping("/etudiants")
        public SucessDTO deleteEtudiant(@RequestBody SupprimerEtudiantDTO dto) {
                return serviceEtudiant.supprimerEtudiant(dto,serviceNotification);
        }

        @PostMapping("/etudiant/auth")
        public RetourEtudiantDTO getEtudiantByAuth(
                @RequestBody AuthentificationDTO auth,
                HttpServletResponse response
        ) {
                Etudiant etudiant = serviceEtudiant.getEtudiantByCourrielEtMotDePasse(
                        auth.courriel(),
                        auth.motDePasse()
                );

                String token = serviceToken.creerToken(etudiant);
                ajouterCookieToken(response, token);

                return convertirEtudiantEnRetourDTO(etudiant);
        }

        @PostMapping("/etudiant/logout")
        public SucessDTO logout(HttpServletResponse response) {
                supprimerCookieToken(response);
                return new SucessDTO(true, "Deconnexion reussie");
        }

        @GetMapping("/etudiant/connecte")
        public RetourEtudiantDTO getEtudiantConnecte(@AuthenticationPrincipal Jwt jwt) {
                if (jwt == null) {
                        throw new ResponseStatusException(
                                HttpStatus.UNAUTHORIZED,
                                "Utilisateur non connecte"
                        );
                }

                Etudiant etudiant = serviceEtudiant.getEtudiantById(jwt.getSubject());
                return convertirEtudiantEnRetourDTO(etudiant);
        }

        @GetMapping("/etudiant")
        public RetourEtudiantDTO getEtudiantById(@RequestParam String id) {
                Etudiant etudiant = serviceEtudiant.getEtudiantById(id);
                return convertirEtudiantEnRetourDTO(etudiant);
        }

        @GetMapping("/etudiant/username")
        public RetourEtudiantDTO getEtudiantByUsername(@RequestParam String username) {
                Etudiant etudiant = serviceEtudiant.getEtudiantByUsername(username);
                return convertirEtudiantEnRetourDTO(etudiant);
        }

        @PutMapping("/etudiants/profil")
        public SucessDTO updateEtudiantProfile(@RequestBody MiseAJourEtudiantProfil dto) {
                return serviceEtudiant.miseAJourEtudiantProfil(dto);
        }

        @PutMapping("/etudiants/password")
        public SucessDTO updateEtudiantPassword(@RequestBody MiseAJourEtudiantMotDePasse dto) {
                return serviceEtudiant.miseAJourEtudiantMotDePasse(dto);
        }

        @PostMapping("/groupes")
        public RetourGroupeDTO createGroup(@RequestBody CreationDeGroupeDTO dto) {
                Groupe groupe = serviceGroupe.creerGroupe(dto, serviceConversation);
                return convertirGroupeEnRetourDTO(groupe);
        }

        @GetMapping("/groupes")
        public List<RetourGroupeDTO> getGroupsFromEtudiant(@RequestParam String idEtudiant) {
                List<Groupe> groupes = serviceGroupe.getToutGroupesDeUser(idEtudiant);
                return convertirGroupesEnRetourDTO(groupes);
        }

        @GetMapping("/groupe")
        public RetourGroupeDTO getGroupById(@RequestParam String idGroupe) {
                Groupe groupe = serviceGroupe.getGroupeById(idGroupe);
                return convertirGroupeEnRetourDTO(groupe);
        }

        @PostMapping("/groupes/invitations")
        public SucessDTO envoyerInvitationGroupe(@RequestBody RetourInvitationDTO dto) {
                return serviceGroupe.envoyerRequeteAEtudiant(dto);
        }

        @PostMapping("/groupes/quitter")
        public SucessDTO quitterGroupe(@RequestBody QuitterGroupeDTO dto) {
                return serviceGroupe.quitterGroupe(dto);
        }

        @GetMapping("/horaire")
        public RetourHoraireDTO getHoraireById(@RequestParam String id) {
                Horaire horaire = serviceHoraire.getHoraireFromId(id);
                return convertirHoraireEnRetourDTO(horaire);
        }

        @GetMapping("/notifications")
        public List<RetourInvitationDTO> getAllNotificationsFromEtudiant(@RequestParam String idEtudiant) {
             return serviceNotification.getToutNotificationsDeUser(idEtudiant);
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
        public SucessDTO ajouterEtudiantDansGroupe(@RequestBody RetourInvitationDTO invitation) {
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

        @DeleteMapping("/activite/retirer")
        public SucessDTO retirerActivite(@RequestParam String activiteId) {
                return serviceHoraire.supprimerActivite(activiteId);
        }

        @DeleteMapping("/groupe/supprimer")
        public SucessDTO retirerGroupe(@RequestBody SupprimerGroupeDTO supprimerGroupeDTO) {
                return serviceGroupe.supprimerGroupe(supprimerGroupeDTO);
        }

        @PostMapping("/conversations")
        public SucessDTO creerConversation(@RequestBody CreationConversationDTO dto) {
                return serviceConversation.creerConversation(dto);
        }

        @GetMapping("/conversation")
        public RetourConversationDTO getConversationById(@RequestParam String id) {
                Conversation conversation = serviceConversation.getConversationById(id);
                return convertirConversationEnRetourDTO(conversation);
        }

        @DeleteMapping("/conversations")
        public SucessDTO supprimerConversation(@RequestParam String id) {
                return serviceConversation.supprimerConversation(id);
        }

        @PostMapping("/invitation")
        public SucessDTO envoyerInvitationConversation(@RequestBody RetourInvitationDTO dto) {
                return serviceConversation.invitationConversation(dto, serviceEtudiant, serviceNotification);
        }

        @PostMapping("/rejoindre")
        public SucessDTO rejoindreConversation(@RequestBody ReponseInvitationGroupe dto) {
                return serviceConversation.rejoindreConversation(dto.retourInvitationDTO(), serviceNotification);
        }

        @PostMapping("/quitter")
        public SucessDTO quitterConversation(@RequestBody QuitterGroupeDTO dto) {
                return serviceConversation.quitterConversation(dto);
        }

        @PostMapping("/virer")
        public SucessDTO virerEtudiantConversation(@RequestBody VirerEtudiantDTO dto) {
                return serviceConversation.virerEtudiantConversation(dto);
        }

        @PostMapping("/conversation/envoyerMessage")
        public SucessDTO envoyerMessage(@RequestBody EnvoyerMessageDTO dto) {
                return serviceConversation.envoyerMessage(dto);
        }

        @GetMapping("/conversations")
        public List<RetourConversationDTO> getConversationsParEtudiant(@RequestParam String idEtudiant) {
                List<Conversation> conversations = serviceConversation.getConversationsParEtudiant(idEtudiant);
                return convertirConversationsEnRetourDTO(conversations);
        }
}