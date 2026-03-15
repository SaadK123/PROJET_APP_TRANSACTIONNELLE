import { URLS } from "./FichierConfiguration";
import type { SucessDTO } from "./TypesObjets";

export async function setNotificationToWasSeen(idNotification: string) {
  const response = await fetch(
    `${URLS.SET_NOTIFICATION_TO_WAS_SEEN}?idNotification=${idNotification}`,
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



export async function deleteNotification(idNotification: string) {
  const response = await fetch(
    `${URLS.DELETE_NOTIFICATION}?idNotification=${idNotification}`,
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