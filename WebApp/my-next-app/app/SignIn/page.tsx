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
  function isValidEmail(email: string) {
    if (!email.includes("@")) {
      return false;
    }

    if (!email.includes(".")) {
      return false;
    }

    const atPosition = email.indexOf("@");
    const dotPosition = email.lastIndexOf(".");

    if (dotPosition < atPosition) {
      return false;
    }

    return true;
  }

  function handleSubmit() {
    if (!email) {
      alert("Veuillez entrer un email");
      return;
    }

    if (!isValidEmail(email)) {
      alert("Email invalide");
      return;
    }

    if (!password) {
      alert("Veuillez entrer un mot de passe");
      return;
    }
    
    if (email && password){
      {/*await fetch{

      } */}
      gotoDashBoard();
    }
      
    

    console.log({ email, password });
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
