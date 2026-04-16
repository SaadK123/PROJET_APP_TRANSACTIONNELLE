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
//npm install react-bootstrap bootstrap
import Spinner from "react-bootstrap/Spinner";
import {
  GotoCalendar,
  GotoCalendarGroupe,
  GotoHomePage,
  GotoLogin,
  GotoParametres,
} from "@/app/ChangerPage";

import { creerConversationPrivee } from "@/app/FetchMethodesConversations";

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
const ERREUR_NOM_UTILISATEUR_CONVERSATION_OBLIGATOIRE = "le nom utilisateur est obligatoire";
const ERREUR_IMPOSSIBLE_CREER_CONVERSATION = "impossible de creer la conversation";

/* succes */
const MESSAGE_INVITATION_ACCEPTEE = "invitation acceptee";
const MESSAGE_GROUPE_CREE = "groupe cree avec succes";
const MESSAGE_CONVERSATION_CREEE = "conversation creee avec succes";

/* titres */
const TITRE_CHARGEMENT = "Chargement...";
const TITRE_CREER_GROUPE = "Creer un groupe";
const TITRE_MES_GROUPES = "Mes groupes";
const TITRE_NOTIFICATIONS = "Notifications";
const TITRE_AUCUN_GROUPE = "Aucun groupe";
const TITRE_AUCUNE_NOTIFICATION = "Aucune notification";
const TITRE_CREER_CONVERSATION = "Creer une conversation";

/* boutons */
const BOUTON_ACCUEIL = "Accueil";
const BOUTON_CALENDRIER = "Calendrier";
const BOUTON_PARAMETRES = "Parametres";
const BOUTON_DECONNEXION = "Deconnexion";
const BOUTON_CREER_GROUPE = "Creer le groupe";
const BOUTON_VOIR_TOUT = "Voir tout";
const BOUTON_ACCEPTER_INVITATION = "Accepter linvitation";
const BOUTON_SUPPRIMER = "Supprimer";
const BOUTON_CREER_CONVERSATION = "Creer conversation";

/* labels */
const LABEL_NOM_UTILISATEUR = "Nom utilisateur :";
const LABEL_COURRIEL = "Courriel :";
const LABEL_ECOLE = "Ecole :";
const LABEL_NOM_GROUPE = "Nom du groupe";
const LABEL_RECHERCHE_GROUPE = "Rechercher un groupe par son nom...";
const LABEL_CHEF = "Chef :";
const LABEL_NOMBRE_PERSONNES = "Nombre de personnes :";
const LABEL_NOM_UTILISATEUR_CONVERSATION = "Nom utilisateur";

/* placeholder */
const PLACEHOLDER_NOM_GROUPE = "Entre le nom du groupe";
const PLACEHOLDER_NOM_UTILISATEUR_CONVERSATION = "Entre le nom utilisateur";

// constants pour conversation

const TITRE_MESSAGERIE = "Messagerie";
const SOUS_TITRE_CONVERSATIONS = "Conversations";
const TEXTE_PARTICIPANTS = "participants";
const PLACEHOLDER_MESSAGE = "Ecris ton message...";
const BOUTON_ENVOYER = "Envoyer";

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
  const [nomUtilisateurConversation, setNomUtilisateurConversation] = useState<string>("");

  /* state des conversation */
  const [conversationSelectionnee, setConversationSelectionnee] = useState<string>("Projet équipe");
  const [messageTexte, setMessageTexte] = useState<string>("");




  const [messagesDemo, setMessagesDemo] = useState<
  { id: number; auteur: string; contenu: string; heure: string; moi: boolean }[]
  >([
    { id: 1, auteur: "Alex", contenu: "Salut, vous êtes dispo pour avancer le projet ?", heure: "18:42", moi: false },
    { id: 2, auteur: "Moi", contenu: "Oui, je suis là. On commence par la messagerie.", heure: "18:43", moi: true },
    { id: 3, auteur: "Sarah", contenu: "Parfait, on peut faire le design d’abord.", heure: "18:44", moi: false },
  ]);

  /**
   * ici je vide les messages
   * avant chaque action
   */
  function viderMessages() {
    setErreur("");
    setMessage("");
  }

//Animation Chargement
  function Chargement() {
  return <Spinner animation="border" />;
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
      await supprimerNotification(notification.id);
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

  async function soumettreCreationConversation(e: FormEvent<HTMLFormElement>) {
  e.preventDefault();
  viderMessages();

  if (!id) {
    setErreur(ERREUR_ID_ETUDIANT_INVALIDE);
    return;
  }

  if (nomUtilisateurConversation.trim() === "") {
    setErreur(ERREUR_NOM_UTILISATEUR_CONVERSATION_OBLIGATOIRE);
    return;
  }

  try {
    await creerConversationPrivee(
      id,
      `Conversation avec ${nomUtilisateurConversation.trim()}`
    );

    setNomUtilisateurConversation("");
    setMessage(MESSAGE_CONVERSATION_CREEE);
  } catch (e: any) {
    setErreur(retournerErreur(e, ERREUR_IMPOSSIBLE_CREER_CONVERSATION));
  }
}

  function envoyerMessageDemo() {
    if (messageTexte.trim() === "") return;

    setMessagesDemo((anciens) => [
      ...anciens,
      {
        id: Date.now(),
        auteur: "Moi",
        contenu: messageTexte.trim(),
        heure: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        moi: true,
      },
    ]);

    setMessageTexte("");
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
    return (
      <div className="container-fluid p-4">
        {Chargement()}
      </div>
    );
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

            <div
        className="card p-4 shadow-sm mb-4"
        style={{ maxWidth: LARGEUR_CARTE }}
      >
        <h4 className="mb-3">{TITRE_CREER_CONVERSATION}</h4>

        <form onSubmit={soumettreCreationConversation}>
          <div className="mb-3">
            <label className="form-label">
              {LABEL_NOM_UTILISATEUR_CONVERSATION}
            </label>
            <input
              type="text"
              className="form-control"
              value={nomUtilisateurConversation}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setNomUtilisateurConversation(e.target.value)
              }
              placeholder={PLACEHOLDER_NOM_UTILISATEUR_CONVERSATION}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            {BOUTON_CREER_CONVERSATION}
          </button>
        </form>
      </div>


      <h4 className="mb-3">{TITRE_MESSAGERIE}</h4>

<div className="row g-4 mb-5">
  {/* colonne gauche : liste conversations */}
  <div className="col-lg-4">
    <div
      className="card border-0 shadow-sm h-100"
      style={{ borderRadius: "20px", overflow: "hidden" }}
    >
      <div className="p-3 border-bottom bg-light">
        <h5 className="mb-0">{SOUS_TITRE_CONVERSATIONS}</h5>
      </div>

      <div className="p-2">
        {[
          { nom: "Projet équipe", membres: 3, actif: true },
          { nom: "Frontend UI", membres: 4, actif: false },
          { nom: "Discussion générale", membres: 6, actif: false },
        ].map((conv, index) => (
          <button
            key={index}
            type="button"
            onClick={() => setConversationSelectionnee(conv.nom)}
            className={`w-100 text-start border-0 mb-2 p-3 ${
              conversationSelectionnee === conv.nom ? "bg-primary text-white" : "bg-white"
            }`}
            style={{
              borderRadius: "16px",
              transition: "0.2s",
              boxShadow:
                conversationSelectionnee === conv.nom
                  ? "0 8px 20px rgba(13, 110, 253, 0.25)"
                  : "0 2px 10px rgba(0,0,0,0.05)",
            }}
          >
            <div className="fw-semibold">{conv.nom}</div>
            <small className={conversationSelectionnee === conv.nom ? "text-white" : "text-muted"}>
              {conv.membres} {TEXTE_PARTICIPANTS}
            </small>
          </button>
        ))}
      </div>
    </div>
  </div>

  {/* colonne droite : conversation active */}
  <div className="col-lg-8">
    <div
      className="card border-0 shadow-sm"
      style={{ borderRadius: "20px", overflow: "hidden", minHeight: "520px" }}
    >
      {/* header */}
      <div className="d-flex justify-content-between align-items-center p-3 border-bottom bg-white">
        <div>
          <h5 className="mb-1">{conversationSelectionnee}</h5>
          <small className="text-muted">3 participants</small>
        </div>

        <div className="d-flex align-items-center gap-2">
          <span className="badge rounded-pill text-bg-light px-3 py-2">
            En ligne
          </span>
        </div>
      </div>

      {/* messages */}
      <div
        className="p-3 d-flex flex-column"
        style={{
          background: "linear-gradient(180deg, #f8f9fa 0%, #eef2f7 100%)",
          flex: 1,
          minHeight: "360px",
          maxHeight: "360px",
          overflowY: "auto",
        }}
      >
        {messagesDemo.map((msg) => (
          <div
            key={msg.id}
            className={`d-flex mb-3 ${msg.moi ? "justify-content-end" : "justify-content-start"}`}
          >
          <div
              style={{
                maxWidth: "75%",
                background: msg.moi ? "#0d6efd" : "#ffffff",
                color: msg.moi ? "white" : "#212529",
                padding: "12px 14px",
                borderRadius: msg.moi
                  ? "18px 18px 4px 18px"
                  : "18px 18px 18px 4px",
                boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
              }}
            >
              {!msg.moi ? (
                <div className="fw-semibold mb-1" style={{ fontSize: "0.9rem" }}>
                  {msg.auteur}
                </div>
              ) : null}

              <div>{msg.contenu}</div>

              <div
                className="mt-1 text-end"
                style={{
                  fontSize: "0.75rem",
                  opacity: 0.8,
                }}
              >
                {msg.heure}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* input */}
      <div className="p-3 border-top bg-white">
        <div className="d-flex gap-2">
          <input
            type="text"
            className="form-control"
            value={messageTexte}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setMessageTexte(e.target.value)
            }
            placeholder={PLACEHOLDER_MESSAGE}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                envoyerMessageDemo();
              }
            }}
            style={{
              borderRadius: "14px",
              padding: "12px 14px",
              border: "1px solid #dee2e6",
            }}
          />

          <button
            type="button"
            className="btn btn-primary px-4"
            onClick={envoyerMessageDemo}
            style={{
              borderRadius: "14px",
              fontWeight: 600,
            }}
          >
            {BOUTON_ENVOYER}
          </button>
        </div>
      </div>
    </div>
  </div>
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