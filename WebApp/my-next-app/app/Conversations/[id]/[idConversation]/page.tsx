"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";

type Message = {
  id: number;
  auteur: string;
  contenu: string;
  heure: string;
  moi: boolean;
};

type Conversation = {
  id: number;
  nom: string;
  participants: number;
};

export default function ConversationsPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [nomConversation, setNomConversation] = useState<string>("");
  const [messageSucces, setMessageSucces] = useState<string>("");
  const [messageErreur, setMessageErreur] = useState<string>("");

  const [conversationSelectionnee, setConversationSelectionnee] =
    useState<string>("Projet équipe");

  const [messageTexte, setMessageTexte] = useState<string>("");

  const conversations: Conversation[] = [];

  const [messages, setMessages] = useState<Message[]>([]);

  function creerConversationUI() {
    setMessageSucces("");
    setMessageErreur("");

    if (nomConversation.trim() === "") {
      setMessageErreur("Le nom de la conversation est obligatoire.");
      return;
    }

    setMessageSucces("Conversation créée avec succès.");
    setNomConversation("");
  }

  function envoyerMessage() {
    if (messageTexte.trim() === "") return;

    setMessages((anciens) => [
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

  return (
    <div className="container mt-4">
      <div className="d-flex flex-wrap gap-2 mb-4">
        <button
          className="btn btn-secondary"
          onClick={() => router.push(`/DashBoard/${id}`)}
        >
          Retour au dashboard
        </button>
      </div>

      <h2 className="mb-4">Conversations</h2>

      {messageSucces !== "" ? (
        <div className="alert alert-success">{messageSucces}</div>
      ) : null}

      {messageErreur !== "" ? (
        <div className="alert alert-danger">{messageErreur}</div>
      ) : null}

      <div className="card p-3 shadow-sm mb-4">
        <h4 className="mb-3">Créer une conversation</h4>

        <div className="row g-2">
          <div className="col-md-9">
            <input
              type="text"
              className="form-control"
              placeholder="Nom de la conversation"
              value={nomConversation}
              onChange={(e) => setNomConversation(e.target.value)}
            />
          </div>

          <div className="col-md-3">
            <button
              className="btn btn-primary w-100"
              type="button"
              onClick={creerConversationUI}
            >
              Créer
            </button>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-4 mb-4">
          <div className="card p-3 shadow-sm">
            <h4 className="mb-3">Mes conversations</h4>

            {conversations.map((conv) => (
              <button
                key={conv.id}
                className={`btn mb-2 text-start ${
                  conversationSelectionnee === conv.nom
                    ? "btn-primary"
                    : "btn-outline-secondary"
                }`}
                onClick={() => setConversationSelectionnee(conv.nom)}
              >
                <div>{conv.nom}</div>
                <small>{conv.participants} participants</small>
              </button>
            ))}
          </div>
        </div>

        <div className="col-md-8 mb-4">
          <div className="card p-3 shadow-sm">
            <div className="mb-3">
              <h4 className="mb-1">{conversationSelectionnee}</h4>
              <small className="text-muted">Chat</small>
            </div>

            <div
              className="border rounded p-3 mb-3 bg-light"
              style={{ height: "400px", overflowY: "auto" }}
            >
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`d-flex mb-3 ${
                    msg.moi ? "justify-content-end" : "justify-content-start"
                  }`}
                >
                  <div
                    className={`p-2 rounded ${
                      msg.moi ? "bg-primary text-white" : "bg-white border"
                    }`}
                    style={{ maxWidth: "75%" }}
                  >
                    {!msg.moi ? (
                      <div className="fw-bold small">{msg.auteur}</div>
                    ) : null}

                    <div>{msg.contenu}</div>
                    <div className="small text-end mt-1">{msg.heure}</div>
                  </div>
                </div>
              ))}
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
                    envoyerMessage();
                  }
                }}
              />

              <button
                className="btn btn-primary"
                type="button"
                onClick={envoyerMessage}
              >
                Envoyer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
