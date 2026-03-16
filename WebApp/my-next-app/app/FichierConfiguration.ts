const URL_BASE_API = "https://linkup-n9cw.onrender.com";

export const URLS = {
  SANTE: `${URL_BASE_API}/api/health`,

  CREER_ETUDIANT: `${URL_BASE_API}/api/etudiants`,
  SUPPRIMER_ETUDIANT: `${URL_BASE_API}/api/etudiants`,
  OBTENIR_ETUDIANT_PAR_ID: `${URL_BASE_API}/api/etudiant`,
  AUTHENTIFIER_ETUDIANT: `${URL_BASE_API}/api/etudiant/auth`,
  OBTENIR_ETUDIANT_PAR_NOM_UTILISATEUR: `${URL_BASE_API}/api/etudiant/username`,
  OBTENIR_ETUDIANTS_PAR_PRENOM: `${URL_BASE_API}/api/etudiants/prenom`,
  OBTENIR_ETUDIANTS_PAR_NOM: `${URL_BASE_API}/api/etudiants/nom`,
  METTRE_A_JOUR_PROFIL_ETUDIANT: `${URL_BASE_API}/api/etudiants/profil`,
  METTRE_A_JOUR_MOT_DE_PASSE_ETUDIANT: `${URL_BASE_API}/api/etudiants/password`,

  CREER_GROUPE: `${URL_BASE_API}/api/groupes`,
  OBTENIR_GROUPES_DE_ETUDIANT: `${URL_BASE_API}/api/groupes`,
  ENVOYER_INVITATION_GROUPE: `${URL_BASE_API}/api/groupes/invitations`,
  QUITTER_GROUPE: `${URL_BASE_API}/api/groupes/quitter`,
  OBTENIR_GROUPE_PAR_ID: `${URL_BASE_API}/api/groupes`,

  OBTENIR_HORAIRE_PAR_ID: `${URL_BASE_API}/api/horaire`,

  OBTENIR_NOTIFICATIONS_DE_ETUDIANT: `${URL_BASE_API}/api/notifications`,
  AJOUTER_ETUDIANT_DANS_GROUPE: `${URL_BASE_API}/api/groupes/ajouter`,
  MARQUER_NOTIFICATION_COMME_VUE: `${URL_BASE_API}/api/notifications/vue`,
  SUPPRIMER_NOTIFICATION: `${URL_BASE_API}/api/notifications`,
  VIRER_ETUDIANT_DUN_GROUPE: `${URL_BASE_API}/api/groupes/virer`,
  AJOUTER_ACTIVITE_GROUPE: `${URL_BASE_API}/api/groupes/activites/ajouter`,
  AJOUTER_ACTIVITE_ETUDIANT: `${URL_BASE_API}/api/etudiants/activites/ajouter`,
  SUPPRIMER_ACTIVITE: `${URL_BASE_API}/api/activites`,
};