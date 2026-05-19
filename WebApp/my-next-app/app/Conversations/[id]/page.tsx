"use client";

import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { useParams, useRouter } from "next/navigation";

import Spinner from "react-bootstrap/Spinner";

import { API } from "@/Api";
import { retournerErreur } from "@/app/attraperErreur";
import { GotoDashboard, GoToConversation } from "@/app/ChangerPage";
import type { RetourConversationDTO, SucessDTO } from "@/src/api/generated";

/* erreurs */
const ERREUR_SERVEUR = "Erreur serveur";
const ERREUR_IMPOSSIBLE_CHARGER_CONVERSATIONS =
  "Impossible de charger les conversations";
const ERREUR_IMPOSSIBLE_CREER_CONVERSATION =
  "Impossible de creer la conversation";
const ERREUR_NOM_CONVERSATION_OBLIGATOIRE =
  "Le nom de la conversation est obligatoire";

/* succes */
const MESSAGE_CONVERSATION_CREEE = "Conversation cree avec succes";

/* titres */
const TITRE_PAGE = "Messagerie";
const TITRE_CHARGEMENT = "Chargement...";
const TITRE_CREER_CONVERSATION = "Creer une conversation";
const TITRE_MES_CONVERSATIONS = "Mes conversations";
const TITRE_AUCUNE_CONVERSATION = "Aucune conversation";

/* boutons */
const BOUTON_RETOUR_DASHBOARD = "Retour au dashboard";
const BOUTON_RAFRAICHIR = "Rafraichir";
const BOUTON_CREER = "Creer";
const BOUTON_OUVRIR = "Ouvrir";

/* labels */
const LABEL_NOM_CONVERSATION = "Nom de la conversation";
const LABEL_PARTICIPANTS = "Participants : ";
const LABEL_MESSAGES = "Messages : ";
const LABEL_GROUPE = "Groupe";
const LABEL_PRIVEE = "Privee";

export default function ListeConversationsPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const id = params.id;

  const [conversations, setConversations] = useState<RetourConversationDTO[]>([]);
  const [nomConversation, setNomConversation] = useState<string>("");

  const [chargement, setChargement] = useState<boolean>(true);
  const [erreur, setErreur] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  function viderMessages() {
    setErreur("");
    setMessage("");
  }

  function Chargement() {
    return <Spinner animation="border" />;
  }

  function validerResultat(resultat: SucessDTO, messageErreur: string) {
    if (resultat.success === false) {
      throw new Error(resultat.message || messageErreur);
    }
  }

  function obtenirClasseCarte(estGroupe: boolean) {
    if (estGroupe) {
      return "card h-100 p-3 shadow-sm border border-primary bg-primary-subtle";
    }

    return "card h-100 p-3 shadow-sm border border-success bg-success-subtle";
  }

  function obtenirClasseBadge(estGroupe: boolean) {
    if (estGroupe) {
      return "badge text-bg-primary";
    }

    return "badge text-bg-success";
  }

  async function chargerConversations() {
    setChargement(true);
    viderMessages();

    try {
      const conversationsChargees = await API.getConversationsParEtudiant({
        idEtudiant: id,
      });

      setConversations(conversationsChargees);
    } catch (e) {
      setConversations([]);
      setErreur(retournerErreur(e, ERREUR_IMPOSSIBLE_CHARGER_CONVERSATIONS));
    }

    setChargement(false);
  }

  useEffect(() => {
    if (id) {
      chargerConversations();
    }
  }, [id]);

  async function soumettreCreationConversation(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    viderMessages();

    if (nomConversation.trim() == "") {
      setErreur(ERREUR_NOM_CONVERSATION_OBLIGATOIRE);
      return;
    }

    try {
      const resultat = await API.creerConversation({
        creationConversationDTO: {
          chefId: id,
          nomConversation: nomConversation.trim(),
        },
      });

      validerResultat(resultat, ERREUR_IMPOSSIBLE_CREER_CONVERSATION);

      setNomConversation("");
      setMessage(MESSAGE_CONVERSATION_CREEE);
      await chargerConversations();
    } catch (e) {
      setErreur(retournerErreur(e, ERREUR_IMPOSSIBLE_CREER_CONVERSATION));
    }
  }

  if (chargement) {
    return (
      <div className="container mt-4">
        <p>{TITRE_CHARGEMENT}</p>
        <Chargement />
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="d-flex flex-wrap gap-2 mb-4">
        <button
          className="btn btn-secondary"
          onClick={() => GotoDashboard(router, id)}
        >
          {BOUTON_RETOUR_DASHBOARD}
        </button>

        <button className="btn btn-outline-secondary" onClick={chargerConversations}>
          {BOUTON_RAFRAICHIR}
        </button>
      </div>

      <h2 className="mb-4">{TITRE_PAGE}</h2>

      {message != "" ? <div className="alert alert-success">{message}</div> : null}
      {erreur != "" ? <div className="alert alert-danger">{erreur}</div> : null}

      <div className="card p-3 shadow-sm mb-4">
        <h4 className="mb-3">{TITRE_CREER_CONVERSATION}</h4>

        <form onSubmit={soumettreCreationConversation}>
          <div className="row g-2">
            <div className="col-md-9">
              <input
                type="text"
                className="form-control"
                placeholder={LABEL_NOM_CONVERSATION}
                value={nomConversation}
                onChange={(e) => setNomConversation(e.target.value)}
              />
            </div>

            <div className="col-md-3">
              <button className="btn btn-primary w-100" type="submit">
                {BOUTON_CREER}
              </button>
            </div>
          </div>
        </form>
      </div>

      <h4 className="mb-3">{TITRE_MES_CONVERSATIONS}</h4>

      {conversations.length == 0 ? <p>{TITRE_AUCUNE_CONVERSATION}</p> : null}

      <div className="row">
        {conversations.map((conversation) => {
          const estGroupe = conversation.estConversationGroupe === true;

          return (
            <div key={conversation.id} className="col-md-4 mb-3">
              <div className={obtenirClasseCarte(estGroupe)}>
                <div className="d-flex justify-content-between mb-2">
                  <h5>{conversation.nom}</h5>

                  <span className={obtenirClasseBadge(estGroupe)}>
                    {estGroupe ? LABEL_GROUPE : LABEL_PRIVEE}
                  </span>
                </div>

                <p className="mb-1">
                  {LABEL_PARTICIPANTS}
                  {conversation.participantsIds?.length ?? 0}
                </p>

                <p className="mb-2">
                  {LABEL_MESSAGES}
                  {conversation.messages?.length ?? 0}
                </p>

                <button
                  className="btn btn-primary btn-sm"
                  disabled={!conversation.id}
                  onClick={() => GoToConversation(router, id, conversation.id!)}
                >
                  {BOUTON_OUVRIR}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}