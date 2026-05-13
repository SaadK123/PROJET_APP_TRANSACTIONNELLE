"use client";

import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { useParams, useRouter } from "next/navigation";

import {
  creerConversation,
  getConversationsParEtudiant,
} from "@/app/FetchMethodesConversations";
import type { Conversation } from "@/app/TypesObjets";
import { GoToConversation } from "@/app/ChangerPage";

export default function ListeConversationsPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [nomConversation, setNomConversation] = useState("");
  const [erreur, setErreur] = useState("");
  const [message, setMessage] = useState("");
  const [chargement, setChargement] = useState(true);

  async function chargerConversations() {
    try {
      setChargement(true);
      setErreur("");

      const data = await getConversationsParEtudiant(id);
      setConversations(data);
    } catch (e: any) {
      setErreur(e.message || "Impossible de charger les conversations");
    } finally {
      setChargement(false);
    }
  }

  useEffect(() => {
    chargerConversations();
  }, [id]);

  async function soumettreCreationConversation(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErreur("");
    setMessage("");

    if (nomConversation.trim() === "") {
      setErreur("Le nom de la conversation est obligatoire.");
      return;
    }

    try {
      await creerConversation(id, nomConversation.trim());
      setNomConversation("");
      setMessage("Conversation créée avec succès.");
      await chargerConversations();
    } catch (e: any) {
      setErreur(e.message || "Impossible de créer la conversation");
    }
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

        <button className="btn btn-outline-secondary" onClick={chargerConversations}>
          Rafraîchir
        </button>
      </div>

      <h2 className="mb-4">Messagerie</h2>

      {message !== "" ? <div className="alert alert-success">{message}</div> : null}
      {erreur !== "" ? <div className="alert alert-danger">{erreur}</div> : null}

      <div className="card p-3 shadow-sm mb-4">
        <h4 className="mb-3">Créer une conversation</h4>

        <form onSubmit={soumettreCreationConversation}>
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
              <button className="btn btn-primary w-100" type="submit">
                Créer
              </button>
            </div>
          </div>
        </form>
      </div>

      <h4 className="mb-3">Mes conversations</h4>

      {chargement ? <p>Chargement...</p> : null}

      {!chargement && conversations.length === 0 ? (
        <p>Aucune conversation.</p>
      ) : null}

      <div className="row">
        {conversations.map((conversation) => (
          <div key={conversation.id} className="col-md-4 mb-3">
            <div className="card p-3 shadow-sm">
              <h5>{conversation.nom}</h5>

              <p className="mb-1">
                Participants : {conversation.participants?.length ?? 0}
              </p>

              <p className="mb-2">
                Type :{" "}
                {conversation.estConversationGroupe
                  ? "Conversation de groupe"
                  : "Conversation privée"}
              </p>

              <button
                className="btn btn-primary btn-sm"
                onClick={() => GoToConversation(router, id, conversation.id)}
              >
                Ouvrir
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}