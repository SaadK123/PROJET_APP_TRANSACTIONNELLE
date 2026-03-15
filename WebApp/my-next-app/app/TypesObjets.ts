// TypesObjets.ts

export type TypeNotification =
  | "NOUVELLE_GROUPE_INVITATION"
  | "ALERTE_SYSTEME"
  | string;

export type InfoTypeNotification = {
  valeur: TypeNotification;
  message: string;
};

export const TYPES_NOTIFICATION = {
  NOUVELLE_GROUPE_INVITATION: {
    valeur: "NOUVELLE_GROUPE_INVITATION",
    message: "Vous avez recu une invitation dans le groupe",
  },
  ALERTE_SYSTEME: {
    valeur: "ALERTE_SYSTEME",
    message: "Alerte systeme",
  },
} as const;

export type Activite = {
  id: string;
  estRepete: boolean;
  description: string;
  tempsDebut: string;
  tempsFin: string;
  titre: string;
};

export type SuccesDTO = {
  success: boolean;
  message: string;
};


export type SucessDTO = SuccesDTO;

export type Horaire = {
  id: string;
  activites: Activite[];
};

export type Notification = {
  id: string;
  message: string;
  type: TypeNotification;
  tempsCreation: string;
  titre: string;
  estVu: boolean;
};

export type Etudiant = {
  id: string;
  dernierDate: string | null;
  courriel: string;
  nomUtilisateur: string;
  nom: string;
  prenom: string;
  ecole: string;
  horaire: Horaire | null;
  notifications: Notification[];
};

export type Groupe = {
  id: string;
  chef: Etudiant;
  nomGroupe: string;
  etudiants: Etudiant[];
  horaire: Horaire | null;
};

export type Invitation = Notification & {
  groupe: Groupe;
  envoyeur: Etudiant | null;
};