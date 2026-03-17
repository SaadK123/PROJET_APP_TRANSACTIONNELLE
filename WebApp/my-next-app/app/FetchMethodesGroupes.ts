import { URLS } from "./FichierConfiguration";
import type { Groupe, TypeNotification, SucessDTO } from "./TypesObjets";

/**
 * Crée un nouveau groupe avec l'identifiant du chef et le nom du groupe.
 * Envoie une requête POST à l'API.
 */

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

/**
 * Récupère tous les groupes d’un étudiant à partir de son identifiant.
 * Envoie une requête GET à l'API.
 */

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
  // Conversion du résultat en tableau de groupes
  const groupes: Groupe[] = data;
  return groupes;
}

/**
 * Envoie une invitation de groupe à un étudiant.
 * Envoie une requête POST contenant les informations de l'invitation.
 */

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

/**
 * Permet à un étudiant de quitter un groupe.
 * Envoie une requête POST à l'API.
 */

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

/**
 * Ajoute un étudiant dans un groupe.
 * Envoie une requête POST avec l'identifiant du groupe et de l'étudiant.
 */

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


/**
 * Récupère un groupe précis à partir de son identifiant.
 * Envoie une requête GET à l'API.
 */
export async function obtenirGroupeParId(idGroupe: string) {
  const response = await fetch(
    `${URLS.OBTENIR_GROUPE_PAR_ID}?idGroupe=${idGroupe}`,
    {
      method: "GET",
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  const groupe: Groupe = data;
  return groupe;
}

/**
 * Retire un étudiant d’un groupe.
 * Envoie une requête POST avec le nom d'utilisateur de l'étudiant ciblé,
 * l'id de l'étudiant qui effectue l'action et l'id du groupe.
 */

export async function virerEtudiantDuGroupe(
  nomUtilisateur: string,
  etudiantQuiVireId: string,
  groupid: string
) {
  const response = await fetch(URLS.VIRER_ETUDIANT_DUN_GROUPE, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nomUtilisateur,
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

/**
 * Supprime un groupe.
 * Envoie une requête DELETE avec l'id du groupe et l'id du chef.
 */
export async function supprimerGroupe(groupeId: string, chefId: string) {

  const response = await fetch(URLS.SUPPRIMER_GROUPE, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      groupeId: groupeId,
      chefId: chefId
    })
  });

  const data: SucessDTO = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.message);
  }

  return data;
}