"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { obtenirEtudiantParId } from "@/app/FetchsMethodesEtudiants";
import { ajouterActivitePourEtudiant, retirerActivite } from "@/app/FetchMethodesActivites";
import type { Etudiant } from "@/app/TypesObjets";

type EvenementCalendrier = {
  id: string;
  title: string;
  start: string;
  end: string;
};

export default function CalendrierUtilisateur() {
  const params = useParams<{ id: string }>();
  const idEtudiant = params.id;
  const router = useRouter();

  const [etudiant, setEtudiant] = useState<Etudiant | null>(null);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState("");

  const [titre, setTitre] = useState("");
  const [description, setDescription] = useState("");
  const [tempsDebut, setTempsDebut] = useState("");
  const [tempsFin, setTempsFin] = useState("");
  const [ajoutEnCours, setAjoutEnCours] = useState(false);

  function gotoHomePage() {
    router.push("/HomePage");
  }

  const gotoDashBoard = (id: string) => {
    router.push(`/DashBoard/${id}`);
  };

  async function chargerEtudiant() {
    try {
      setChargement(true);
      setErreur("");

      const etudiantCharge = await obtenirEtudiantParId(idEtudiant);
      setEtudiant(etudiantCharge);
    } catch (e: unknown) {
      if (e instanceof Error) {
        setErreur(e.message);
      } else {
        setErreur("erreur serveur interne");
      }
    } finally {
      setChargement(false);
    }
  }

  useEffect(() => {
    if (idEtudiant) {
      chargerEtudiant();
    }
  }, [idEtudiant]);

  const evenements: EvenementCalendrier[] = useMemo(() => {
    if (!etudiant?.horaire?.activites) return [];

    return etudiant.horaire.activites.map((activite) => ({
      id: activite.id,
      title: activite.titre,
      start: activite.tempsDebut,
      end: activite.tempsFin,
    }));
  }, [etudiant]);

  function convertirDatePourInput(dateIso: string) {
    const date = new Date(dateIso);
    const annee = date.getFullYear();
    const mois = String(date.getMonth() + 1).padStart(2, "0");
    const jour = String(date.getDate()).padStart(2, "0");
    const heures = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${annee}-${mois}-${jour}T${heures}:${minutes}`;
  }

  function handleSelection(selectionInfo: { startStr: string; endStr: string }) {
    setTempsDebut(convertirDatePourInput(selectionInfo.startStr));
    setTempsFin(convertirDatePourInput(selectionInfo.endStr));
  }

  async function handleRetirerActivite(clickInfo: {
  event: { id: string; title: string };
}) {
  const confirmation = window.confirm(
    `Veux-tu vraiment supprimer l'activité "${clickInfo.event.title}" ?`
  );

  if (!confirmation) {
    return;
  }

  try {
    setErreur("");
    await retirerActivite(clickInfo.event.id);
    await chargerEtudiant();
  } catch (e: unknown) {
    if (e instanceof Error) {
      setErreur(e.message);
    } else {
      setErreur("Erreur lors de la suppression.");
    }
  }
}

  async function handleAjouterActivite() {
    if (!titre.trim() || !description.trim() || !tempsDebut || !tempsFin) {
      setErreur("Remplis tous les champs.");
      return;
    }

    if (new Date(tempsFin).getTime() <= new Date(tempsDebut).getTime()) {
      setErreur("Le temps de fin doit être après le temps de début.");
      return;
    }

    try {
      setAjoutEnCours(true);
      setErreur("");

      await ajouterActivitePourEtudiant(
        description,
        tempsDebut,
        tempsFin,
        titre,
        idEtudiant
      );

      setTitre("");
      setDescription("");
      setTempsDebut("");
      setTempsFin("");

      await chargerEtudiant();
    } catch (e: unknown) {
      if (e instanceof Error) {
        setErreur(e.message);
      } else {
        setErreur("erreur inconnue");
      }
    } finally {
      setAjoutEnCours(false);
    }
  }

  if (chargement) {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 p-4">
            <h2>Chargement...</h2>
          </div>
        </div>
      </div>
    );
  }

  if (erreur && !etudiant) {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 p-4">
            <h2>{erreur}</h2>
          </div>
        </div>
      </div>
    );
  }

  if (!etudiant) {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 p-4">
            <h2>Aucun étudiant trouvé</h2>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="container-fluid">
        <div className="row bg-white border-bottom">
          <div className="col-2 col-md-1">
            <button onClick={gotoHomePage} className="border-0 bg-white">
              <img
                className="homepage-logo p-2"
                src="/Img/LogoLinkUp.png"
                alt="Logo"
              />
            </button>
          </div>

          <div className="col-6 col-md-8 p-3 text-end">
            <button
              onClick={() => gotoDashBoard(etudiant.id)}
              className="ps-2 pe-2 mt-3 text-dark rounded bg-light border me-2"
              type="button"
            >
              Tableau de bord
            </button>

            <button
              className="ps-2 pe-2 mt-3 text-dark rounded bg-light border"
              type="button"
            >
              Calendrier
            </button>
          </div>

          <div className="col-4 col-md-3 p-3 text-center">
            <span className="mt-3 d-inline-block">
              {etudiant.prenom} {etudiant.nom}
            </span>
          </div>
        </div>

        <div className="row">
          <div className="col-12 col-lg-8 p-4">
            <h2 className="mb-3">Mon calendrier</h2>

            <div className="bg-white border rounded p-3">
              <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                locale="fr-ca"
                headerToolbar={{
                  left: "prev,next today",
                  center: "title",
                  right: "dayGridMonth,timeGridWeek,timeGridDay",
                }}
                buttonText={{
                  today: "Aujourd'hui",
                  month: "Mois",
                  week: "Semaine",
                  day: "Jour",
                }}
                selectable={true}
                selectMirror={true}
                select={handleSelection}
                eventClick={handleRetirerActivite}
                events={evenements}
                height="75vh"
              />
            </div>
          </div>

          <div className="col-12 col-lg-4 p-4">
            <h2 className="mb-3">Ajouter une activité</h2>

            {erreur && <div className="alert alert-danger py-2">{erreur}</div>}

            <div className="border rounded bg-white p-3">
              <div className="mb-3">
                <label className="form-label">Titre</label>
                <input
                  value={titre}
                  onChange={(e) => setTitre(e.currentTarget.value)}
                  type="text"
                  className="form-control"
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.currentTarget.value)}
                  className="form-control"
                  rows={4}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Temps début</label>
                <input
                  value={tempsDebut}
                  onChange={(e) => setTempsDebut(e.currentTarget.value)}
                  type="datetime-local"
                  className="form-control"
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Temps fin</label>
                <input
                  value={tempsFin}
                  onChange={(e) => setTempsFin(e.currentTarget.value)}
                  type="datetime-local"
                  className="form-control"
                />
              </div>

              <div className="d-grid">
                <button
                  onClick={handleAjouterActivite}
                  className="btn btn-primary"
                  type="button"
                  disabled={ajoutEnCours}
                >
                  {ajoutEnCours ? "Ajout..." : "Ajouter l'activité"}
                </button>
              </div>

              {etudiant?.horaire?.activites?.map((activite) => (
              <div key={activite.id} className="border rounded p-2 mb-2">

                <div className="fw-bold">{activite.titre}</div>
                <div className="small">{activite.description}</div>

                <button
                  className="btn btn-danger btn-sm mt-2"
                  onClick={() => handleRetirerActivite({ event: { id: activite.id, title: activite.titre } })}
                >
                  Supprimer
                </button>

              </div>
            ))}



              <div className="mt-3 text-muted small">
                Tu peux aussi sélectionner un créneau directement dans le
                calendrier pour préremplir début et fin.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}