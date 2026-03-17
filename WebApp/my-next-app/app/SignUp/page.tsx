"use client";

import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";

import { creerEtudiant } from "@/app/FetchsMethodesEtudiants";
import { verifierEmail, verifierMotDePasse } from "@/app/VerificationEmail";
import { retournerErreur } from "@/app/attraperErreur";

import {
  GotoHomePage,
  GotoLogin,
  GotoSignUp,
} from "@/app/ChangerPage";

/**
 * ici je met toute les constante en haut
 * comme sa tout est centraliser
 * et plus simple a maintenir
 */

/* erreurs */
const ERREUR_CREATION_COMPTE = "impossible de creer le compte";
const ERREUR_NOM_UTILISATEUR_OBLIGATOIRE =
  "le nom d utilisateur est obligatoire";
const ERREUR_NOM_OBLIGATOIRE = "le nom est obligatoire";
const ERREUR_PRENOM_OBLIGATOIRE = "le prenom est obligatoire";
const ERREUR_ECOLE_OBLIGATOIRE = "l ecole est obligatoire";
const ERREUR_CONDITIONS_OBLIGATOIRES =
  "accepter les conditions d utilisation";

/* succes */
const MESSAGE_COMPTE_CREE = "compte cree avec succes";

/* titres */
const TITRE_PAGE = "Creer un compte";
const SOUS_TITRE_PAGE =
  "Rejoins des milliers d etudiants qui organisent mieux leur temps";

/* header */
const BOUTON_PRODUIT = "Produit";
const BOUTON_FORFAIT = "Forfait";
const BOUTON_CONTACT = "Contact";
const BOUTON_CONNEXION = "Connection";
const BOUTON_INSCRIPTION = "Inscription";

/* formulaire */
const LABEL_NOM_UTILISATEUR = "Nom d utilisateur";
const LABEL_NOM = "Nom";
const LABEL_PRENOM = "Prenom";
const LABEL_ECOLE = "Universite Cegep";
const LABEL_EMAIL = "Email etudiant";
const LABEL_MOT_DE_PASSE = "Mot de passe";

const TEXTE_REGLES_MOT_DE_PASSE =
  "Le mot de passe doit contenir au moins 8 caracteres, une majuscule, un chiffre et un caractere special.";

const TEXTE_CONDITIONS_1 = "J accepte les";
const TEXTE_CONDITIONS_2 = "conditions d utilisation";
const TEXTE_CONDITIONS_3 = "et la";
const TEXTE_CONDITIONS_4 = "politique de confidentialite";

const TEXTE_DEJA_COMPTE = "Tu as deja un compte ?";
const TEXTE_CONNECTE_TOI = "Connecte-toi";

/* boutons formulaire */
const BOUTON_VOIR = "Voir";
const BOUTON_CACHER = "Cacher";
const BOUTON_CREER_COMPTE = "Creer mon compte";
const BOUTON_CREATION_EN_COURS = "Creation...";

/* select */
const VALEUR_ECOLE_VIDE = "";
const TEXTE_OPTION_ECOLE = "Choisir une universite ou un cegep";

/* image */
const IMAGE_LOGO_SRC = "./Img/LogoLinkUp.png";
const IMAGE_LOGO_ALT = "Logo";

/* liens */
const LIEN_CONDITIONS = "??";
const LIEN_CONFIDENTIALITE = "??";

/**
 * ici je garde la liste des ecole dans un tableau
 * comme sa evite de reecrire plein de option a la main
 */
const ECOLES: string[] = [
  "College Bois-de-Boulogne",
  "College Vanier",
  "Cegep de Montmorency",
  "Cegep de Sainte-Foy",
  "Cegep Limoilou",
  "Cegep de Temiscouata",
  "Universite McGill",
  "Universite du Quebec a Montreal (UQAM)",
  "Universite Laval",
  "Universite de Montreal",
  "Universite Concordia",
  "Universite de Sherbrooke",
  "Universite du Quebec a Trois-Rivieres (UQTR)",
  "Universite du Quebec en Outaouais (UQO)",
  "Universite du Quebec a Chicoutimi (UQAC)",
];

export default function SignUpTestPage() {
  const router = useRouter();

  /* state des champs */
  const [username, setUsername] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [uni, setUni] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  /* state interface */
  const [conditions, setConditions] = useState<boolean>(false);
  const [voirMotDePasse, setVoirMotDePasse] = useState<boolean>(false);
  const [erreur, setErreur] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [chargement, setChargement] = useState<boolean>(false);

  /**
   * ici je gere lenvoie du formulaire
   * je valide dabord les champs
   * puis je tente la creation du compte
   */
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setErreur("");
    setMessage("");

    if (username.trim() === "") {
      setErreur(ERREUR_NOM_UTILISATEUR_OBLIGATOIRE);
      return;
    }

    if (name.trim() === "") {
      setErreur(ERREUR_NOM_OBLIGATOIRE);
      return;
    }

    if (firstName.trim() === "") {
      setErreur(ERREUR_PRENOM_OBLIGATOIRE);
      return;
    }

    if (uni.trim() === "") {
      setErreur(ERREUR_ECOLE_OBLIGATOIRE);
      return;
    }

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

    if (conditions === false) {
      setErreur(ERREUR_CONDITIONS_OBLIGATOIRES);
      return;
    }

    try {
      setChargement(true);

      await creerEtudiant(
        firstName.trim(),
        name.trim(),
        username.trim(),
        uni.trim(),
        password,
        email.trim()
      );

      setMessage(MESSAGE_COMPTE_CREE);
      GotoLogin(router);
    } catch (e: any) {
      setErreur(retournerErreur(e, ERREUR_CREATION_COMPTE));
    } finally {
      setChargement(false);
    }
  }

  return (
    <div className="signup-background">
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

        {/* ici cest le haut du body */}
        <div className="col-7 m-4">
          <h2>{TITRE_PAGE}</h2>
          <label>{SOUS_TITRE_PAGE}</label>
        </div>

        {/* ici cest le formulaire principal */}
        <div>
          <form
            className="border rounded signup-form p-5 col-7 mx-auto"
            onSubmit={handleSubmit}
          >
            {/* message erreur */}
            {erreur !== "" ? (
              <div className="alert alert-danger mb-4">{erreur}</div>
            ) : null}

            {/* message succes */}
            {message !== "" ? (
              <div className="alert alert-success mb-4">{message}</div>
            ) : null}

            {/* nom utilisateur */}
            <div className="mb-3">
              <label>{LABEL_NOM_UTILISATEUR}</label>
              <input
                value={username}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setUsername(e.currentTarget.value)
                }
                className="form-control"
                type="text"
              />
            </div>

            {/* nom et prenom */}
            <div className="row mb-3">
              <div className="col-7">
                <label>{LABEL_NOM}</label>
                <input
                  value={name}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setName(e.currentTarget.value)
                  }
                  type="text"
                  className="form-control"
                />
              </div>

              <div className="col-5">
                <label>{LABEL_PRENOM}</label>
                <input
                  value={firstName}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setFirstName(e.currentTarget.value)
                  }
                  type="text"
                  className="form-control"
                />
              </div>
            </div>

            {/* ecole */}
            <div className="mb-3">
              <label htmlFor="school">{LABEL_ECOLE}</label>
              <select
                value={uni}
                onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                  setUni(e.currentTarget.value)
                }
                className="form-select"
                name="school"
                id="school"
              >
                <option value={VALEUR_ECOLE_VIDE}>{TEXTE_OPTION_ECOLE}</option>

                {ECOLES.map((ecole) => (
                  <option key={ecole} value={ecole}>
                    {ecole}
                  </option>
                ))}
              </select>
            </div>

            {/* email */}
            <div className="mb-3">
              <label>{LABEL_EMAIL}</label>
              <input
                value={email}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.currentTarget.value)
                }
                type="text"
                className="form-control"
              />
            </div>

            {/* mot de passe */}
            <div className="mb-3">
              <label>{LABEL_MOT_DE_PASSE}</label>

              <div className="input-group">
                <input
                  value={password}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setPassword(e.currentTarget.value)
                  }
                  type={voirMotDePasse ? "text" : "password"}
                  className="form-control"
                />

                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => setVoirMotDePasse(!voirMotDePasse)}
                >
                  {voirMotDePasse ? BOUTON_CACHER : BOUTON_VOIR}
                </button>
              </div>
            </div>

            {/* rappel des regles */}
            <div className="mb-4">
              <p className="mb-0">{TEXTE_REGLES_MOT_DE_PASSE}</p>
            </div>

            {/* conditions */}
            <div className="mb-5">
              <input
                checked={conditions}
                onChange={() => setConditions(!conditions)}
                type="checkbox"
                className="form-check-input"
                id="condition"
              />

              <label className="form-check-label ms-2" htmlFor="condition">
                {TEXTE_CONDITIONS_1}{" "}
                <span>
                  <a href={LIEN_CONDITIONS}>{TEXTE_CONDITIONS_2}</a>
                </span>{" "}
                {TEXTE_CONDITIONS_3}{" "}
                <span>
                  <a href={LIEN_CONFIDENTIALITE}>{TEXTE_CONDITIONS_4}</a>
                </span>
              </label>
            </div>

            {/* bouton creation */}
            <div className="d-grid mb-4">
              <button
                className="btn btn-createAcc btn-lg"
                type="submit"
                disabled={chargement}
              >
                {chargement ? BOUTON_CREATION_EN_COURS : BOUTON_CREER_COMPTE}
              </button>
            </div>

            {/* lien connexion */}
            <div className="col-7 mx-auto text-center">
              <label>
                {TEXTE_DEJA_COMPTE}{" "}
                <span>
                  <button
                    type="button"
                    className="btn btn-link p-0 align-baseline"
                    onClick={() => GotoLogin(router)}
                  >
                    {TEXTE_CONNECTE_TOI}
                  </button>
                </span>
              </label>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}