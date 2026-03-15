import { URLS } from "./FichierConfiguration";
import type { SucessDTO } from "./TypesObjets";

export async function ajouterActivite(
  description: string,
  titre: string,
  tempsDebut: string,
  tempsFin: string,
  horaireId: string,
  dureeEnMinute: number
) {
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

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  const succes: SucessDTO = data;
  return succes;
}


export async function ajouterActivitePourEtudiant(
  description: string,
  tempsDebut: string,
  tempsFin: string,
  titre: string,
  etudiantId: string
) {
  const response = await fetch(URLS.ACTIVITE_AJOUTER_ETUDIANT, {
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