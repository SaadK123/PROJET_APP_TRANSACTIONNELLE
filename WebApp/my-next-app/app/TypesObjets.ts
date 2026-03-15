

export type TypeNotification = {
  valeur: string;
  message: string;
};

export const TYPES_NOTIFICATION = {
  NEW_GROUP_INVITATION: {
    valeur: "NEW_GROUP_INVITATION",
    message: "Vous avez reçu une invitation dans le groupe",
  },
  SYSTEM_ALERT: {
    valeur: "SYSTEM_ALERT",
    message: "Alerte système",
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

export type SucessDTO = {
  sucess:boolean;
  message:string;
}

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
  lastdate: string | null;
  email: string;
  username: string;
  lastname: string;
  firstname: string;
  passwordhash: string;
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
  group: Groupe;
  envoyeur: Etudiant;
};

