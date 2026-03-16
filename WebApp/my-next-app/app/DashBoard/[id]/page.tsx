"use client";

import { Etudiant, Groupe } from "@/app/TypesObjets";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { obtenirEtudiantParId } from "@/app/FetchsMethodesEtudiants";
import { retournerErreur } from "@/app/attraperErreur";
import {
  obtenirGroupesDeEtudiant,
  ajouterEtudiantDansGroupe,
  creerGroupe,
} from "@/app/FetchMethodesGroupes";
const erreurServeur: string = "erreur serveur";
const erreurImpossibleChargerClient: string = "impossible de charger le client";
import { supprimerNotification } from "@/app/FetchMethodesNotifications";
import {
  GotoCalendar,
  GotoCalendarGroupe,
  GotoHomePage,
  GotoLogin,
  GotoParametres,
} from "@/app/ChangerPage";

export default function dashboard() {
  const id = useParams<{ id: string }>().id;
  const router = useRouter();

  const [load, setLoad] = useState<boolean>(true);
  const [erreur, setErreur] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const [etudiant, setEtudiant] = useState<Etudiant | null>(null);
  const [groupes, setGroupes] = useState<Groupe[]>([]);

  // permet de stocker le texte de recherche pour filtrer les groupes
  const [rechercheGroupe, setRechercheGroupe] = useState<string>("");

  // permet de stocker le nom du groupe a creer
  const [nomNouveauGroupe, setNomNouveauGroupe] = useState<string>("");

  /*
   permet de reset les messages avant les actions
  */
  function viderMessages() {
    setErreur("");
    setMessage("");
  }

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

  /*
   permet de charger les groupes de l'etudiant
   et de refresh la liste apres une creation
   ou une acceptation d'invitation
  */
  async function chargerGroupes() {
    try {
      const groupesCharges: Groupe[] = await obtenirGroupesDeEtudiant(id);
      setGroupes(groupesCharges);
    } catch (e) {
      setErreur(retournerErreur(e, "impossible de load les groupes"));
    }
  }

  // on charge l'etudiant ici avec le id qu'on a recu de l'autre page
  useEffect(() => {
    chargerEtudiant();
  }, [id]);

  /*
   permet de charger les groupes de l'etudiant
   une fois que l'etudiant est disponible
  */
  useEffect(() => {
    if (!etudiant) return; // permet de eviter le chevauchement des useEffect
    chargerGroupes();
  }, [etudiant, id]);

  if (load) {
    return <p>Chargement...</p>;
  }

  // si ya une erreur alors on fait que retourner l'erreur
  if (erreur && !etudiant) {
    return <p>{erreur}</p>;
  }

  /*
   permet de supprimer une notification
   puis on reload l'etudiant pour refresh
   les notifications dans le dashboard
  */
  async function supprimerNotif(notification: any) {
    viderMessages();

    try {
      await supprimerNotification(notification.id);

      // on recharge l'etudiant pour refresh les notifications
      await chargerEtudiant();
    } catch (e) {
      setErreur("la notification n'a pas pu etre supprimer");
    }
  }

  /*
   permet d'accepter une invitation
   et ensuite on recharge l'etudiant
   pour refresh les notifications et les groupes
  */
  async function accepterInvitation(notification: any) {
    viderMessages();

    try {
      const invitation = notification as any;

      await ajouterEtudiantDansGroupe(invitation.groupe.id, id);

      // on recharge l'etudiant pour refresh le dashboard
      await chargerEtudiant();
      await chargerGroupes();

      setMessage("invitation acceptee");
    } catch (e) {
      setErreur(retournerErreur(e, "impossible d'accepter l'invitation"));
    }
  }

  /*
   permet de creer un groupe
   puis on refresh directement la liste
  */
  async function soumettreCreationGroupe(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    viderMessages();

    if (!id) {
      setErreur("id etudiant invalide");
      return;
    }

    if (nomNouveauGroupe.trim() === "") {
      setErreur("le nom du groupe est obligatoire");
      return;
    }

    try {
      await creerGroupe(id, nomNouveauGroupe.trim());
      setNomNouveauGroupe("");
      setMessage("groupe cree avec succes");
      await chargerGroupes();
    } catch (e) {
      setErreur(retournerErreur(e, "impossible de creer le groupe"));
    }
  }

  /*
   permet de filtrer les groupes
   selon le texte tapé dans la recherche
  */
  const groupesFiltres: Groupe[] = groupes.filter((groupe) =>
    groupe.nomGroupe.toLowerCase().includes(rechercheGroupe.toLowerCase())
  );

  return (
    <div className="container mt-4">
      {/* barre du haut */}
      <div className="d-flex flex-wrap gap-2 mb-4">
        <button
          className="btn btn-secondary"
          onClick={() => GotoHomePage(router)}
        >
          Accueil
        </button>

        <button
          className="btn btn-secondary"
          onClick={() => GotoCalendar(router, id)}
        >
          Calendrier
        </button>

        <button
          className="btn btn-secondary"
          onClick={() => GotoParametres(router, id)}
        >
          Parametres
        </button>

        <button
          className="btn btn-dark"
          onClick={() => GotoLogin(router)}
        >
          Deconnexion
        </button>
      </div>

      {/* message succes */}
      {message ? (
        <div className="alert alert-success">
          {message}
        </div>
      ) : null}

      {/* message erreur */}
      {erreur ? (
        <div className="alert alert-danger">
          {erreur}
        </div>
      ) : null}

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

      {/* section creation de groupe */}
      <div className="card p-4 shadow-sm mb-4" style={{ maxWidth: "500px" }}>
        <h4 className="mb-3">Créer un groupe</h4>

        <form onSubmit={soumettreCreationGroupe}>
          <div className="mb-3">
            <label className="form-label">Nom du groupe</label>
            <input
              type="text"
              className="form-control"
              value={nomNouveauGroupe}
              onChange={(e) => setNomNouveauGroupe(e.target.value)}
              placeholder="Entre le nom du groupe"
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Créer le groupe
          </button>
        </form>
      </div>

      {/* section groupes de l'etudiant */}
      <h4 className="mb-3">Mes groupes</h4>

      {/* champ pour rechercher un groupe */}
      <div className="mb-3" style={{ maxWidth: "400px" }}>
        <input
          type="text"
          className="form-control"
          placeholder="Rechercher un groupe par son nom..."
          value={rechercheGroupe}
          onChange={(e) => setRechercheGroupe(e.target.value)}
        />
      </div>

      {groupesFiltres.length === 0 ? (
        <p>Aucun groupe</p>
      ) : (
        <div className="row">
          {groupesFiltres.map((groupe) => (
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
                  onClick={() => GotoCalendarGroupe(router, id, groupe.id)}
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
            const estInvitation: boolean =
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