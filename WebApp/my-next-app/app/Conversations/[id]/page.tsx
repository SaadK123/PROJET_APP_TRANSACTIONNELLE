"use client";

import { useParams, useRouter } from "next/navigation";

export default function ConversationsPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="m-0">Conversations</h1>

        <button
          className="btn btn-secondary"
          onClick={() => router.push(`/DashBoard/${id}`)}
        >
          Retour au dashboard
        </button>
      </div>

      <div className="card p-4 shadow-sm">
        <h4 className="mb-3">Messagerie</h4>
        <p className="text-muted mb-0">
          La page de conversations est créée.
        </p>
      </div>
    </div>
  );
}