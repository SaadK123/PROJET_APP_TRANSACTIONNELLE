"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import Spinner from "react-bootstrap/Spinner";

import { API } from "@/Api";
import { retournerErreur } from "@/app/attraperErreur";
import { GoToConversations } from "@/app/ChangerPage";
import {
  RequeteInvitationDTOTypeEnum,
  RetourConversationDTO,
  SucessDTO,
} from "@/src/api/generated";

/* erreurs */
const ERREUR_SERVEUR = "Erreur serveur";
const ERREUR_IMPOSSIBLE_CHARGER_CONVERSATION =
  "Impossible de charger la conversation";
const ERREUR_IMPOSSIBLE_ENVOYER_MESSAGE = "Impossible denvoyer le message";
const ERREUR_IMPOSSIBLE_ENVOYER_INVITATION =
  "Impossible denvoyer linvitation";
const ERREUR_IMPOSSIBLE_QUITTER_CONVERSATION =
  "Impossible de quitter la conversation";
const ERREUR_IMPOSSIBLE_SUPPRIMER_CONVERSATION =
  "Impossible de supprimer la conversation";
const ERREUR_IMPOSSIBLE_RETIRER_ETUDIANT =
  "Impossible de retirer letudiant";
const ERREUR_NOM_UTILISATEUR_OBLIGATOIRE =
  "Le nom utilisateur est obligatoire";

/* succes */
const MESSAGE_INVITATION_ENVOYEE = "Invitation envoyee";
const MESSAGE_ETUDIANT_RETIRE = "Etudiant retire de la conversation";

/* titres */
const TITRE_CHARGEMENT = "Chargement...";
const TITRE_CONVERSATION_INTROUVABLE = "Conversation introuvable";
const TITRE_INVITER_ETUDIANT = "Inviter un etudiant";
const TITRE_RETIRER_ETUDIANT = "Retirer un etudiant";
const TITRE_MESSAGES = "Messages";
const TITRE_AUCUN_MESSAGE = "Aucun message";

/* boutons */
const BOUTON_RETOUR_CONVERSATIONS = "Retour aux conversations";
const BOUTON_RAFRAICHIR = "Rafraichir";
const BOUTON_QUITTER = "Quitter";
const BOUTON_SUPPRIMER = "Supprimer";
const BOUTON_INVITER = "Inviter";
const BOUTON_RETIRER = "Retirer";
const BOUTON_ENVOYER = "Envoyer";

/* labels */
const LABEL_NOM_UTILISATEUR = "Nom utilisateur";
const LABEL_PARTICIPANTS = "Participants : ";
const LABEL_MESSAGES = "Messages : ";
const LABEL_GROUPE = "Conversation de groupe";
const LABEL_PRIVEE = "Conversation privee";
const PLACEHOLDER_MESSAGE = "Ecris ton message...";

export default function ConversationDetailPage() {
  const router = useRouter();

  const params = useParams<{
    id: string;
    idConversation: string;
  }>();

  const id = params.id;
  const idConversation = params.idConversation;

  const [conversation, setConversation] = useState<RetourConversationDTO | null>(
    null,
  );

  const [messageTexte, setMessageTexte] = useState<string>("");
  const [nomUtilisateurInvitation, setNomUtilisateurInvitation] =
    useState<string>("");
  const [nomUtilisateurVirer, setNomUtilisateurVirer] = useState<string>("");

  const [chargement, setChargement] = useState<boolean>(true);
  const [erreur, setErreur] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const estChef = conversation?.chefId === id;
  const estGroupe = conversation?.estConversationGroupe === true;

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

  function obtenirClasseEntete() {
    if (estGroupe) {
      return "card p-3 shadow-sm mb-4 border border-primary bg-primary-subtle";
    }

    return "card p-3 shadow-sm mb-4 border border-success bg-success-subtle";
  }

  function obtenirClasseBadge() {
    if (estGroupe) {
      return "badge text-bg-primary";
    }

    return "badge text-bg-success";
  }

  async function chargerConversation() {
    setChargement(true);
    viderMessages();

    try {
      const conversationChargee = await API.getConversationById({
        id: idConversation,
      });

      setConversation(conversationChargee);
    } catch (e) {
      setConversation(null);
      setErreur(retournerErreur(e, ERREUR_IMPOSSIBLE_CHARGER_CONVERSATION));
    }

    setChargement(false);
  }

  useEffect(() => {
    if (idConversation) {
      chargerConversation();
    }
  }, [idConversation]);

  async function envoyerMessageUI() {
    viderMessages();

    if (messageTexte.trim() == "") {
      return;
    }

    try {
      const resultat = await API.envoyerMessage({
        envoyerMessageDTO: {
          conversationId: idConversation,
          message: {
            envoyeurId: id,
            contenu: messageTexte.trim(),
          },
        },
      });

      validerResultat(resultat, ERREUR_IMPOSSIBLE_ENVOYER_MESSAGE);

      setMessageTexte("");
      await chargerConversation();
    } catch (e) {
      setErreur(retournerErreur(e, ERREUR_IMPOSSIBLE_ENVOYER_MESSAGE));
    }
  }

  async function inviterEtudiantUI() {
    viderMessages();

    if (nomUtilisateurInvitation.trim() == "") {
      setErreur(ERREUR_NOM_UTILISATEUR_OBLIGATOIRE);
      return;
    }

    try {
      const resultat = await API.envoyerInvitationConversation({
        requeteInvitationDTO: {
          etudiantNomUtilisateur: nomUtilisateurInvitation.trim(),
          message: `Invitation a rejoindre la conversation ${conversation?.nom}`,
          type: RequeteInvitationDTOTypeEnum.NouvelleConversationInvitation,
          titre: "Invitation conversation",
          destination: idConversation,
          envoyeurId: id,
        },
      });

      validerResultat(resultat, ERREUR_IMPOSSIBLE_ENVOYER_INVITATION);

      setNomUtilisateurInvitation("");
      setMessage(MESSAGE_INVITATION_ENVOYEE);
    } catch (e) {
      setErreur(retournerErreur(e, ERREUR_IMPOSSIBLE_ENVOYER_INVITATION));
    }
  }

  async function quitterConversationUI() {
    viderMessages();

    try {
      const resultat = await API.quitterConversation({
        quitterGroupeDTO: {
          idGroupe: idConversation,
          idEtudiant: id,
        },
      });

      validerResultat(resultat, ERREUR_IMPOSSIBLE_QUITTER_CONVERSATION);

      GoToConversations(router, id);
    } catch (e) {
      setErreur(retournerErreur(e, ERREUR_IMPOSSIBLE_QUITTER_CONVERSATION));
    }
  }

  async function supprimerConversationUI() {
    viderMessages();

    try {
      const resultat = await API.supprimerConversation({
        id: idConversation,
      });

      validerResultat(resultat, ERREUR_IMPOSSIBLE_SUPPRIMER_CONVERSATION);

      GoToConversations(router, id);
    } catch (e) {
      setErreur(retournerErreur(e, ERREUR_IMPOSSIBLE_SUPPRIMER_CONVERSATION));
    }
  }

  async function virerEtudiantUI() {
    viderMessages();

    if (nomUtilisateurVirer.trim() == "") {
      setErreur(ERREUR_NOM_UTILISATEUR_OBLIGATOIRE);
      return;
    }

    try {
      const resultat = await API.virerEtudiantConversation({
        virerEtudiantDTO: {
          nomUtilisateur: nomUtilisateurVirer.trim(),
          etudiantQuiVireId: id,
          groupid: idConversation,
        },
      });

      validerResultat(resultat, ERREUR_IMPOSSIBLE_RETIRER_ETUDIANT);

      setNomUtilisateurVirer("");
      setMessage(MESSAGE_ETUDIANT_RETIRE);
      await chargerConversation();
    } catch (e) {
      setErreur(retournerErreur(e, ERREUR_IMPOSSIBLE_RETIRER_ETUDIANT));
    }
  }

  function formaterHeure(dateTexte?: string) {
    if (!dateTexte) {
      return "";
    }

    const date = new Date(dateTexte);

    if (Number.isNaN(date.getTime())) {
      return dateTexte;
    }

    return date.toLocaleTimeString("fr-CA", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  if (chargement) {
    return (
      <div className="container mt-4">
        <p>{TITRE_CHARGEMENT}</p>
        <Chargement />
      </div>
    );
  }

  if (conversation == null) {
    return (
      <div className="container mt-4">
        <button
          className="btn btn-secondary mb-3"
          onClick={() => GoToConversations(router, id)}
        >
          {BOUTON_RETOUR_CONVERSATIONS}
        </button>

        <div className="alert alert-danger">
          {erreur || TITRE_CONVERSATION_INTROUVABLE}
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="d-flex flex-wrap gap-2 mb-4">
        <button
          className="btn btn-secondary"
          onClick={() => GoToConversations(router, id)}
        >
          {BOUTON_RETOUR_CONVERSATIONS}
        </button>

        <button className="btn btn-outline-secondary" onClick={chargerConversation}>
          {BOUTON_RAFRAICHIR}
        </button>

        {!estGroupe ? (
          <button className="btn btn-warning" onClick={quitterConversationUI}>
            {BOUTON_QUITTER}
          </button>
        ) : null}

        {estChef ? (
          <button className="btn btn-danger" onClick={supprimerConversationUI}>
            {BOUTON_SUPPRIMER}
          </button>
        ) : null}
      </div>

      {message != "" ? <div className="alert alert-success">{message}</div> : null}
      {erreur != "" ? <div className="alert alert-danger">{erreur}</div> : null}

      <div className={obtenirClasseEntete()}>
        <div className="d-flex justify-content-between mb-2">
          <h2 className="mb-1">{conversation.nom}</h2>

          <span className={obtenirClasseBadge()}>
            {estGroupe ? LABEL_GROUPE : LABEL_PRIVEE}
          </span>
        </div>

        <p className="mb-1">
          {LABEL_PARTICIPANTS}
          {conversation.participantsIds?.length ?? 0}
        </p>

        <p className="mb-0">
          {LABEL_MESSAGES}
          {conversation.messages?.length ?? 0}
        </p>
      </div>

      {!estGroupe && estChef ? (
        <div className="card p-3 shadow-sm mb-4">
          <h4 className="mb-3">{TITRE_INVITER_ETUDIANT}</h4>

          <div className="d-flex gap-2">
            <input
              type="text"
              className="form-control"
              placeholder={LABEL_NOM_UTILISATEUR}
              value={nomUtilisateurInvitation}
              onChange={(e) => setNomUtilisateurInvitation(e.target.value)}
            />

            <button className="btn btn-primary" onClick={inviterEtudiantUI}>
              {BOUTON_INVITER}
            </button>
          </div>
        </div>
      ) : null}

      {!estGroupe && estChef ? (
        <div className="card p-3 shadow-sm mb-4">
          <h4 className="mb-3">{TITRE_RETIRER_ETUDIANT}</h4>

          <div className="d-flex gap-2">
            <input
              type="text"
              className="form-control"
              placeholder={LABEL_NOM_UTILISATEUR}
              value={nomUtilisateurVirer}
              onChange={(e) => setNomUtilisateurVirer(e.target.value)}
            />

            <button className="btn btn-danger" onClick={virerEtudiantUI}>
              {BOUTON_RETIRER}
            </button>
          </div>
        </div>
      ) : null}

      <div className="card p-3 shadow-sm">
        <h4 className="mb-3">{TITRE_MESSAGES}</h4>

        <div className="border rounded p-3 mb-3 bg-light">
          {(conversation.messages?.length ?? 0) == 0 ? (
            <p className="text-muted">{TITRE_AUCUN_MESSAGE}</p>
          ) : null}

          {conversation.messages?.map((msg, index) => {
            const estMoi = msg.envoyeurId === id;
            const cleMessage =
              msg.id || `${msg.envoyeurId}-${msg.tempsEnvoi}-${index}`;

            return (
              <div
                key={cleMessage}
                className={`d-flex mb-3 ${
                  estMoi ? "justify-content-end" : "justify-content-start"
                }`}
              >
                <div
                  className={`p-2 rounded ${
                    estMoi ? "bg-primary text-white" : "bg-white border"
                  }`}
                >
                  {!estMoi ? (
                    <div className="fw-bold small">
                      {msg.envoyeurId?.substring(0, 8) ?? "inconnu"}
                    </div>
                  ) : null}

                  <div>{msg.contenu}</div>

                  <div className="small text-end mt-1">
                    {formaterHeure(msg.tempsEnvoi)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="d-flex gap-2">
          <input
            type="text"
            className="form-control"
            placeholder={PLACEHOLDER_MESSAGE}
            value={messageTexte}
            onChange={(e) => setMessageTexte(e.target.value)}
            onKeyDown={(e) => {
              if (e.key == "Enter") {
                e.preventDefault();
                envoyerMessageUI();
              }
            }}
          />

          <button className="btn btn-primary" onClick={envoyerMessageUI}>
            {BOUTON_ENVOYER}
          </button>
        </div>
      </div>
    </div>
  );
}