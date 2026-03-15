"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function SignIn() {
  const router = useRouter();
  const gotosignup = () => {
    router.push("/SignUp");
  };
  const gotoHomePage = () => {
    router.push("/HomePage");
  };
  const gotoLogIn = () =>{
     router.push("/SignIn")
    };
    const gotoDashBoard = () => {
      router.push("/DashBoard")
    };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
const caracteresSpeciaux = new Set([
  "!", "@", "#", "$", "%", "^", "&", "*",
  "(", ")", "_", "-", "+", "=",
  "[", "]", "{", "}", ";", ":", "'",
  '"', "\\", "|", ",", ".", "<", ">",
  "/", "?"
]);

const chiffres = new Set([
  "0", "1", "2", "3", "4",
  "5", "6", "7", "8", "9"
]);

function estEmailValide(email: string): boolean {
  const valeur = email.trim();

  if (valeur.length === 0) return false;

  const parties = valeur.split("@");

  if (parties.length !== 2) return false;

  const partieLocale = parties[0];
  const domaine = parties[1];

  if (partieLocale.length === 0 || domaine.length === 0) return false;
  if (!domaine.includes(".")) return false;

  return true;
}

function estMotDePasseValide(motDePasse: string): boolean {
  if (motDePasse.length < 8 || motDePasse.length > 32) return false;

  let aUneMajuscule = false;
  let aUnChiffre = false;
  let aUnCaractereSpecial = false;

  for (const caractere of motDePasse) {
    if (caractere >= "A" && caractere <= "Z") {
      aUneMajuscule = true;
    }

    if (chiffres.has(caractere)) {
      aUnChiffre = true;
    }

    if (caracteresSpeciaux.has(caractere)) {
      aUnCaractereSpecial = true;
    }
  }

  return aUneMajuscule && aUnChiffre && aUnCaractereSpecial;
}


  async function handleSubmit() {
    if(estEmailValide(email) && estMotDePasseValide(password)) {
      const response = await fetch("", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (!response.ok) {
      console.log("Erreur lors de la connexion");
      return;
    }

    }
  }

  return (
    <div>
      <div className="container-fluid ">
        {/*HEADER*/}

       <div className="row bg-white">

          {/*LOGO*/}
          <div className="col-1">
            <button onClick={gotoHomePage}><img className="homepage-logo p-2" src="./Img/LogoLinkUp.png" alt="Logo"/></button>
          </div>

          {/*Middle Buttons*/}

          <div className="col-9 p-3 pe-5  text-end">
            <button className=" ps-2 pe-2 mt-3 text-dark rounded bg-gray-300" type="button">Produit</button>
            <button className=" ps-2 pe-2 ms-2 me-2 text-dark rounded bg-gray-300" type="button">Forfait</button>
            <button className=" ps-2 pe-2 me-2 text-dark rounded bg-gray-300" type="button">Contact</button>
          </div>

          {/*Login/Create*/}

          <div className="col-2 p-3 text-center ">
            <button onClick={gotoLogIn} className="ps-3 pe-3 mt-3" type="button">Connection</button>
            <button onClick={gotosignup} className="ps-2 pe-2 rounded bg-green-500 text-white"type="button">Inscription</button>
          </div>
        </div>

        {/*Body*/}
        <div className="col-7 m-4">
          <h2>Connecte toi!</h2>
        </div>

        {/* Email */}
        <div className="mb-3 ">
          <label>Email étudiant</label>
          <input
            onChange={(e) => setEmail(e.currentTarget.value)}
            type="text"
            className="form-control "
          ></input>
        </div>
        {/* Mot de passe */}
        <div className="mb-5">
          <label>Mot de passe</label>
          <input
            onChange={(e) => {
              setPassword(e.currentTarget.value);
            }}
            type="password"
            className="form-control "
          ></input>
        </div>
        <div className="d-grid mb-4">
          <button
            onClick={handleSubmit}
            className="btn btn-createAcc btn-lg "
            type="submit"
          >
            Connection
          </button>
        </div>
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
