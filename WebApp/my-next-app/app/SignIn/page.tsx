"use client";
import { useRouter } from "next/navigation";
export default function HomePage() {
  const router = useRouter();
  const gotosignup = () => {
    router.push("/SignUp");
  };
   const gotoHomePage = () =>{
    router.push("/HomePage")
  };
  

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
            <button onClick={gotosignup} className="ps-2 pe-2 mt-3 rounded bg-green-500 text-white"type="button">Inscription</button>
          </div>
        </div>

        {/*BODY*/}
        <h1>JCOLE DRAKE </h1>
        </div>
    </div>
  );
}
