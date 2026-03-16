import { URLS } from "./FichierConfiguration";
import type { Etudiant, SucessDTO } from "./TypesObjets";

export async function creerEtudiant(
  prenom: string,
  nom: string,
  nomUtilisateur: string,
  ecole: string,
  motDePasse: string,
  courriel: string
) {
  const response = await fetch(URLS.CREER_ETUDIANT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prenom,
      nom,
      nomUtilisateur,
      ecole,
      motDePasse,
      courriel,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  const etudiant: Etudiant = data;
  return etudiant;
}

export async function supprimerEtudiant(
  courriel: string,
  motDePasse: string
) {
  const response = await fetch(URLS.SUPPRIMER_ETUDIANT, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      courriel,
      motDePasse,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  const succes: SucessDTO = data;
  return succes;
}

export async function obtenirEtudiantParId(id: string) {
  const response = await fetch(
    `${URLS.OBTENIR_ETUDIANT_PAR_ID}?id=${encodeURIComponent(id)}`,
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

export async function obtenirEtudiantParNomUtilisateur(
  nomUtilisateur: string
) {
  const response = await fetch(
    `${URLS.OBTENIR_ETUDIANT_PAR_NOM_UTILISATEUR}?username=${
      nomUtilisateur
    }`,
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

export async function obtenirEtudiantParAuth(
  courriel: string,
  motDePasse: string
) {
  const response = await fetch(URLS.AUTHENTIFIER_ETUDIANT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      courriel,
      motDePasse,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  const etudiant: Etudiant = data;
  return etudiant;
}

export async function mettreAjourProfilEtudiant(
  etudiantID: string,
  nomUtilisateur: string,
  nom: string,
  ecole: string,
  prenom: string
) {
  const response = await fetch(URLS.METTRE_A_JOUR_PROFIL_ETUDIANT, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      etudiantID,
      nomUtilisateur,
      nom,
      ecole,
      prenom,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  const succes: SucessDTO = data;
  return succes;
}

export async function mettreAjourMotDePasse(
  etudiantID: string,
  vieuxMotDePasse: string,
  nouveauMotDePasse: string
) {
  const response = await fetch(URLS.METTRE_A_JOUR_MOT_DE_PASSE_ETUDIANT, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      etudiantID,
      vieuxMotDePasse,
      nouveauMotDePasse,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  const succes: SucessDTO = data;
  return succes;
}