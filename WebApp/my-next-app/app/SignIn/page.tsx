"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { useRouter } from "next/navigation";

import { obtenirEtudiantParAuth } from "../FetchsMethodesEtudiants";
import { verifierEmail, verifierMotDePasse } from "../VerificationEmail";
import { retournerErreur } from "../attraperErreur";

import {
  GotoDashboard,
  GotoHomePage,
  GotoLogin,
  GotoSignUp,
} from "../ChangerPage";

import type { Etudiant } from "../TypesObjets";

/**
 * ici je met toute les constante en haut
 * comme sa tout est centraliser
 * et plus facile a modifier
 */

/* erreurs */
const ERREUR_CONNEXION = "impossible de se connecter";

/* titres */
const TITRE_PAGE = "Connecte toi !";

/* boutons header */
const BOUTON_PRODUIT = "Produit";
const BOUTON_FORFAIT = "Forfait";
const BOUTON_CONTACT = "Contact";
const BOUTON_CONNEXION = "Connection";
const BOUTON_INSCRIPTION = "Inscription";

/* formulaire */
const LABEL_EMAIL = "Email etudiant";
const LABEL_MOT_DE_PASSE = "Mot de passe";
const TEXTE_REGLES_MOT_DE_PASSE =
  "Le mot de passe doit contenir au moins 8 caracteres, une majuscule, un chiffre et un caractere special.";
const TEXTE_PAS_DE_COMPTE = "Pas de compte ?";
const TEXTE_INSCRIPTION = "Inscris-toi";

/* bouton submit */
const BOUTON_CONNEXION_EN_COURS = "Connexion...";
const BOUTON_CONNEXION_FORM = "Connection";

/* image */
const IMAGE_LOGO_SRC = "./Img/LogoLinkUp.png";
const IMAGE_LOGO_ALT = "Logo";

export default function SignIn() {
  const router = useRouter();

  /* state du formulaire */
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  /* state interface */
  const [erreur, setErreur] = useState<string>("");
  const [chargement, setChargement] = useState<boolean>(false);

  /**
   * ici je gere lenvoie du formulaire
   * je valide dabord les champ
   * puis je tente la connexion
   */
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setErreur("");

    const erreurEmail = verifierEmail(email);

    if (erreurEmail !== "") {
      setErreur(erreurEmail);
      return;
    }

    const erreurMotDePasse = verifierMotDePasse(password);

    if (erreurMotDePasse !== "") {
      setErreur(erreurMotDePasse);
      return;
    }

    try {
      setChargement(true);

      const etudiant: Etudiant = await obtenirEtudiantParAuth(
        email.trim(),
        password
      );

      GotoDashboard(router, etudiant.id);
    } catch (e: any) {
      setErreur(retournerErreur(e, ERREUR_CONNEXION));
    } finally {
      setChargement(false);
    }
  }

  return (
    <div>
      <div className="container-fluid">
        {/* ici cest le header */}
        <div className="row bg-white">
          {/* logo */}
          <div className="col-1">
            <button
              onClick={() => GotoHomePage(router)}
              className="border-0 bg-white"
              type="button"
            >
              <img
                className="homepage-logo p-2"
                src={IMAGE_LOGO_SRC}
                alt={IMAGE_LOGO_ALT}
              />
            </button>
          </div>

          {/* bouton du milieu */}
          <div className="col-9 p-3 pe-5 text-end">
            <button
              className="ps-2 pe-2 mt-3 text-dark rounded bg-gray-300"
              type="button"
            >
              {BOUTON_PRODUIT}
            </button>

            <button
              className="ps-2 pe-2 ms-2 me-2 text-dark rounded bg-gray-300"
              type="button"
            >
              {BOUTON_FORFAIT}
            </button>

            <button
              className="ps-2 pe-2 me-2 text-dark rounded bg-gray-300"
              type="button"
            >
              {BOUTON_CONTACT}
            </button>
          </div>

          {/* connexion et inscription */}
          <div className="col-2 p-3 text-center">
            <button
              onClick={() => GotoLogin(router)}
              className="ps-3 pe-3 mt-3"
              type="button"
            >
              {BOUTON_CONNEXION}
            </button>

            <button
              onClick={() => GotoSignUp(router)}
              className="ps-2 pe-2 rounded bg-green-500 text-white"
              type="button"
            >
              {BOUTON_INSCRIPTION}
            </button>
          </div>
        </div>

        {/* titre principal */}
        <div className="col-7 m-4">
          <h2>{TITRE_PAGE}</h2>
        </div>

        {/* formulaire de connexion */}
        <form onSubmit={handleSubmit}>
          {/* ici je montre lerreur si elle existe */}
          {erreur !== "" ? (
            <div className="alert alert-danger mb-4">{erreur}</div>
          ) : null}

          {/* champ email */}
          <div className="mb-3">
            <label>{LABEL_EMAIL}</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
              type="text"
              className="form-control"
            />
          </div>

          {/* champ mot de passe */}
          <div className="mb-3">
            <label>{LABEL_MOT_DE_PASSE}</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
              type="password"
              className="form-control"
            />
          </div>

          {/* rappel des regles */}
          <div className="mb-4">
            <p className="mb-0">{TEXTE_REGLES_MOT_DE_PASSE}</p>
          </div>

          {/* bouton de connexion */}
          <div className="d-grid mb-4">
            <button
              className="btn btn-createAcc btn-lg"
              type="submit"
              disabled={chargement}
            >
              {chargement ? BOUTON_CONNEXION_EN_COURS : BOUTON_CONNEXION_FORM}
            </button>
          </div>
        </form>

        {/* lien vers inscription */}
        <div className="col-7 mx-auto text-center">
          <label>
            {TEXTE_PAS_DE_COMPTE}{" "}
            <span>
              <a href="./SignUp">{TEXTE_INSCRIPTION}</a>
            </span>
          </label>
        </div>
      </div>
    </div>
  );
}