"use client";

import { useEffect, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { useParams, useRouter } from "next/navigation";

import { API } from "../../../Api";
import { retournerErreur } from "@/app/attraperErreur";

import Spinner from "react-bootstrap/Spinner";

import {
  GotoCalendar,
  GotoCalendarGroupe,
  GotoHomePage,
  GotoLogin,
  GotoParametres,
  GoToConversations,
} from "@/app/ChangerPage";

import {
  RetourEtudiantDTO,
  RetourGroupeDTO,
  RetourInvitationDTO,
} from "@/src/api/generated";
/* erreurs */
const ERREUR_SERVEUR = "Erreur serveur";
const ERREUR_IMPOSSIBLE_CHARGER_CLIENT = "Impossible de charger le client";
const ERREUR_IMPOSSIBLE_CHARGER_GROUPES = "Impossible de charger les groupes";
const ERREUR_IMPOSSIBLE_SUPPRIMER_NOTIFICATION =
  "La notification na pas pu etre supprimer";
const ERREUR_IMPOSSIBLE_ACCEPTER_INVITATION =
  "Impossible daccepter linvitation";
const ERREUR_IMPOSSIBLE_CREER_GROUPE = "Impossible de creer le groupe";
const ERREUR_ID_ETUDIANT_INVALIDE = "Id etudiant invalide";
const ERREUR_NOM_GROUPE_OBLIGATOIRE = "Le nom du groupe est obligatoire";
const ERREUR_NOM_UTILISATEUR_CONVERSATION_OBLIGATOIRE =
  "Le nom utilisateur est obligatoire";
const ERREUR_IMPOSSIBLE_CREER_CONVERSATION =
  "Impossible de creer la conversation";

/* succes */
const MESSAGE_INVITATION_ACCEPTEE = "Invitation acceptée";
const MESSAGE_GROUPE_CREE = "Groupe crée avec succes";
const MESSAGE_CONVERSATION_CREEE = "Conversation crée avec succes";

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
const BOUTON_MESSAGERIE = "Messagerie";

/* labels */
const LABEL_NOM_UTILISATEUR = "Nom d'utilisateur :";
const LABEL_COURRIEL = "Courriel :";
const LABEL_ECOLE = "École :";
const LABEL_NOM_GROUPE = "Nom du groupe";
const LABEL_RECHERCHE_GROUPE = "Rechercher un groupe par son nom...";
const LABEL_CHEF = "Chef :";
const LABEL_NOMBRE_PERSONNES = "Nombre de personnes :";
const LABEL_NOM_UTILISATEUR_CONVERSATION = "Nom utilisateur";

/* placeholder */
const PLACEHOLDER_NOM_GROUPE = "Entre le nom du groupe";
const PLACEHOLDER_NOM_UTILISATEUR_CONVERSATION = "Entre le nom utilisateur";

/* style */
const LARGEUR_CARTE = "500px";
const LARGEUR_RECHERCHE = "400px";

export default function Dashboard() {
  const params = useParams<{ id: string }>();
  const id = params.id;
  const router = useRouter();

  const [load, setLoad] = useState<boolean>(true);
  const [erreur, setErreur] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const [etudiant, setEtudiant] = useState<RetourEtudiantDTO | null>(null);
  const [groupes, setGroupes] = useState<RetourGroupeDTO[]>([]);
  const [notifications, setNotifications] = useState<RetourInvitationDTO[]>([]);

  const [rechercheGroupe, setRechercheGroupe] = useState<string>("");
  const [nomNouveauGroupe, setNomNouveauGroupe] = useState<string>("");
  const [nomUtilisateurConversation, setNomUtilisateurConversation] =
    useState<string>("");

  function viderMessages() {
    setErreur("");
    setMessage("");
  }

  function Chargement() {
    return <Spinner animation="border" />;
  }

  async function chargerEtudiant() {
    try {
      if (!id) {
        setEtudiant(null);
        setErreur(ERREUR_IMPOSSIBLE_CHARGER_CLIENT);
        return;
      }

      const etudiantCharge = await API.getEtudiantById({ id });
      setEtudiant(etudiantCharge);
    } catch (e: any) {
      setEtudiant(null);
      setErreur(retournerErreur(e, ERREUR_SERVEUR));
    }
  }

  async function chargerGroupes() {
    try {
      if (!id) {
        setGroupes([]);
        setErreur(ERREUR_IMPOSSIBLE_CHARGER_CLIENT);
        return;
      }

      const groupesCharges = await API.getGroupsFromEtudiant({
        idEtudiant: id,
      });

      setGroupes(groupesCharges ?? []);
    } catch (e: any) {
      setGroupes([]);
      setErreur(retournerErreur(e, ERREUR_IMPOSSIBLE_CHARGER_GROUPES));
    }
  }

  async function chargerNotifications() {
    try {
      if (!id) {
        setNotifications([]);
        return;
      }

      const notificationsChargees =
        await API.getAllNotificationsFromEtudiant({
          idEtudiant: id,
        });

      console.log("NOTIFICATIONS OPENAPI:", notificationsChargees);

      setNotifications(notificationsChargees ?? []);
    } catch (e: any) {
      setNotifications([]);
      setErreur(retournerErreur(e, ERREUR_SERVEUR));
    }
  }

  async function chargerDashboard() {
    setLoad(true);
    viderMessages();

    if (!id) {
      setEtudiant(null);
      setGroupes([]);
      setNotifications([]);
      setErreur(ERREUR_IMPOSSIBLE_CHARGER_CLIENT);
      setLoad(false);
      return;
    }

    await chargerEtudiant();
    await chargerGroupes();
    await chargerNotifications();

    setLoad(false);
  }

  useEffect(() => {
    chargerDashboard();
  }, [id]);

  async function supprimerNotif(notificationId: string) {
    viderMessages();

    try {
      await API.deleteNotification({ idNotification: notificationId });
      await chargerNotifications();
    } catch (e: any) {
      setErreur(retournerErreur(e, ERREUR_IMPOSSIBLE_SUPPRIMER_NOTIFICATION));
    }
  }

  async function accepterInvitation(notification: RetourInvitationDTO) {
    viderMessages();

    console.log("NOTIFICATION COMPLETE:", notification);

    if (!notification.id) {
      setErreur("Id notification manquant");
      return;
    }

    if (!notification.destination) {
      setErreur("Destination invitation manquante");
      return;
    }

    if (!notification.etudiantNomUtilisateur) {
      setErreur("Nom utilisateur manquant");
      return;
    }

    try {
      const retourInvitationDTO: RetourInvitationDTO = {
        id: notification.id,
        etudiantNomUtilisateur: notification.etudiantNomUtilisateur,
        message: notification.message ?? "",
        type: notification.type,
        destination: notification.destination,
        titre: notification.titre ?? "",
        envoyeurId: notification.envoyeurId,
        typeInvitation: notification.typeInvitation,
      };

      const estInvitationGroupe =
        notification.type === "NOUVELLE_GROUPE_INVITATION" ||
        notification.typeInvitation === "GROUPE";

      const estInvitationConversation =
        notification.type === "NOUVELLE_CONVERSATION_INVITATION" ||
        notification.typeInvitation === "CONVERSATION";

      if (estInvitationGroupe) {
        await API.ajouterEtudiantDansGroupe({
          retourInvitationDTO,
        });
      } else if (estInvitationConversation) {
        await API.rejoindreConversation({
          reponseInvitationGroupe: {
            retourInvitationDTO,
          },
        });
      } else {
        setErreur("Type dinvitation inconnu");
        return;
      }

      /*
        Petit filet de sécurité:
        Si le backend ne supprime pas automatiquement la notification,
        on la supprime ici après acceptation.
      */
      try {
        await API.deleteNotification({ idNotification: notification.id });
      } catch {
        // ignore si deja supprimee par le backend
      }

      await chargerEtudiant();
      await chargerGroupes();
      await chargerNotifications();

      setMessage(MESSAGE_INVITATION_ACCEPTEE);
    } catch (e: any) {
      console.error("ERREUR ACCEPT INVITATION COMPLETE:", e);
      setErreur(retournerErreur(e, ERREUR_IMPOSSIBLE_ACCEPTER_INVITATION));
    }
  }

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
      await API.createGroup({
        creationDeGroupeDTO: {
          chefID: id,
          nomGroup: nomNouveauGroupe.trim(),
        },
      });

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
      await API.creerConversation({
        creationConversationDTO: {
          chefId: id,
          nomConversation: `Conversation avec ${nomUtilisateurConversation.trim()}`,
        },
      });

      setNomUtilisateurConversation("");
      setMessage(MESSAGE_CONVERSATION_CREEE);
    } catch (e: any) {
      setErreur(retournerErreur(e, ERREUR_IMPOSSIBLE_CREER_CONVERSATION));
    }
  }

  const groupesFiltres: RetourGroupeDTO[] = groupes.filter((groupe) =>
    (groupe.nomGroupe ?? "")
      .toLowerCase()
      .includes(rechercheGroupe.toLowerCase()),
  );

  if (load) {
    return (
      <div className="container-fluid p-4">
        <p>{TITRE_CHARGEMENT}</p>
        {Chargement()}
      </div>
    );
  }

  if (erreur !== "" && etudiant == null) {
    return <p>{erreur}</p>;
  }

  if (etudiant == null) {
    return <p>{ERREUR_IMPOSSIBLE_CHARGER_CLIENT}</p>;
  }

  return (
    <div className="container mt-4">
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

        <button
          className="btn btn-secondary"
          onClick={() => GoToConversations(router, id)}
        >
          {BOUTON_MESSAGERIE}
        </button>
      </div>

      {message !== "" ? (
        <div className="alert alert-success">{message}</div>
      ) : null}

      {erreur !== "" ? (
        <div className="alert alert-danger">{erreur}</div>
      ) : null}

      <div
        className="card p-4 shadow-sm mb-4"
        style={{ maxWidth: LARGEUR_CARTE }}
      >
        <h2 className="mb-3">
          {etudiant.prenom} {etudiant.nom}
        </h2>

        <hr />

        <div className="mb-2">
          <b>{LABEL_NOM_UTILISATEUR}</b> {etudiant.nomUtilisateur}
        </div>

        <div className="mb-2">
          <b>{LABEL_COURRIEL}</b> {etudiant.email}
        </div>

        <div className="mb-2">
          <b>{LABEL_ECOLE}</b>{" "}
          {(etudiant as RetourEtudiantDTO & { ecole?: string }).ecole ?? ""}
        </div>
      </div>

      <div
        className="card p-4 shadow-sm mb-4"
        style={{ maxWidth: LARGEUR_CARTE }}
      >
        <h4 className="mb-3">{TITRE_CREER_GROUPE}</h4>

        <form onSubmit={soumettreCreationGroupe}>
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

      <h4 className="mb-3">{TITRE_MES_GROUPES}</h4>

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

      {groupesFiltres.length === 0 ? (
        <p>{TITRE_AUCUN_GROUPE}</p>
      ) : (
        <div className="row">
          {groupesFiltres.map((groupe) => (
            <div key={groupe.id} className="col-md-4 mb-3">
              <div className="card p-3 shadow-sm">
                <h5 className="mb-2">{groupe.nomGroupe}</h5>

                <div>
                  <b>{LABEL_CHEF}</b> {groupe.chef?.prenom} {groupe.chef?.nom}
                </div>

                <div>
                  <b>{LABEL_NOMBRE_PERSONNES}</b>{" "}
                  {groupe.etudiants?.length ?? 0}
                </div>

                <button
                  className="btn btn-primary btn-sm mt-2"
                  onClick={() => GotoCalendarGroupe(router, id, groupe.id!)}
                >
                  {BOUTON_VOIR_TOUT}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <h4 className="mt-5 mb-3">{TITRE_NOTIFICATIONS}</h4>

      {notifications.length === 0 ? (
        <p>{TITRE_AUCUNE_NOTIFICATION}</p>
      ) : (
        <div className="row">
          {notifications.map((notification) => {
            const estInvitation =
              notification.type === "NOUVELLE_GROUPE_INVITATION" ||
              notification.type === "NOUVELLE_CONVERSATION_INVITATION" ||
              notification.typeInvitation === "GROUPE" ||
              notification.typeInvitation === "CONVERSATION";

            const tempsCreation = (notification as any).tempsCreation;

            return (
              <div key={notification.id} className="col-md-4 mb-3">
                <div className="card p-3 shadow-sm">
                  <h6>{notification.titre}</h6>

                  <p>{notification.message}</p>

                  {tempsCreation ? (
                    <p>{new Date(tempsCreation).toLocaleString()}</p>
                  ) : null}

                  {notification.typeInvitation ? (
                    <p>
                      <b>Type :</b> {notification.typeInvitation}
                    </p>
                  ) : null}

                  {estInvitation ? (
                    <button
                      className="btn btn-success btn-sm me-2"
                      onClick={() => accepterInvitation(notification)}
                    >
                      {BOUTON_ACCEPTER_INVITATION}
                    </button>
                  ) : null}

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => supprimerNotif(notification.id!)}
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