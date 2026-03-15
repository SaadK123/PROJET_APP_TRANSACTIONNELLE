import { URLS } from "./FichierConfiguration";
import type { Groupe, TypeNotification, SucessDTO } from "./TypesObjets";

export async function creerGroupe(
  chefID: string,
  nomGroup: string
) {
  const response = await fetch(URLS.CREER_GROUPE, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      chefID,
      nomGroup,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  const groupe: Groupe = data;
  return groupe;
}

export async function obtenirGroupesDeEtudiant(idEtudiant: string) {
  const response = await fetch(
    `${URLS.OBTENIR_GROUPES_DE_ETUDIANT}?idEtudiant=${idEtudiant}`,
    {
      method: "GET",
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  const groupes: Groupe[] = data;
  return groupes;
}

export async function envoyerInvitationGroupe(
  etudiantNomUtilisateur: string,
  message: string,
  type: TypeNotification,
  groupId: string,
  titre: string,
  envoyeurId: string
) {
  const response = await fetch(URLS.ENVOYER_INVITATION_GROUPE, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      etudiantNomUtilisateur,
      message,
      type,
      groupId,
      titre,
      envoyeurId,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  const succes: SucessDTO = data;
  return succes;
}

export async function quitterGroupe(
  idGroupe: string,
  idEtudiant: string
) {
  const response = await fetch(URLS.QUITTER_GROUPE, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      idGroupe,
      idEtudiant,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  const succes: SucessDTO = data;
  return succes;
}

export async function ajouterEtudiantDansGroupe(
  idGroupe: string,
  idEtudiant: string
) {
  const response = await fetch(URLS.AJOUTER_ETUDIANT_DANS_GROUPE, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      idGroupe,
      idEtudiant,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  const succes: SucessDTO = data;
  return succes;
}

export async function virerEtudiantDuGroupe(
  etudiantAVirerId: string,
  etudiantQuiVireId: string,
  groupid: string
) {
  const response = await fetch(URLS.VIRER_ETUDIANT_DUN_GROUPE, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      etudiantAVirerId,
      etudiantQuiVireId,
      groupid,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  const succes: SucessDTO = data;
  return succes;
}