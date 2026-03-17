"use client";

import { useEffect, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { useParams, useRouter } from "next/navigation";

import type { Etudiant, Groupe, Invitation } from "@/app/TypesObjets";

import { obtenirEtudiantParId } from "@/app/FetchsMethodesEtudiants";
import {
  obtenirGroupesDeEtudiant,
  ajouterEtudiantDansGroupe,
  creerGroupe,
} from "@/app/FetchMethodesGroupes";
import { supprimerNotification } from "@/app/FetchMethodesNotifications";

import { retournerErreur } from "@/app/attraperErreur";

import {
  GotoCalendar,
  GotoCalendarGroupe,
  GotoHomePage,
  GotoLogin,
  GotoParametres,
} from "@/app/ChangerPage";

/**
 * ici je met toute les constante en haut
 * comme sa tout est centraliser
 * et tout les texte sont reutilisable
 */

/* erreurs */
const ERREUR_SERVEUR = "erreur serveur";
const ERREUR_IMPOSSIBLE_CHARGER_CLIENT = "impossible de charger le client";
const ERREUR_IMPOSSIBLE_CHARGER_GROUPES = "impossible de charger les groupes";
const ERREUR_IMPOSSIBLE_SUPPRIMER_NOTIFICATION =
  "la notification na pas pu etre supprimer";
const ERREUR_IMPOSSIBLE_ACCEPTER_INVITATION =
  "impossible daccepter linvitation";
const ERREUR_IMPOSSIBLE_CREER_GROUPE = "impossible de creer le groupe";
const ERREUR_ID_ETUDIANT_INVALIDE = "id etudiant invalide";
const ERREUR_NOM_GROUPE_OBLIGATOIRE = "le nom du groupe est obligatoire";

/* succes */
const MESSAGE_INVITATION_ACCEPTEE = "invitation acceptee";
const MESSAGE_GROUPE_CREE = "groupe cree avec succes";

/* titres */
const TITRE_CHARGEMENT = "Chargement...";
const TITRE_CREER_GROUPE = "Creer un groupe";
const TITRE_MES_GROUPES = "Mes groupes";
const TITRE_NOTIFICATIONS = "Notifications";
const TITRE_AUCUN_GROUPE = "Aucun groupe";
const TITRE_AUCUNE_NOTIFICATION = "Aucune notification";

/* boutons */
const BOUTON_ACCUEIL = "Accueil";
const BOUTON_CALENDRIER = "Calendrier";
const BOUTON_PARAMETRES = "Parametres";
const BOUTON_DECONNEXION = "Deconnexion";
const BOUTON_CREER_GROUPE = "Creer le groupe";
const BOUTON_VOIR_TOUT = "Voir tout";
const BOUTON_ACCEPTER_INVITATION = "Accepter linvitation";
const BOUTON_SUPPRIMER = "Supprimer";

/* labels */
const LABEL_NOM_UTILISATEUR = "Nom utilisateur :";
const LABEL_COURRIEL = "Courriel :";
const LABEL_ECOLE = "Ecole :";
const LABEL_NOM_GROUPE = "Nom du groupe";
const LABEL_RECHERCHE_GROUPE = "Rechercher un groupe par son nom...";
const LABEL_CHEF = "Chef :";
const LABEL_NOMBRE_PERSONNES = "Nombre de personnes :";

/* placeholder */
const PLACEHOLDER_NOM_GROUPE = "Entre le nom du groupe";

/* style */
const LARGEUR_CARTE = "500px";
const LARGEUR_RECHERCHE = "400px";

export default function Dashboard() {
  const id = useParams<{ id: string }>().id;
  const router = useRouter();

  /* state principal */
  const [load, setLoad] = useState<boolean>(true);
  const [erreur, setErreur] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  /* state des donnees */
  const [etudiant, setEtudiant] = useState<Etudiant | null>(null);
  const [groupes, setGroupes] = useState<Groupe[]>([]);

  /* state des input */
  const [rechercheGroupe, setRechercheGroupe] = useState<string>("");
  const [nomNouveauGroupe, setNomNouveauGroupe] = useState<string>("");

  /**
   * ici je vide les messages
   * avant chaque action
   */
  function viderMessages() {
    setErreur("");
    setMessage("");
  }

  /**
   * ici je charge letudiant
   */
  async function chargerEtudiant() {
    try {
      if (!id) {
        setEtudiant(null);
        setErreur(ERREUR_IMPOSSIBLE_CHARGER_CLIENT);
        return;
      }

      const etudiantCharge = await obtenirEtudiantParId(id);
      setEtudiant(etudiantCharge);
    } catch (e: any) {
      setEtudiant(null);
      setErreur(retournerErreur(e, ERREUR_SERVEUR));
    }
  }

  /**
   * ici je charge les groupes
   * de letudiant connecter
   */
  async function chargerGroupes() {
    try {
      if (!id) {
        setGroupes([]);
        setErreur(ERREUR_IMPOSSIBLE_CHARGER_CLIENT);
        return;
      }

      const groupesCharges = await obtenirGroupesDeEtudiant(id);
      setGroupes(groupesCharges);
    } catch (e: any) {
      setGroupes([]);
      setErreur(retournerErreur(e, ERREUR_IMPOSSIBLE_CHARGER_GROUPES));
    }
  }

  /**
   * ici je charge toute la page
   * comme sa jai un seul useEffect
   */
  async function chargerDashboard() {
    setLoad(true);
    viderMessages();

    if (!id) {
      setEtudiant(null);
      setGroupes([]);
      setErreur(ERREUR_IMPOSSIBLE_CHARGER_CLIENT);
      setLoad(false);
      return;
    }

    await chargerEtudiant();
    await chargerGroupes();

    setLoad(false);
  }

  /**
   * ici on charge tout au demarrage
   */
  useEffect(() => {
    chargerDashboard();
  }, [id]);

  /**
   * ici je supprime une notification
   * puis je recharge letudiant
   */
  async function supprimerNotif(notificationId: string) {
    viderMessages();

    try {
      await supprimerNotification(notificationId);
      await chargerEtudiant();
    } catch (e: any) {
      setErreur(retournerErreur(e, ERREUR_IMPOSSIBLE_SUPPRIMER_NOTIFICATION));
    }
  }

  /**
   * ici jaccepte une invitation
   * puis je recharge tout
   */
  async function accepterInvitation(notification: Invitation) {
    viderMessages();

    try {
      await ajouterEtudiantDansGroupe(notification.groupe.id, id);
      await chargerEtudiant();
      await chargerGroupes();
      setMessage(MESSAGE_INVITATION_ACCEPTEE);
    } catch (e: any) {
      setErreur(retournerErreur(e, ERREUR_IMPOSSIBLE_ACCEPTER_INVITATION));
    }
  }

  /**
   * ici je cree un groupe
   * puis je recharge la liste
   */
  async function soumettreCreationGroupe(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    viderMessages();

    if (!id) {
      setErreur(ERREUR_ID_ETUDIANT_INVALIDE);
      return;
    }

    if (nomNouveauGroupe.trim() === "") {
      setErreur(ERREUR_NOM_GROUPE_OBLIGATOIRE);
      return;
    }

    try {
      await creerGroupe(id, nomNouveauGroupe.trim());
      setNomNouveauGroupe("");
      setMessage(MESSAGE_GROUPE_CREE);
      await chargerGroupes();
    } catch (e: any) {
      setErreur(retournerErreur(e, ERREUR_IMPOSSIBLE_CREER_GROUPE));
    }
  }

  /**
   * ici je filtre les groupes
   * selon le texte taper
   */
  const groupesFiltres: Groupe[] = groupes.filter((groupe) =>
    groupe.nomGroupe.toLowerCase().includes(rechercheGroupe.toLowerCase())
  );

  /**
   * si sa charge je montre juste sa
   */
  if (load) {
    return <p>{TITRE_CHARGEMENT}</p>;
  }

  /**
   * si il y a une erreur
   * avant davoir letudiant
   */
  if (erreur !== "") {
    if (etudiant === null) {
      return <p>{erreur}</p>;
    }
  }

  /**
   * dernier filet de securite
   */
  if (etudiant === null) {
    return <p>{ERREUR_IMPOSSIBLE_CHARGER_CLIENT}</p>;
  }

  return (
    <div className="container mt-4">
      {/* ici cest la barre du haut avec les bouton de navigation */}
      <div className="d-flex flex-wrap gap-2 mb-4">
        <button
          className="btn btn-secondary"
          onClick={() => GotoHomePage(router)}
        >
          {BOUTON_ACCUEIL}
        </button>

        <button
          className="btn btn-secondary"
          onClick={() => GotoCalendar(router, id)}
        >
          {BOUTON_CALENDRIER}
        </button>

        <button
          className="btn btn-secondary"
          onClick={() => GotoParametres(router, id)}
        >
          {BOUTON_PARAMETRES}
        </button>

        <button className="btn btn-dark" onClick={() => GotoLogin(router)}>
          {BOUTON_DECONNEXION}
        </button>
      </div>

      {/* ici je montre le message succes si il existe */}
      {message !== "" ? (
        <div className="alert alert-success">{message}</div>
      ) : null}

      {/* ici je montre le message erreur si il existe */}
      {erreur !== "" ? (
        <div className="alert alert-danger">{erreur}</div>
      ) : null}

      {/* ici cest la carte principal de letudiant */}
      <div
        className="card p-4 shadow-sm mb-4"
        style={{ maxWidth: LARGEUR_CARTE }}
      >
        {/* ici je montre le nom complet */}
        <h2 className="mb-3">
          {etudiant.prenom} {etudiant.nom}
        </h2>

        <hr />

        {/* ici je montre les info de base */}
        <div className="mb-2">
          <b>{LABEL_NOM_UTILISATEUR}</b> {etudiant.nomUtilisateur}
        </div>

        <div className="mb-2">
          <b>{LABEL_COURRIEL}</b> {etudiant.courriel}
        </div>

        <div className="mb-2">
          <b>{LABEL_ECOLE}</b> {etudiant.ecole}
        </div>
      </div>

      {/* ici cest la section pour creer un groupe */}
      <div
        className="card p-4 shadow-sm mb-4"
        style={{ maxWidth: LARGEUR_CARTE }}
      >
        {/* titre de la carte */}
        <h4 className="mb-3">{TITRE_CREER_GROUPE}</h4>

        <form onSubmit={soumettreCreationGroupe}>
          {/* input du nom du groupe */}
          <div className="mb-3">
            <label className="form-label">{LABEL_NOM_GROUPE}</label>
            <input
              type="text"
              className="form-control"
              value={nomNouveauGroupe}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setNomNouveauGroupe(e.target.value)
              }
              placeholder={PLACEHOLDER_NOM_GROUPE}
            />
          </div>

          {/* bouton pour creer */}
          <button type="submit" className="btn btn-primary">
            {BOUTON_CREER_GROUPE}
          </button>
        </form>
      </div>

      {/* ici cest la section des groupes */}
      <h4 className="mb-3">{TITRE_MES_GROUPES}</h4>

      {/* ici cest la barre de recherche */}
      <div className="mb-3" style={{ maxWidth: LARGEUR_RECHERCHE }}>
        <input
          type="text"
          className="form-control"
          placeholder={LABEL_RECHERCHE_GROUPE}
          value={rechercheGroupe}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setRechercheGroupe(e.target.value)
          }
        />
      </div>

      {/* ici soit je montre aucun groupe soit la liste des cartes */}
      {groupesFiltres.length === 0 ? (
        <p>{TITRE_AUCUN_GROUPE}</p>
      ) : (
        <div className="row">
          {groupesFiltres.map((groupe) => (
            <div key={groupe.id} className="col-md-4 mb-3">
              {/* ici cest une carte de groupe */}
              <div className="card p-3 shadow-sm">
                {/* nom du groupe */}
                <h5 className="mb-2">{groupe.nomGroupe}</h5>

                {/* chef du groupe */}
                <div>
                  <b>{LABEL_CHEF}</b> {groupe.chef.prenom} {groupe.chef.nom}
                </div>

                {/* nombre de personnes dans le groupe */}
                <div>
                  <b>{LABEL_NOMBRE_PERSONNES}</b> {groupe.etudiants.length}
                </div>

                {/* bouton pour ouvrir le groupe */}
                <button
                  className="btn btn-primary btn-sm mt-2"
                  onClick={() => GotoCalendarGroupe(router, id, groupe.id)}
                >
                  {BOUTON_VOIR_TOUT}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ici cest la section des notifications */}
      <h4 className="mt-5 mb-3">{TITRE_NOTIFICATIONS}</h4>

      {/* ici soit je montre aucune notification soit la liste */}
      {etudiant.notifications.length === 0 ? (
        <p>{TITRE_AUCUNE_NOTIFICATION}</p>
      ) : (
        <div className="row">
          {etudiant.notifications.map((notification) => {
            const estInvitation =
              notification.type === "NOUVELLE_GROUPE_INVITATION";

            return (
              <div key={notification.id} className="col-md-4 mb-3">
                {/* ici cest une carte notification */}
                <div className="card p-3 shadow-sm">
                  {/* titre de la notification */}
                  <h6>{notification.titre}</h6>

                  {/* message de la notification */}
                  <p>{notification.message}</p>

                  {/* date de creation */}
                  <p>{new Date(notification.tempsCreation).toLocaleString()}</p>

                  {/* si cest une invitation je montre le bouton accepter */}
                  {estInvitation ? (
                    <button
                      className="btn btn-success btn-sm me-2"
                      onClick={() => accepterInvitation(notification as Invitation)}
                    >
                      {BOUTON_ACCEPTER_INVITATION}
                    </button>
                  ) : null}

                  {/* bouton pour supprimer la notification */}
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => supprimerNotif(notification.id)}
                  >
                    {BOUTON_SUPPRIMER}
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