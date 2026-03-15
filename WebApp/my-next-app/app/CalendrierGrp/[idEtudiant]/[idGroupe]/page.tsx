"use client";

import { useParams, useRouter } from "next/navigation";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";


type EvenementCalendrier = {
  id: string;
  title: string;
  start: string;
  end: string;
};

export default function CalendrierGroupe() {
  const params = useParams<{ idEtudiant: string; idGroupe: string }>();
  const idEtudiant = params.idEtudiant;
  const idGroupe = params.idGroupe;

  const router = useRouter();
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

  const evenements: EvenementCalendrier[] = [
    {
      id: "1",
      title: "Meeting projet",
      start: "2026-03-18T10:00",
      end: "2026-03-18T11:00",
    },
    {
      id: "2",
      title: "Travail équipe",
      start: "2026-03-20T14:00",
      end: "2026-03-20T16:00",
    },
    {
      id: "3",
      title: "Présentation",
      start: "2026-03-25T09:00",
      end: "2026-03-25T10:00",
    },
  ];

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

        <div className="col-6 col-md-8 p-3 text-end">
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

      <div className="row">
        <div className="col-12 p-4">
          <h2 className="mb-3">Horaire du groupe</h2>

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