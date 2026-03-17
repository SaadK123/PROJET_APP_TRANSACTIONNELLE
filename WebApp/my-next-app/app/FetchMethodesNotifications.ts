import { URLS } from "./FichierConfiguration";
import type { SucessDTO } from "./TypesObjets";


/**
 * Marque une notification comme vue à partir de son identifiant.
 * Envoie une requête PUT à l'API.
 */
export async function marquerNotificationCommeVue(idNotification: string) {
  const response = await fetch(
    `${URLS.MARQUER_NOTIFICATION_COMME_VUE}?idNotification=${idNotification}`,
    {
      method: "PUT",
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  const succes: SucessDTO = data;
  return succes;
}

/**
 * Supprime une notification à partir de son identifiant.
 * Envoie une requête DELETE à l'API.
 */
export async function supprimerNotification(idNotification: string) {
  const response = await fetch(
    `${URLS.SUPPRIMER_NOTIFICATION}?idNotification=${idNotification}`,
    {
      method: "DELETE",
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  const succes: SucessDTO = data;
  return succes;
}