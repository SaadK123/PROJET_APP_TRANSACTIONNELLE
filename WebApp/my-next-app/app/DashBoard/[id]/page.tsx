import { Etudiant, Groupe } from "@/app/TypesObjets";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { obtenirEtudiantParId } from "@/app/FetchsMethodesEtudiants";
import { retournerErreur } from "@/app/attraperErreur";
import { obtenirGroupesDeEtudiant } from "@/app/FetchMethodesGroupes";

const erreurServeur: string = "erreur serveur";
const erreurImpossibleChargerClient:string = "impossible de charger le client";

export default function dashboard() {

  const id = useParams<{ id: string }>().id;

  const [load, setLoad] = useState<boolean>(true);
  const [erreur, setErreur] = useState<string>("");
  const [etudiant, setEtudiant] = useState<Etudiant | null>(null);
  const [groupes,setGroupes] = useState<Groupe[]>([]);

  /*
   permet de load le client car c'est 
   un effet secondaire ici on le met 
   dans un useEffect pour appeler l'api
   */ 
  
  useEffect(() => {
    async function chargerEtudiant() {
      try {
        if (!id) {
          setErreur(erreurImpossibleChargerClient);
          return;
        }

        const etudiant = await obtenirEtudiantParId(id);
        setEtudiant(etudiant);

      } catch (e) {
        setErreur(retournerErreur(e, erreurServeur));
      } finally {
        setLoad(false);
      }
    }
   // on charge l'etudiant ici avec le id qu'on a recu de l'autre page
    chargerEtudiant();

  }, [id]);

  if (load) {
    return <p>Chargement...</p>;
  }
 // si ya une erreur alors on fait que retourner l'erreur
  if (erreur) {
    return <p>{erreur}</p>;
  }


 useEffect(() => {

  async function loadGroupes() {
    try {
      const groupes: Groupe[] = await obtenirGroupesDeEtudiant(id);
      setGroupes(groupes);
    } catch (e) {
       setErreur(retournerErreur(e, "impossible de load les groupes"));
    }
  }

  if(etudiant) {
    loadGroupes();
  }

}, [etudiant]);

return (
  <div className="container mt-5">

 
    <div className="card p-4 shadow-sm mb-4" style={{ maxWidth: "500px" }}>

      <h2 className="mb-3">
        {etudiant?.prenom} {etudiant?.nom}
      </h2>

      <hr />

      <div className="mb-2">
        <strong>Nom utilisateur :</strong> {etudiant?.nomUtilisateur}
      </div>

      <div className="mb-2">
        <strong>Courriel :</strong> {etudiant?.courriel}
      </div>

      <div className="mb-2">
        <strong>École :</strong> {etudiant?.ecole}
      </div>

    </div>

   
    <h4 className="mb-3">Mes groupes</h4>

    {groupes.length === 0 ? (
      <p>Aucun groupe</p>
    ) : (
      <div className="row">

        {groupes.map((groupe) => (
          <div key={groupe.id} className="col-md-4 mb-3">

            <div className="card p-3 shadow-sm">

              <h5 className="mb-2">
                {groupe.nomGroupe}
              </h5>

              <div>
                <strong>Chef :</strong>{" "}
                {groupe.chef.prenom} {groupe.chef.nom}
              </div>

              <div>
                <strong>Nombre de personnes :</strong>{" "}
                {groupe.etudiants.length}
              </div>

            </div>

          </div>
        ))}

      </div>
    )}

  </div>
);
}