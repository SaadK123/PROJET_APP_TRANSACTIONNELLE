"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { obtenirGroupeParId } from "@/app/FetchMethodesGroupes";
import type { Groupe } from "@/app/TypesObjets";

type EvenementCalendrier = {
  id: string;
  title: string;
  start: string;
  end: string;
};

export default function PageCalendrierGroupe() {
  const params = useParams<{ idEtudiant: string; idGroupe: string }>();
  const idEtudiant = params.idEtudiant;
  const idGroupe = params.idGroupe;
  const router = useRouter();

  const [groupe, setGroupe] = useState<Groupe | null>(null);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState("");

  function gotoLogIn() {
    router.push("/SignIn");
  }

  function gotoHomePage() {
    router.push("/HomePage");
  }

  function gotoDashBoard() {
    router.push(`/DashBoard/${idEtudiant}`);
  }

  function gotoCalendrier() {
    router.push(`/calendrier/${idEtudiant}`);
  }

  async function chargerGroupe() {
    try {
      setChargement(true);
      setErreur("");

      const groupeCharge = await obtenirGroupeParId(idGroupe);
      setGroupe(groupeCharge);
   } catch (e: unknown) {
  if (e instanceof Error) {
    setErreur(e.message);
  } else {
    setErreur("erreur inconnue");
  }
} finally {
  setChargement(false);
}
  }

  useEffect(() => {
    if (idGroupe) {
      chargerGroupe();
    }
  }, [idGroupe]);

  const evenements: EvenementCalendrier[] = useMemo(() => {
    if (!groupe?.horaire?.activites) return [];

    return groupe.horaire.activites.map((activite) => ({
      id: activite.id,
      title: activite.titre,
      start: activite.tempsDebut,
      end: activite.tempsFin,
    }));
  }, [groupe]);

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

  if (erreur) {
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

  if (!groupe) {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 p-4">
            <h2>Groupe introuvable</h2>
          </div>
        </div>
      </div>
    );
  }

  return (
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

        <div className="col-8 col-md-9 p-3 text-end">
          <button
            onClick={gotoDashBoard}
            className="ps-2 pe-2 mt-3 text-dark rounded bg-light border me-2"
            type="button"
          >
            Tableau de bord
          </button>

          <button
            onClick={gotoCalendrier}
            className="ps-2 pe-2 mt-3 text-dark rounded bg-light border me-2"
            type="button"
          >
            Calendrier
          </button>
        </div>

        <div className="col-2 p-3 text-center">
          <button
            onClick={gotoLogIn}
            className="ps-3 pe-3 mt-3"
            type="button"
          >
            Déconnexion
          </button>
        </div>
      </div>

      <div className="row p-4">
        <div className="col-12">
          <h2 className="mb-4">Horaire du groupe</h2>
        </div>

        <div className="col-12 col-lg-4 mb-4">
          <div className="bg-white border rounded p-4 h-100">
            <h3 className="mb-3">{groupe.nomGroupe}</h3>

            <p>
              <strong>Chef du groupe :</strong>{" "}
              {groupe.chef
                ? `${groupe.chef.prenom} ${groupe.chef.nom}`
                : "Non défini"}
            </p>

            <p>
              <strong>Nombre de membres :</strong> {groupe.etudiants.length}
            </p>

            <div className="mt-4">
              <h5 className="mb-3">Membres du groupe</h5>

              <div
                className="border rounded p-2 bg-light"
                style={{ maxHeight: "220px", overflowY: "auto" }}
              >
                {groupe.etudiants.length > 0 ? (
                  groupe.etudiants.map((etudiant) => (
                    <div key={etudiant.id} className="py-2 px-2 border-bottom">
                      {etudiant.prenom} {etudiant.nom}
                    </div>
                  ))
                ) : (
                  <p className="mb-0">Aucun membre</p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-lg-8">
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
              events={evenements}
              height="75vh"
            />
          </div>
        </div>
      </div>
    </div>
  );
}