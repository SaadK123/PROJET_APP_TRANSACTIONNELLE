"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { creerEtudiant } from "@/app/FetchsMethodesEtudiants";
import type { Etudiant } from "../TypesObjets";

export default function SignUp() {
  const [username, setUsername] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [uni, setUni] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [conditions, setConditions] = useState<boolean>(false);

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

  async function handleSubmit() {
    const usernameTrim = username.trim();
    const nameTrim = name.trim();
    const firstNameTrim = firstName.trim();
    const uniTrim = uni.trim();
    const emailTrim = email.trim();
    const passwordTrim = password.trim();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
      !conditions ||
      !usernameTrim ||
      !nameTrim ||
      !firstNameTrim ||
      !uniTrim ||
      !emailTrim ||
      !passwordTrim
    ) {
      alert(
        "Tous les champs sont obligatoires et tu dois accepter les conditions d'utilisation.",
      );
      return;
    }

    if (!emailRegex.test(emailTrim)) {
      alert("Veuillez entrer une adresse courriel valide.");
      return;
    }

    if (passwordTrim.length < 8 || passwordTrim.length > 28) {
      alert("Le mot de passe doit contenir entre 8 et 28 caractères.");
      return;
    }

    try {
      const etudiant: Etudiant = await creerEtudiant(
        firstNameTrim,
        nameTrim,
        usernameTrim,
        uniTrim,
        passwordTrim,
        emailTrim,
      );

      if (!etudiant) {
        alert("La création du compte a échoué.");
        return;
      }

      router.push("/SignIn");
    } catch (e: unknown) {
      if (e instanceof Error) {
        alert(e.message);
      } else {
        alert("Une erreur est survenue lors de la création du compte.");
      }
    }
  }

  return (
    <>
      <div className="signup-background">
        {/* Head */}
        <div className="container-fluid">
          <div className="row bg-white">
            {/*LOGO*/}
            <div className="col-1">
              <button onClick={gotoHomePage}>
                <img
                  className="homepage-logo p-2"
                  src="./Img/LogoLinkUp.png"
                  alt="Logo"
                />
              </button>
            </div>

            {/*Middle Buttons*/}

            <div className="col-9 p-3 pe-5  text-end">
              <button
                className=" ps-2 pe-2 mt-3 text-dark rounded bg-gray-300"
                type="button"
              >
                Produit
              </button>
              <button
                className=" ps-2 pe-2 ms-2 me-2 text-dark rounded bg-gray-300"
                type="button"
              >
                Forfait
              </button>
              <button
                className=" ps-2 pe-2 me-2 text-dark rounded bg-gray-300"
                type="button"
              >
                Contact
              </button>
            </div>

            {/*Login/Create*/}

            <div className="col-2 p-3 text-center ">
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

          {/*Body*/}
          <div className="col-7 m-4">
            <h2>Créer un compte</h2>

            <label>
              Rejoins des milliers d&apos;étudiants qui organisent mieux leur
              temps
            </label>
          </div>

          <div>
            <form className="border rounded signup-form p-5 col-7 mx-auto">
              {/* Nom utilisateur */}
              <div className="mb-3">
                <label>Nom d&apos;utilisateur*</label>
                <input
                  value={username}
                  onChange={(e) => {
                    setUsername(e.currentTarget.value);
                  }}
                  className="form-control "
                  type="text"
                />
              </div>

              {/* Nom - Prénom */}
              <div className="row mb-3">
                <div className="col-7">
                  <label>Nom*</label>
                  <input
                    value={name}
                    onChange={(e) => {
                      setName(e.currentTarget.value);
                    }}
                    type="text"
                    className="form-control "
                  />
                </div>
                <div className="col-5">
                  <label>Prénom*</label>
                  <input
                    value={firstName}
                    onChange={(e) => {
                      setFirstName(e.currentTarget.value);
                    }}
                    type="text"
                    className="form-control "
                  />
                </div>
              </div>

              {/* Université / Cégep */}
              <div className="mb-3">
                <label htmlFor="school">Université/Cégep*</label>
                <select
                  value={uni}
                  onChange={(e) => {
                    setUni(e.currentTarget.value);
                  }}
                  className="form-select "
                  name="school"
                  id="school"
                >
                  <option value="">Choisir une université ou un cégèp</option>

                  {/* Cégeps */}
                  <option value="bois_de_boulogne">
                    Collège Bois-de-Boulogne
                  </option>
                  <option value="vanier">Collège Vanier</option>
                  <option value="montmorency">Cégep de Montmorency</option>
                  <option value="sainte_foy">Cégep de Sainte-Foy</option>
                  <option value="limoilou">Cégep Limoilou</option>
                  <option value="temiscouata">Cégep de Témiscouata</option>

                  {/* Universités */}
                  <option value="mcgill">Université McGill</option>
                  <option value="uqam">
                    Université du Québec à Montréal (UQAM)
                  </option>
                  <option value="laval">Université Laval</option>
                  <option value="montreal">Université de Montréal</option>
                  <option value="concordia">Université Concordia</option>
                  <option value="sherbrooke">Université de Sherbrooke</option>
                  <option value="trois_rivieres">
                    Université du Québec à Trois-Rivières (UQTR)
                  </option>
                  <option value="outaouais">
                    Université du Québec en Outaouais (UQO)
                  </option>
                  <option value="chicoutimi">
                    Université du Québec à Chicoutimi (UQAC)
                  </option>
                </select>
              </div>

              {/* Email */}
              <div className="mb-3 ">
                <label>Email Étudiant*</label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.currentTarget.value)}
                  type="text"
                  className="form-control "
                />
              </div>

              {/* Mot de passe */}
              <div className="mb-5">
                <label>Mot de passe*</label>
                <input
                  value={password}
                  onChange={(e) => {
                    setPassword(e.currentTarget.value);
                  }}
                  type="password"
                  className="form-control "
                />

                <input
                  checked={conditions}
                  onChange={(e) => setConditions(e.currentTarget.checked)}
                  type="checkbox"
                  className="form-check-input "
                  id="condition"
                />

                <label className="form-check-label ms-2 " htmlFor="condition">
                  J&apos;accepte les{" "}
                  <span>
                    <a href="??">conditions d&apos;utilisation</a>{" "}
                  </span>
                  et la{" "}
                  <span>
                    <a href="??">politique de confidentialité</a>
                  </span>
                </label>
              </div>

              <div className="d-grid mb-4">
                <button
                  onClick={handleSubmit}
                  className="btn btn-createAcc btn-lg "
                  type="button"
                >
                  Créer mon compte
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
