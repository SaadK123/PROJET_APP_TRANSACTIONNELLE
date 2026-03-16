"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { obtenirEtudiantParAuth } from "../FetchsMethodesEtudiants";
import { Etudiant } from "../TypesObjets";
import { verifierEmail, verifierMotDePasse } from "../VerificationEmail";

export default function SignIn() {
  const router = useRouter();

  const gotosignup = () => {
    router.push("/SignUp");
  };

  const gotoHomePage = () => {
    router.push("/HomePage");
  };

  const gotoLogIn = () => {
    router.push("/SignIn");
  };

  const gotoDashBoard = (id: string) => {
    router.push(`/DashBoard/${id}`);
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // message erreur affiche en haut
  const [erreur, setErreur] = useState<string>("");

  // permet de bloquer le bouton pendant la connexion
  const [chargement, setChargement] = useState<boolean>(false);

  async function handleSubmit(e:any) {
    // permet de eviter le refreshs et larret de la methode
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
      // commence le carhgement de letudiant
      setChargement(true);

      const etudiant: Etudiant = await obtenirEtudiantParAuth(
        email.trim(),
        password
      );

      gotoDashBoard(etudiant.id);
    } catch (e: unknown) {
      if (e instanceof Error) {
        setErreur(e.message);
      } else {
        setErreur("impossible de se connecter");
      }
    } finally {
      setChargement(false);
    }
  }

  return (
    <div>
      <div className="container-fluid">
        {/* HEADER */}
        <div className="row bg-white">
          {/* LOGO */}
          <div className="col-1">
            <button onClick={gotoHomePage}>
              <img
                className="homepage-logo p-2"
                src="./Img/LogoLinkUp.png"
                alt="Logo"
              />
            </button>
          </div>

          {/* Middle Buttons */}
          <div className="col-9 p-3 pe-5 text-end">
            <button
              className="ps-2 pe-2 mt-3 text-dark rounded bg-gray-300"
              type="button"
            >
              Produit
            </button>
            <button
              className="ps-2 pe-2 ms-2 me-2 text-dark rounded bg-gray-300"
              type="button"
            >
              Forfait
            </button>
            <button
              className="ps-2 pe-2 me-2 text-dark rounded bg-gray-300"
              type="button"
            >
              Contact
            </button>
          </div>

          {/* Login/Create */}
          <div className="col-2 p-3 text-center">
            <button
              onClick={gotoLogIn}
              className="ps-3 pe-3 mt-3"
              type="button"
            >
              Connection
            </button>
            <button
              onClick={gotosignup}
              className="ps-2 pe-2 rounded bg-green-500 text-white"
              type="button"
            >
              Inscription
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="col-7 m-4">
          <h2>Connecte toi!</h2>
        </div>

        <form onSubmit={handleSubmit}>
          {/* erreur en haut */}
          {erreur !== "" ? (
            <div className="alert alert-danger mb-4">
              {erreur}
            </div>
          ) : null}

          {/* Email */}
          <div className="mb-3">
            <label>Email étudiant</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
              type="text"
              className="form-control"
            />
          </div>

          {/* Mot de passe */}
          <div className="mb-3">
            <label>Mot de passe</label>
            <input
              value={password}
              onChange={(e) => {
                setPassword(e.currentTarget.value);
              }}
              type="password"
              className="form-control"
            />
          </div>

          {/* rappel des regles */}
          <div className="mb-4">
            <small>
              Le mot de passe doit contenir au moins 8 caractères, une
              majuscule, un chiffre et un caractère spécial.
            </small>
          </div>

          <div className="d-grid mb-4">
            <button
              className="btn btn-createAcc btn-lg"
              type="submit"
              disabled={chargement}
            >
              {chargement ? "Connexion..." : "Connection"}
            </button>
          </div>
        </form>

        <div className="col-7 mx-auto text-center">
          <label>
            Pas de compte?{" "}
            <span>
              <a href="./SignUp">Inscris-toi</a>
            </span>
          </label>
        </div>
      </div>
    </div>
  );
}