import { URLS } from "./FichierConfiguration";
import type { SucessDTO } from "./TypesObjets";

/**
 * Ajoute une activité dans l'horaire d'un groupe.
 * Envoie une requête POST à l'API avec les informations de l'activité.
 */

export async function ajouterActivitePourGroupe(
  description: string,
  titre: string,
  tempsDebut: string,
  tempsFin: string,
  horaireId: string,
  dureeEnMinute: number
) {
  // Envoi de la requête HTTP vers l'API
  const response = await fetch(URLS.AJOUTER_ACTIVITE_GROUPE, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      description,
      titre,
      tempsDebut,
      tempsFin,
      horaireId,
      dureeEnMinute,
    }),
  });

  // Conversion de la réponse de l'API en JSON
  const data = await response.json();

  // Si la requête a échoué, on lance une erreur avec le message de l'AP
  if (!response.ok) {
    throw new Error(data.message);
  }
  // Conversion du résultat en objet de type SucessDTO
  const succes: SucessDTO = data;
  return succes;
}



/**
 * Ajoute une activité dans l'horaire personnel d'un étudiant.
 * Envoie les informations de l'activité et l'identifiant de l'étudiant.
 */
export async function ajouterActivitePourEtudiant(
  description: string,
  tempsDebut: string,
  tempsFin: string,
  titre: string,
  etudiantId: string
) {
  const response = await fetch(URLS.AJOUTER_ACTIVITE_ETUDIANT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      activite: {
        description,
        tempsDebut,
        tempsFin,
        titre,
      },
      etudiantId,
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
 * Supprime une activité à partir de son identifiant.
 * Envoie une requête DELETE à l'API.
 */


export async function retirerActivite(activiteId: string) {

  // Requête DELETE avec l'id de l'activité dans les paramètres
  const response = await fetch(
    `${URLS.SUPPRIMER_ACTIVITE}?activiteId=${activiteId}`,
    {
      method: "DELETE"
    }
  );

  const data: SucessDTO = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.message);
  }

  return data;
}