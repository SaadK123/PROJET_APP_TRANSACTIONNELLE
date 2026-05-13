"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import {
  envoyerInvitationConversation,
  envoyerMessage,
  getConversationById,
  quitterConversation,
  supprimerConversation,
  virerEtudiantConversation,
} from "@/app/FetchMethodesConversations";

import type { Conversation } from "@/app/TypesObjets";

export default function ConversationDetailPage() {
  const router = useRouter();

  const { id, idConversation } = useParams<{
    id: string;
    idConversation: string;
  }>();

  const [conversation, setConversation] = useState<Conversation | null>(null);

  const [messageTexte, setMessageTexte] = useState("");
  const [nomUtilisateurInvitation, setNomUtilisateurInvitation] = useState("");
  const [nomUtilisateurVirer, setNomUtilisateurVirer] = useState("");

  const [erreur, setErreur] = useState("");
  const [message, setMessage] = useState("");
  const [chargement, setChargement] = useState(true);

  const estChef = conversation?.chef === id;

  async function chargerConversation() {
    try {
      setChargement(true);
      setErreur("");

      const data = await getConversationById(idConversation);
      setConversation(data);
    } catch (e: any) {
      setErreur(e.message || "Impossible de charger la conversation.");
    } finally {
      setChargement(false);
    }
  }

  useEffect(() => {
    chargerConversation();
  }, [idConversation]);

  async function envoyerMessageUI() {
    setErreur("");
    setMessage("");

    if (messageTexte.trim() === "") {
      return;
    }

    try {
      await envoyerMessage({
        idConversation,
        envoyeurId: id,
        contenu: messageTexte.trim(),
      });

      setMessageTexte("");
      await chargerConversation();
    } catch (e: any) {
      setErreur(e.message || "Impossible d'envoyer le message.");
    }
  }

  async function inviterEtudiantUI() {
    setErreur("");
    setMessage("");

    if (nomUtilisateurInvitation.trim() === "") {
      setErreur("Le nom utilisateur est obligatoire.");
      return;
    }

    try {
      await envoyerInvitationConversation({
        etudiantNomUtilisateur: nomUtilisateurInvitation.trim(),
        message: `Invitation à rejoindre la conversation ${conversation?.nom}`,
        type: "NOUVELLE_CONVERSATION_INVITATION",
        groupId: idConversation,
        titre: "Invitation conversation",
        envoyeurId: id,
      });

      setNomUtilisateurInvitation("");
      setMessage("Invitation envoyée.");
    } catch (e: any) {
      setErreur(e.message || "Impossible d'envoyer l'invitation.");
    }
  }

  async function quitterConversationUI() {
    setErreur("");
    setMessage("");

    try {
      await quitterConversation(idConversation, id);
      router.push(`/Conversations/${id}`);
    } catch (e: any) {
      setErreur(e.message || "Impossible de quitter la conversation.");
    }
  }

  async function supprimerConversationUI() {
    setErreur("");
    setMessage("");

    try {
      await supprimerConversation(idConversation);
      router.push(`/Conversations/${id}`);
    } catch (e: any) {
      setErreur(e.message || "Impossible de supprimer la conversation.");
    }
  }

  async function virerEtudiantUI() {
    setErreur("");
    setMessage("");

    if (nomUtilisateurVirer.trim() === "") {
      setErreur("Le nom utilisateur est obligatoire.");
      return;
    }

    try {
      await virerEtudiantConversation({
        nomUtilisateur: nomUtilisateurVirer.trim(),
        etudiantQuiVireId: id,
        groupid: idConversation,
      });

      setNomUtilisateurVirer("");
      setMessage("Étudiant retiré de la conversation.");
      await chargerConversation();
    } catch (e: any) {
      setErreur(e.message || "Impossible de retirer l'étudiant.");
    }
  }

  if (chargement) {
    return <div className="container mt-4">Chargement...</div>;
  }

  if (conversation === null) {
    return (
      <div className="container mt-4">
        <button
          className="btn btn-secondary mb-3"
          onClick={() => router.push(`/Conversations/${id}`)}
        >
          Retour
        </button>

        <div className="alert alert-danger">
          {erreur || "Conversation introuvable."}
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="d-flex flex-wrap gap-2 mb-4">
        <button
          className="btn btn-secondary"
          onClick={() => router.push(`/Conversations/${id}`)}
        >
          Retour aux conversations
        </button>

        <button className="btn btn-outline-secondary" onClick={chargerConversation}>
          Rafraîchir
        </button>

        {!conversation.estConversationGroupe ? (
          <button className="btn btn-warning" onClick={quitterConversationUI}>
            Quitter
          </button>
        ) : null}

        {estChef ? (
          <button className="btn btn-danger" onClick={supprimerConversationUI}>
            Supprimer
          </button>
        ) : null}
      </div>

      {message !== "" ? <div className="alert alert-success">{message}</div> : null}
      {erreur !== "" ? <div className="alert alert-danger">{erreur}</div> : null}

      <div className="card p-3 shadow-sm mb-4">
        <h2 className="mb-1">{conversation.nom}</h2>

        <p className="mb-1">
          Participants : {conversation.participants?.length ?? 0}
        </p>

        <p className="mb-0">
          Type :{" "}
          {conversation.estConversationGroupe
            ? "Conversation de groupe"
            : "Conversation privée"}
        </p>
      </div>

      {!conversation.estConversationGroupe && estChef ? (
        <div className="card p-3 shadow-sm mb-4">
          <h4 className="mb-3">Inviter un étudiant</h4>

          <div className="d-flex gap-2">
            <input
              type="text"
              className="form-control"
              placeholder="Nom utilisateur"
              value={nomUtilisateurInvitation}
              onChange={(e) => setNomUtilisateurInvitation(e.target.value)}
            />

            <button className="btn btn-primary" onClick={inviterEtudiantUI}>
              Inviter
            </button>
          </div>
        </div>
      ) : null}

      {!conversation.estConversationGroupe && estChef ? (
        <div className="card p-3 shadow-sm mb-4">
          <h4 className="mb-3">Retirer un étudiant</h4>

          <div className="d-flex gap-2">
            <input
              type="text"
              className="form-control"
              placeholder="Nom utilisateur"
              value={nomUtilisateurVirer}
              onChange={(e) => setNomUtilisateurVirer(e.target.value)}
            />

            <button className="btn btn-danger" onClick={virerEtudiantUI}>
              Retirer
            </button>
          </div>
        </div>
      ) : null}

      <div className="card p-3 shadow-sm">
        <h4 className="mb-3">Messages</h4>

        <div
          className="border rounded p-3 mb-3 bg-light"
          style={{ height: "400px", overflowY: "auto" }}
        >
          {(conversation.messages?.length ?? 0) === 0 ? (
            <p className="text-muted">Aucun message.</p>
          ) : null}

          {conversation.messages?.map((msg) => {
            const estMoi = msg.envoyeurId === id;

            return (
              <div
                key={msg.id}
                className={`d-flex mb-3 ${
                  estMoi ? "justify-content-end" : "justify-content-start"
                }`}
              >
                <div
                  className={`p-2 rounded ${
                    estMoi ? "bg-primary text-white" : "bg-white border"
                  }`}
                  style={{ maxWidth: "75%" }}
                >
                  {!estMoi ? (
                    <div className="fw-bold small">
                      {msg.envoyeurId.substring(0, 8)}
                    </div>
                  ) : null}

                  <div>{msg.contenu}</div>

                  <div className="small text-end mt-1">
                    {msg.tempsEnvoi
                      ? new Date(msg.tempsEnvoi).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : ""}
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
            placeholder="Écris ton message..."
            value={messageTexte}
            onChange={(e) => setMessageTexte(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                envoyerMessageUI();
              }
            }}
          />

          <button className="btn btn-primary" onClick={envoyerMessageUI}>
            Envoyer
          </button>
        </div>
      </div>
    </div>
  );
}