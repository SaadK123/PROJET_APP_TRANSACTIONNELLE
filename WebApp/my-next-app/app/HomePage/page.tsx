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
        <div className="row-7 text-center"><button type="button" onClick={gotosignup} className="pt-3 pb-3 ps-5 pe-5 bg-green-500 rounded text-white border border-success mb-5"><h4 className="h4-HP">Commencez Gratuitement</h4></button></div>
         
         
          {/*Examples*/}


        <div className="row p-5 mx-5 mt-5 bg-white" >
          <div className="col">
            {/*Votre Horaire*/}
            <div className="row">
               <div className="col hp-Border-Blue rounded border border-4 ">
                  <div className="col  pt-2 bg-white hp-schedule-Blue text-start"><h5>Votre Horaire</h5>
                    <div className=" p-5 mt-4 rounded bg-blue-200"></div>
                    <div className="p-4 mt-3 mb-3 rounded bg-blue-200"></div>
                    <div className="p-3 mb-4 rounded bg-blue-200 "></div>
                  </div>
                </div>
                {/*Friends*/}
              <div className="col ps-5 pe-5">
                <div className="row">
                   <div className="col hp-Border-Purple rounded border border-4 ">
                    <div className="col pt-2 pb-4 bg-white hp-friends-Purple text-start"><h5>Amis</h5>
                    {/*Friends rows*/}
                      <div className="row p-5 ps-3 pb-2 pe-3 "> 
                        <div className="col-2 "><div className="rounded-circle bg-blue-200">ㅤ</div></div>
                        <div className="col-8 ms-4 bg-blue-200 rounded">ㅤ</div>
                      </div>
                      <div className="row p-5 ps-3 pb-2 pt-4 pe-3"> 
                        <div className="col-2"><div className="rounded-circle bg-purple-200">ㅤ</div></div>
                        <div className="col-8 ms-4 bg-purple-200 rounded">ㅤ</div>
                      </div>
                      <div className="row p-5 ps-3 pb-5 pt-4 pe-3"> 
                        <div className="col-2"><div className="rounded-circle bg-green-200">ㅤ</div></div>
                        <div className="col-8 ms-4 bg-green-200 rounded">ㅤ</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
                  {/*Free Time*/}
              <div className="col hp-Border-Green rounded border border-4 ">
                  <div className="col pt-2 bg-white hp-time-Green text-start"><h5>Temps Libre</h5>
                    <div className=" p-4 mt-5 rounded bg-green-200 hp-time-Green text-center"><h5>Lundi 18h-22h</h5></div>
                    <div className="p-4 mt-4 rounded bg-green-200 hp-time-Green text-center"><h5>Jeudi 19h - 23h</h5></div>
                  </div>
                </div>
            </div>
          
          </div>

        </div>
      </div>
    </div>
  );
}
