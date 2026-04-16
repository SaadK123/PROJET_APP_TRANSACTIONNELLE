import { URLS } from "./FichierConfiguration";
import type { Horaire } from "./TypesObjets";

/**
 * Récupère un horaire à partir de son identifiant.
 * Envoie une requête GET à l'API.
 */

export async function obtenirHoraireParId(id: string) {
  const response = await fetch(
    `${URLS.OBTENIR_HORAIRE_PAR_ID}?id=${id}`,
    {
      method: "GET",
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  const horaire: Horaire = data;
  return horaire;
}