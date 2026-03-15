import { URLS } from "./FichierConfiguration";
import type { Groupe,TypeNotification,SucessDTO } from "./TypesObjets";

export async function createGroup(
  chefID: string,
  nomGroup: string
) {
  const response = await fetch(URLS.CREATE_GROUPE, {
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



export async function getGroupsFromEtudiant(idEtudiant: string) {
  const response = await fetch(
    `${URLS.GET_GROUPES_FROM_ETUDIANT}?idEtudiant=${idEtudiant}`,
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
  etudiantUsername: string,
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
      etudiantUsername,
      message,
      type: type.valeur,
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