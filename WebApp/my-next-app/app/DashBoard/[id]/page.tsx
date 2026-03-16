import { Etudiant } from "@/app/TypesObjets";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { obtenirEtudiantParId } from "@/app/FetchsMethodesEtudiants";
import {retournerErreur} from '@/app/attraperErreur'


const erreurServeur:string = "erreur serveur";
export default function dashboard() {

    const id = useParams<{id : string}>().id;

    const lireEtudiant =  async () => {
        return obtenirEtudiantParId(id);
    }
    const [erreur,setErreur] = useState<string>("");
    const [etudiant, setEtudiant] = useState<Etudiant | null>(null);
   

   
    useEffect(() => {
        async function chargerEtudiant(id:string) {
      try {
        const etudiant:Etudiant = await obtenirEtudiantParId(id);
        setEtudiant(etudiant);
      }catch(e) {
        setErreur( retournerErreur(e,erreurServeur));
      }

     } 

    
    if(!id) {
      setErreur("impossible de charger le client");
    }else {
        chargerEtudiant(id);
    }

    },[id]);

  return (
  <div className="container mt-5">

    {erreur && (
      <div className="alert alert-danger">
        {erreur}
      </div>
    )}

    {!etudiant && (
      <p>Chargement...</p>
    )}

    {etudiant && (
      <div className="card p-4 shadow-sm">
        <h2 className="mb-3">
          {etudiant.prenom} {etudiant.nom}
        </h2>
      </div>
    )}

  </div>
);
}







