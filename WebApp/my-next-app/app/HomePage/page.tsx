"use client";
import { useRouter } from "next/navigation";
export default function HomePage() {

  const router = useRouter();
  const gotosignup = () => {
    router.push("../page");
  };
  
  return (
    <div className="homepage-background min-h-screen bg-cover bg-center">
    <div className="container-fluid ">
      <div className="row bg-white ">
        <div className="col-1"><button><img src="WebApp/my-next-app/app/HomePage/Img/LogoLinkUp.png" alt="Logo"/></button></div>
        <div className="col-9 p-3 pe-5 text-end" >
          <button className=" ps-2 pe-2 text-dark rounded bg-gray-300"type="button">Produit</button>
          <button className=" ps-2 pe-2 ms-2 me-2 text-dark rounded bg-gray-300"type="button">Forfait</button>
          <button className=" ps-2 pe-2 ms-2 me-2 text-dark rounded bg-gray-300" type="button">Contact</button>
         </div>
        <div className="col-2 text-center p-3">
       <button className="ps-3 pe-3" type="button">Connection</button>
        <button className="ps-2 pe-2 rounded bg-green-500 text-white" type="button">Inscription</button></div> 
         </div>
      </div>
    </div>
  );
}
