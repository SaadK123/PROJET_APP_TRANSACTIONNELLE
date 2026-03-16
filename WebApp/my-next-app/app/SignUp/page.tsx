"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { creerEtudiant } from "@/app/FetchsMethodesEtudiants";
import { verifierEmail, verifierMotDePasse } from "@/app/VerificationEmail";

export default function SignUpTestPage() {
  const [username, setUsername] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [uni, setUni] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [conditions, setConditions] = useState<boolean>(false);
  const [voirMotDePasse, setVoirMotDePasse] = useState<boolean>(false);

  // message d erreur affiche en haut en rouge
  const [erreur, setErreur] = useState<string>("");

  // message de succes si tout marche
  const [message, setMessage] = useState<string>("");

  // permet de bloquer le bouton pendant l envoi
  const [chargement, setChargement] = useState<boolean>(false);

  const router = useRouter();

  const gotoHomePage = () => {
    router.push("/HomePage");
  };

  const gotoLogIn = () => {
    router.push("/SignIn");
  };

  const gotosignup = () => {
    router.push("/SignUp");
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setErreur("");
    setMessage("");

    if (username.trim() === "") {
      setErreur("le nom d utilisateur est obligatoire");
      return;
    }

    if (name.trim() === "") {
      setErreur("le nom est obligatoire");
      return;
    }

    if (firstName.trim() === "") {
      setErreur("le prenom est obligatoire");
      return;
    }

    if (uni.trim() === "") {
      setErreur("l ecole est obligatoire");
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

    if (!conditions) {
      setErreur("accepter les conditions d utilisation");
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

      setMessage("compte cree avec succes");
      router.push("/SignIn");
    } catch (e: unknown) {
      if (e instanceof Error) {
        setErreur(e.message);
      } else {
        setErreur("impossible de creer le compte");
      }
    } finally {
      setChargement(false);
    }
  }

  return (
    <>
      <div className="signup-background">
        {/* Head */}
        <div className="container-fluid">
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

            {/* Login / Create */}
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
            <h2>Créer un compte</h2>

            <label>
              Rejoins des milliers d'étudiants qui organisent mieux leur temps
            </label>
          </div>

          <div>
            <form
              className="border rounded signup-form p-5 col-7 mx-auto"
              onSubmit={handleSubmit}
            >
              {/* message erreur */}
              {erreur !== "" ? (
                <div className="alert alert-danger mb-4">
                  {erreur}
                </div>
              ) : null}

              {/* message succes */}
              {message !== "" ? (
                <div className="alert alert-success mb-4">
                  {message}
                </div>
              ) : null}

              {/* Nom utilisateur */}
              <div className="mb-3">
                <label>Nom d'utilisateur</label>
                <input
                  value={username}
                  onChange={(e) => {
                    setUsername(e.currentTarget.value);
                  }}
                  className="form-control"
                  type="text"
                />
              </div>

              {/* Nom - Prénom */}
              <div className="row mb-3">
                <div className="col-7">
                  <label>Nom</label>
                  <input
                    value={name}
                    onChange={(e) => {
                      setName(e.currentTarget.value);
                    }}
                    type="text"
                    className="form-control"
                  />
                </div>
                <div className="col-5">
                  <label>Prénom</label>
                  <input
                    value={firstName}
                    onChange={(e) => {
                      setFirstName(e.currentTarget.value);
                    }}
                    type="text"
                    className="form-control"
                  />
                </div>
              </div>

              {/* Université / Cégep */}
              <div className="mb-3">
                <label htmlFor="school">Université/Cégep</label>
                <select
                  value={uni}
                  onChange={(e) => {
                    setUni(e.currentTarget.value);
                  }}
                  className="form-select"
                  name="school"
                  id="school"
                >
                  <option value="">Choisir une université ou un cégèp</option>

                  <option value="Collège Bois-de-Boulogne">
                    Collège Bois-de-Boulogne
                  </option>
                  <option value="Collège Vanier">Collège Vanier</option>
                  <option value="Cégep de Montmorency">
                    Cégep de Montmorency
                  </option>
                  <option value="Cégep de Sainte-Foy">
                    Cégep de Sainte-Foy
                  </option>
                  <option value="Cégep Limoilou">Cégep Limoilou</option>
                  <option value="Cégep de Témiscouata">
                    Cégep de Témiscouata
                  </option>
                  <option value="Université McGill">Université McGill</option>
                  <option value="Université du Québec à Montréal (UQAM)">
                    Université du Québec à Montréal (UQAM)
                  </option>
                  <option value="Université Laval">Université Laval</option>
                  <option value="Université de Montréal">
                    Université de Montréal
                  </option>
                  <option value="Université Concordia">
                    Université Concordia
                  </option>
                  <option value="Université de Sherbrooke">
                    Université de Sherbrooke
                  </option>
                  <option value="Université du Québec à Trois-Rivières (UQTR)">
                    Université du Québec à Trois-Rivières (UQTR)
                  </option>
                  <option value="Université du Québec en Outaouais (UQO)">
                    Université du Québec en Outaouais (UQO)
                  </option>
                  <option value="Université du Québec à Chicoutimi (UQAC)">
                    Université du Québec à Chicoutimi (UQAC)
                  </option>
                </select>
              </div>

              {/* Email */}
              <div className="mb-3">
                <label>Email Étudiant</label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.currentTarget.value)}
                  type="text"
                  className="form-control"
                />
              </div>

           <div className="mb-3">
  <label>Mot de passe</label>

       <div className="input-group">
             <input
        value={password}
      onChange={(e) => {
        setPassword(e.currentTarget.value);
      }}
      type={voirMotDePasse ? "text" : "password"}
      className="form-control"
    />

                        <button
                       type="button"
                         className="btn btn-outline-secondary"
                              onClick={() => {
                                setVoirMotDePasse(!voirMotDePasse);
                                                     }}
                                                              >
                               {voirMotDePasse ? "Cacher" : "Voir"}
                              </button>
                        </div>
                  </div>

              {/* rappel des regles */}
              <div className="mb-4">
                <small>
                  Le mot de passe doit contenir au moins 8 caractères, une
                  majuscule, un chiffre et un caractère spécial.
                </small>
              </div>

              {/* Conditions */}
              <div className="mb-5">
                <input
                  checked={conditions}
                  onChange={() => setConditions(!conditions)}
                  type="checkbox"
                  className="form-check-input"
                  id="condition"
                />
                <label className="form-check-label ms-2" htmlFor="condition">
                  J'accepte les{" "}
                  <span>
                    <a href="??">conditions d'utilisation</a>
                  </span>{" "}
                  et la{" "}
                  <span>
                    <a href="??">politique de confidentialité</a>
                  </span>
                </label>
              </div>

              <div className="d-grid mb-4">
                <button
                  className="btn btn-createAcc btn-lg"
                  type="submit"
                  disabled={chargement}
                >
                  {chargement ? "Création..." : "Créer mon compte"}
                </button>
              </div>

              <div className="col-7 mx-auto text-center">
                <label>
                  Tu as déjà un compte?{" "}
                  <span>
                    <a href="./SignIn">Connecte-toi</a>
                  </span>
                </label>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}