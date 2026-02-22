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
  const gotoLogIn = () =>{ router.push("/SignIn")};

  return (
    <div className="homepage-background min-h-screen bg-cover bg-center">
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

        {/*BODY*/}
        <div className="row pt-5 pb-4 text-center"><h1 className="h1-WritingHP">Fini le Casse-Tête des Horaires</h1></div>
        <div className="row pb-5 text-center"><h5>Trouvez le moment parfait pour vous retrouver entre étudiants instantanément. <br />
         Partagez vos emplois du temps et on vous montre quand tout le monde est libre.</h5></div>
        <div className="row-7 text-center"><button type="button" onClick={gotosignup} className="pt-3 pb-3 ps-5 pe-5 bg-green-500 rounded text-white border border-success"><h4 className="h4-HP">Commencez Gratuitement</h4></button></div>
      </div>
    </div>
  );
}
