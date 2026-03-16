import { Etudiant, Groupe, SucessDTO } from "@/app/TypesObjets";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { obtenirEtudiantParId } from "@/app/FetchsMethodesEtudiants";
import { retournerErreur } from "@/app/attraperErreur";
import { obtenirGroupesDeEtudiant } from "@/app/FetchMethodesGroupes";
import { ajouterEtudiantDansGroupe } from "@/app/FetchMethodesGroupes";
const erreurServeur: string = "erreur serveur";
const erreurImpossibleChargerClient:string = "impossible de charger le client";
import { supprimerNotification } from "@/app/FetchMethodesNotifications";

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

  /*
   on met cette fonction ici pour pouvoir
   la reutiliser plus tard quand on supprime
   une notification ou qu'on accepte une invitation
   */
  async function chargerEtudiant() {
    try {

      if (!id) {
        // si lid est mauvais alors on va mettre une erreur
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
  useEffect(() => {
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

    // si on a bien l'etudiant alors on peut load ses groupes
    if(etudiant) {
      loadGroupes();
    }

  }, [etudiant]);


  /*
   permet de supprimer une notification
   puis on reload l'etudiant pour refresh
   les notifications dans le dashboard
  */
  async function supprimerNotif(notification:any) {
    try {

      await supprimerNotification(notification.id);

      // on recharge l'etudiant pour refresh les notifications
      await chargerEtudiant();

    }catch(e) {
       setErreur("la notification n'a pas pu etre supprimer");
    }
  }


  /*
   permet d'accepter une invitation
   et ensuite on recharge l'etudiant
   pour refresh les notifications et les groupes
  */
  async function accepterInvitation(notification: any) {
    try {

      const invitation = notification as any;

      await ajouterEtudiantDansGroupe(
        invitation.groupe.id,
        id
      );

      // on recharge l'etudiant pour refresh le dashboard
      await chargerEtudiant();

    } catch (e) {
      setErreur(retournerErreur(e, "impossible d'accepter l'invitation"));
    }
  }

 return (
  <div className="container mt-5">

    {/* carte profil de l'etudiant */}
    <div className="card p-4 shadow-sm mb-4" style={{ maxWidth: "500px" }}>

      {/* nom et prenom de l'etudiant */}
      <h2 className="mb-3">
        {etudiant?.prenom} {etudiant?.nom}
      </h2>

      <hr />

      {/* username */}
      <div className="mb-2">
        <strong>Nom utilisateur :</strong> {etudiant?.nomUtilisateur}
      </div>

      {/* courriel */}
      <div className="mb-2">
        <strong>Courriel :</strong> {etudiant?.courriel}
      </div>

      {/* ecole */}
      <div className="mb-2">
        <strong>École :</strong> {etudiant?.ecole}
      </div>

    </div>


    {/* section groupes de l'etudiant */}
    <h4 className="mb-3">Mes groupes</h4>

    {groupes.length === 0 ? (
      <p>Aucun groupe</p>
    ) : (
      <div className="row">

        {groupes.map((groupe) => (
          <div key={groupe.id} className="col-md-4 mb-3">

            {/* carte bootstrap pour afficher les infos du groupe */}
            <div className="card p-3 shadow-sm">

              {/* nom du groupe */}
              <h5 className="mb-2">
                {groupe.nomGroupe}
              </h5>

              {/* chef du groupe */}
              <div>
                <strong>Chef :</strong> {groupe.chef.prenom} {groupe.chef.nom}
              </div>

              {/* nombre de membres */}
              <div>
                <strong>Nombre de personnes :</strong> {groupe.etudiants.length}
              </div>

              {/* 
                 bouton pour entrer dans le groupe
                 redirige vers la page calendrier du groupe
              */}
              <button
                className="btn btn-primary btn-sm mt-2"
                onClick={() => gotoCalendarGroupe(router,id,groupe.id)}
              >
                Voir tout
              </button>

            </div>

          </div>
        ))}

      </div>
    )}


    {/* section notifications */}
    <h4 className="mt-5 mb-3">Notifications</h4>

    {etudiant?.notifications.length === 0 ? (
      <p>Aucune notification</p>
    ) : (
      <div className="row">

        {etudiant?.notifications.map((notification) => {

          const estInvitation:boolean =
            notification.type === "NOUVELLE_GROUPE_INVITATION";

          return (
            <div key={notification.id} className="col-md-4 mb-3">

              {/* carte notification */}
              <div className="card p-3 shadow-sm">

                {/* titre notification */}
                <h6>{notification.titre}</h6>

                {/* message */}
                <p>{notification.message}</p>

                {/* date */}
                <p>
                  {new Date(notification.tempsCreation).toLocaleString()}
                </p>

                {/* si c'est une invitation on peut l'accepter */}
                {estInvitation ? (
                  <button
                    className="btn btn-success btn-sm me-2"
                    onClick={() => accepterInvitation(notification)}
                  >
                    Accepter l'invitation
                  </button>
                ) : null}

                {/* bouton pour supprimer la notification */}
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => supprimerNotif(notification)}
                >
                  Supprimer
                </button>

              </div>

            </div>
          );
        })}

      </div>
    )}

  </div>
);
  
}