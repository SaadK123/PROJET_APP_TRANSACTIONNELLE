import { URLS } from "./FichierConfiguration";
import type { Horaire } from "./TypesObjets";

export async function getHoraireById(id: string) {
  const response = await fetch(
    `${URLS.GET_HORAIRE_BY_ID}?id=${id}`,
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



