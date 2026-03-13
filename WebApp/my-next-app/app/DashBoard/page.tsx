"use client";
import { useRouter } from "next/navigation";
export default function DashBoard(){
 const router = useRouter();
  const gotosignup = () => {
    router.push("/SignUp");
  };
   const gotoHomePage = () =>{
    router.push("/HomePage")
  };
  const gotoLogIn = () =>{ router.push("/SignIn")};

  return (
    <div className="homepage-background min-h-screen bg-cover bg-center pb-5">
      <div className="container-fluid">

        {/*HEADER*/}

        <div className="row bg-white">

          {/*LOGO*/}
          <div className="col-1">
            <button onClick={gotoHomePage}><img className="homepage-logo p-2" src="./Img/LogoLinkUp.png" alt="Logo"/></button>
          </div>

          {/*Middle Buttons*/}

          <div className="col-9 p-3 pe-5  text-end">
            <button className=" ps-2 pe-2 mt-3 text-dark rounded bg-gray-300" type="button">Tableau de Bord</button>
            <button className=" ps-2 pe-2 ms-2 me-2 text-dark rounded bg-gray-300" type="button">Mes Groupes</button>
            <button className=" ps-2 pe-2 me-2 text-dark rounded bg-gray-300" type="button">Calendrier</button>
          </div>

          {/*Account menu*/}

          <div className="col-2 p-3 text-center ">
            <div className="dropdown show">
                <a className="btn btn-secondary dropdown-toggle db-account-border rounded border border-3" href="#" role="button" 
                id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    Carl-Charbel Eid <br /> College de Bois de Boulogne
  </a>

  <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
    <a className="dropdown-item" href="#">Mon Compte</a>
    <a className="dropdown-item" href="#">Déconnecter</a>
  </div>
</div>
          </div>
        </div>
        </div> 
            
        </div>
        );
        }