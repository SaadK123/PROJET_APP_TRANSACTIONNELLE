package projetweb.linkup;

import org.springframework.web.bind.annotation.*;
import projetweb.linkup.DTO.ACTIONS.*;
import projetweb.linkup.DTO.TYPES.RequeteInvitationDTO;
import projetweb.linkup.DTO.TYPES.MiseAJourEtudiantMotDePasse;
import projetweb.linkup.DTO.TYPES.MiseAJourEtudiantProfil;

import java.util.*;

import projetweb.linkup.Services.*;
import projetweb.linkup.entities.*;

@CrossOrigin(origins = {"http://localhost:3000", "http://127.0.0.1:3000", "http://localhost:3001"})
@RestController
@RequestMapping("/api")
public class TestControlleur {

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

        private List<RetourEtudiantDTO> convertirEtudiantsEnRetourDTO(Collection<Etudiant> etudiants) {
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
                        convertirEtudiantsEnRetourDTO(groupe.getEtudiants()),
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

        private RetourNotificationDTO convertirNotificationEnRetourDTO(Notification notification) {
                if (notification == null) {
                        return null;
                }

                String notificationId = notification.getId() == null ? null : notification.getId().toString();
                String tempsCreation = notification.getTempsCreation() == null ? null : notification.getTempsCreation().toString();

                RetourGroupeDTO retourGroupeDTO = null;
                RetourEtudiantDTO retourEnvoyeurDTO = null;

                if (notification instanceof Invitation invitation) {
                        retourGroupeDTO = convertirGroupeEnRetourDTO(invitation.getGroupe());
                        retourEnvoyeurDTO = convertirEtudiantEnRetourDTO(invitation.getEnvoyeur());
                }

                return new RetourNotificationDTO(
                        notificationId,
                        notification.getTitre(),
                        notification.getMessage(),
                        notification.getType(),
                        notification.isEstVu(),
                        tempsCreation,
                        retourGroupeDTO,
                        retourEnvoyeurDTO
                );
        }

        private List<RetourNotificationDTO> convertirNotificationsEnRetourDTO(List<Notification> notifications) {
                List<RetourNotificationDTO> retourNotifications = new ArrayList<>();

                if (notifications == null) {
                        return retourNotifications;
                }

                for (Notification notification : notifications) {
                        retourNotifications.add(convertirNotificationEnRetourDTO(notification));
                }

                return retourNotifications;
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

        @PostMapping("/etudiants")
        public RetourEtudiantDTO createEtudiant(@RequestBody CreationEtudiantDTO dto) {
                Etudiant etudiant = serviceEtudiant.creerEtudiant(dto);
                return convertirEtudiantEnRetourDTO(etudiant);
        }

        @DeleteMapping("/etudiants")
        public SucessDTO deleteEtudiant(@RequestBody SupprimerEtudiantDTO dto) {
                return serviceEtudiant.supprimerEtudiant(dto);
        }

        @PostMapping("/etudiant/auth")
        public RetourAuthentificationDTO getEtudiantByAuth(@RequestBody AuthentificationDTO auth) {
                Etudiant etudiant = serviceEtudiant.getEtudiantByCourrielEtMotDePasse(
                        auth.courriel(),
                        auth.motDePasse()
                );

                RetourEtudiantDTO retourEtudiantDTO = convertirEtudiantEnRetourDTO(etudiant);
                String token = serviceToken.creerToken(etudiant);

                return new RetourAuthentificationDTO(retourEtudiantDTO, token);
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
        public SucessDTO envoyerInvitationGroupe(@RequestBody RequeteInvitationDTO dto) {
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
        public List<RetourNotificationDTO> getAllNotificationsFromEtudiant(@RequestParam String idEtudiant) {
                List<Notification> notifications = serviceNotification.getToutNotificationsDeUser(idEtudiant);
                return convertirNotificationsEnRetourDTO(notifications);
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
        public SucessDTO envoyerInvitationConversation(@RequestBody RequeteInvitationDTO dto) {
                return serviceConversation.invitationConversation(dto, serviceEtudiant, serviceNotification);
        }

        @PostMapping("/rejoindre")
        public SucessDTO rejoindreConversation(@RequestBody INVITATION_GROUPE_DTO dto) {
                return serviceConversation.rejoindreConversation(dto, serviceNotification);
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