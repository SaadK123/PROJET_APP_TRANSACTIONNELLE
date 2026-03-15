import { URLS } from "./FichierConfiguration";
import type { Etudiant,SucessDTO } from "./TypesObjets";

export async function createEtudiant(
  firstname: string,
  lastname: string,
  username: string,
  ecole: string,
  password: string,
  email: string
) {
  const response = await fetch(URLS.CREATE_ETUDIANT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      firstname,
      lastname,
      username,
      ecole,
      password,
      email,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  const etudiant: Etudiant = data;
  return etudiant;
}



export async function deleteEtudiant(
  email: string,
  password: string
) {
  const response = await fetch(URLS.DELETE_ETUDIANT, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  const succes: SucessDTO = data;
  return succes;
}





export async function getEtudiantById(
  id: string
) {
  const response = await fetch(`${URLS.GET_ETUDIANT_BY_ID}?id=${encodeURIComponent(id)}`, {
    method: "GET",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  const etudiant: Etudiant = data;
  return etudiant;
}


export async function getEtudiantByUsername(username: string) {
  const response = await fetch(
    `${URLS.GET_ETUDIANT_BY_USERNAME}?username=${encodeURIComponent(username)}`,
    {
      method: "GET",
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  const etudiant: Etudiant = data;
  return etudiant;
}


export async function getEtudiantByAuth(
  email: string,
  password: string
) {
  const response = await fetch(URLS.AUTH_ETUDIANT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  const etudiant: Etudiant = data;
  return etudiant;
}


export async function updateEtudiantProfile(
  etudiantID: string,
  username: string,
  lastname: string,
  ecole: string,
  firstname: string
) {
  const response = await fetch(URLS.UPDATE_ETUDIANT_PROFILE, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      etudiantID,
      username,
      lastname,
      ecole,
      firstname,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  const succes: SucessDTO = data;
  return succes;
}



export async function updateEtudiantPassword(
  etudiantID: string,
  oldPassword: string,
  newPassword: string
) {
  const response = await fetch(URLS.UPDATE_ETUDIANT_PASSWORD, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      etudiantID,
      oldPassword,
      newPassword,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  const succes: SucessDTO = data;
  return succes;
}