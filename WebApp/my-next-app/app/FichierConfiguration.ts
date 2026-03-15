const URL_BASE_API = "https://linkup-n9cw.onrender.com";

export const URLS = {
  HEALTH: `${URL_BASE_API}/api/health`,

  CREATE_ETUDIANT: `${URL_BASE_API}/api/etudiants`,
  DELETE_ETUDIANT: `${URL_BASE_API}/api/etudiants`,
  GET_ETUDIANT_BY_ID: `${URL_BASE_API}/api/etudiant`,
  AUTH_ETUDIANT: `${URL_BASE_API}/api/etudiant/auth`,
  GET_ETUDIANT_BY_USERNAME: `${URL_BASE_API}/api/etudiant/username`,
  GET_ETUDIANTS_BY_PRENOM: `${URL_BASE_API}/api/etudiants/prenom`,
  GET_ETUDIANTS_BY_NOM: `${URL_BASE_API}/api/etudiants/nom`,
  UPDATE_ETUDIANT_PROFILE: `${URL_BASE_API}/api/etudiants/profil`,
  UPDATE_ETUDIANT_PASSWORD: `${URL_BASE_API}/api/etudiants/password`,

  CREATE_GROUPE: `${URL_BASE_API}/api/groupes`,
  GET_GROUPES_FROM_ETUDIANT: `${URL_BASE_API}/api/groupes`,
  ENVOYER_INVITATION_GROUPE: `${URL_BASE_API}/api/groupes/invitations`,
  QUITTER_GROUPE: `${URL_BASE_API}/api/groupes/quitter`,

  GET_HORAIRE_BY_ID: `${URL_BASE_API}/api/horaire`,

  GET_NOTIFICATIONS_FROM_ETUDIANT: `${URL_BASE_API}/api/notifications`,
  SET_NOTIFICATION_TO_WAS_SEEN: `${URL_BASE_API}/api/notifications/vue`,
  DELETE_NOTIFICATION: `${URL_BASE_API}/api/notifications`,
};