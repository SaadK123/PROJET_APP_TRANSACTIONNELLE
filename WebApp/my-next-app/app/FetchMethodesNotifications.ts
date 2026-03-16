import { URLS } from "./FichierConfiguration";
import type { SucessDTO } from "./TypesObjets";

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