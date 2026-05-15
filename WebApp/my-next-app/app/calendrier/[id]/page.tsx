"use client";

import { useEffect, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { useParams, useRouter } from "next/navigation";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import Spinner from "react-bootstrap/Spinner";
import { API } from "../../../Api";

import { GotoDashboard, GotoHomePage, GotoLogin } from "@/app/ChangerPage";

import { retournerErreur } from "@/app/attraperErreur";
import { Activite, Etudiant } from "@/src/api";

/**
 * ici je met toute les constante en haut
 * comme sa tout est reutilisable
 * et tout les texte sont centraliser
 */

/* erreurs */
const ERREUR_SERVEUR = "Erreur serveur";
const ERREUR_ETUDIANT_INTROUVABLE = "Aucun etudiant trouve";
const ERREUR_TITRE_OBLIGATOIRE = "Titre obligatoire";
const ERREUR_DESCRIPTION_OBLIGATOIRE = "Description obligatoire";
const ERREUR_TEMPS_DEBUT_OBLIGATOIRE = "Temps debut obligatoire";
const ERREUR_TEMPS_FIN_OBLIGATOIRE = "Temps fin obligatoire";
const ERREUR_FIN_AVANT_DEBUT =
  "Le temps de fin doit etre apres le temps de debut";

/* succes */
const MESSAGE_ACTIVITE_AJOUTEE = "Activite ajoutee";
const MESSAGE_ACTIVITE_SUPPRIMEE = "Activite supprimee";

/* confirmation */
const MESSAGE_CONFIRMATION_SUPPRESSION =
  "Veux tu vraiment supprimer cette activite ?";

/* titres */
const TITRE_PAGE = "Mon calendrier";
const TITRE_CHARGEMENT = "Chargement...";
const TITRE_AJOUT_ACTIVITE = "Ajouter une activite";
const TITRE_CALENDRIER = "Calendrier";
const TITRE_LISTE_ACTIVITES = "Liste des activités";
const TITRE_AUCUNE_ACTIVITE = "Aucune activité";

/* boutons */
const BOUTON_ACCUEIL = "Accueil";
const BOUTON_DASHBOARD = "Tableau de bord";
const BOUTON_CALENDRIER = "Calendrier";
const BOUTON_DECONNEXION = "Deconnexion";
const BOUTON_AJOUTER_ACTIVITE = "Ajouter activite";
const BOUTON_AJOUT_EN_COURS = "Ajout...";
const BOUTON_SUPPRIMER = "Supprimer";

/* labels */
const LABEL_TITRE = "Titre";
const LABEL_DESCRIPTION = "Description";
const LABEL_TEMPS_DEBUT = "Temps debut";
const LABEL_TEMPS_FIN = "Temps fin";
const LABEL_DEBUT = "Debut : ";
const LABEL_FIN = "Fin : ";

/* calendrier */
const CALENDRIER_AUJOURD_HUI = "Aujourd hui";
const CALENDRIER_MOIS = "Mois";
const CALENDRIER_SEMAINE = "Semaine";
const CALENDRIER_JOUR = "Jour";
const CALENDRIER_HAUTEUR = "75vh";

/**
 * ce type sert juste pour fullcalendar
 * je garde juste les champ utile
 */
type PrevisionJour = {
  date: string;
  temperatureMax: number;
  temperatureMin: number;
  code: number;
};

function obtenirEmojiMeteo(code: number): string {
  if (code === 0) return "☀️";
  if (code <= 2) return "⛅";
  if (code === 3) return "☁️";
  if (code <= 67) return "🌧️";
  if (code <= 79) return "❄️";
  if (code <= 99) return "⛈️";
  return "🌡️";
}

type EvenementCalendrier = {
  id: string;
  title: string;
  start: string;
  end: string;
};

export default function CalendrierUtilisateur() {
  const router = useRouter();

  /**
   * ici je lit lid dans url
   * sa represente letudiant connecter
   */
  const params = useParams<{ id: string }>();
  const idEtudiant = params.id;

  /* state principal */
  const [etudiant, setEtudiant] = useState<Etudiant | null>(null);
  const [chargement, setChargement] = useState<boolean>(true);
  const [erreur, setErreur] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  /* state formulaire activite */
  const [titreActivite, setTitreActivite] = useState<string>("");
  const [descriptionActivite, setDescriptionActivite] = useState<string>("");
  const [tempsDebut, setTempsDebut] = useState<string>("");
  const [tempsFin, setTempsFin] = useState<string>("");
  const [ajoutEnCours, setAjoutEnCours] = useState<boolean>(false);

  /* state meteo */
  const [survolDate, setSurvolDate] = useState<string | null>(null);
  const [previsions, setPrevisions] = useState<Map<string, PrevisionJour>>(
    new Map(),
  );

  /**
   * je vide les message avant une action
   */
  function viderMessages() {
    setErreur("");
    setMessage("");
  }

  async function chargerPrevisions(lat: number, lon: number) {
    try {
      const url =
        `https://api.open-meteo.com/v1/forecast` +
        `?latitude=${lat}&longitude=${lon}` +
        `&daily=temperature_2m_max,temperature_2m_min,weathercode` +
        `&temperature_unit=celsius&timezone=auto&forecast_days=16`;

      const reponse = await fetch(url);
      const donnees = await reponse.json();

      const map = new Map<string, PrevisionJour>();
      donnees.daily.time.forEach((date: string, i: number) => {
        map.set(date, {
          date,
          temperatureMax: Math.round(donnees.daily.temperature_2m_max[i]),
          temperatureMin: Math.round(donnees.daily.temperature_2m_min[i]),
          code: donnees.daily.weathercode[i],
        });
      });
      setPrevisions(map);
    } catch {
      setPrevisions(new Map());
    }
  }

  //Animation Chargement
  function Chargement() {
    return <Spinner animation="border" />;
  }

  /**
   * ici je charge letudiant depuis backend
   * je reutilise sa au debut et apres les action
   */
  async function chargerEtudiant() {
    setChargement(true);
    viderMessages();

    try {
      const etudiantCharge = await API.getEtudiantById({ id: idEtudiant });
      setEtudiant(etudiantCharge);
    } catch (erreurCapturee: any) {
      setEtudiant(null);
      setErreur(retournerErreur(erreurCapturee, ERREUR_SERVEUR));
    }

    setChargement(false);
  }

  /**
   * des que la page ouvre je charge letudiant
   * si lid change je recharge aussi
   */
  useEffect(() => {
    if (idEtudiant) {
      chargerEtudiant();
    }
  }, [idEtudiant]);
  /**
   * des que la page ouvre je charge la page
   * charge la localisation
   */
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => chargerPrevisions(pos.coords.latitude, pos.coords.longitude),
        () => {},
      );
    }
  }, []);

  /**
   * ici je transforme les activite
   * dans le format attendu par fullcalendar
   */
  function construireEvenements(): EvenementCalendrier[] {
    const evenements: EvenementCalendrier[] = [];

    if (etudiant === null) {
      return evenements;
    }

    if (etudiant.horaire === null) {
      return evenements;
    }

    for (let i = 0; i < etudiant.horaire!.activites!.length; i++) {
      const activite = etudiant.horaire!.activites![i];

      evenements.push({
        id: activite.id!,
        title: activite.titre!,
        start: activite.tempsDebut!.toString(),
        end: activite.tempsFin!.toString(),
      });
    }

    return evenements;
  }

  /**
   * ici je rend la date plus lisible
   * si jamais elle est bizarre je retourne le texte brut
   */
  function formaterDateHeure(dateTexte: string): string {
    const date = new Date(dateTexte);

    if (Number.isNaN(date.getTime())) {
      return dateTexte;
    }

    return date.toLocaleString("fr-CA");
  }

  function formaterDateLocale(date: Date): string {
    const annee = date.getFullYear();
    const mois = String(date.getMonth() + 1).padStart(2, "0");
    const jour = String(date.getDate()).padStart(2, "0");
    return `${annee}-${mois}-${jour}`;
  }

  /**
   * ici je gere lajout dune activite perso
   */
  async function soumettreActivite(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    viderMessages();

    if (titreActivite.trim() === "") {
      setErreur(ERREUR_TITRE_OBLIGATOIRE);
      return;
    }

    if (descriptionActivite.trim() === "") {
      setErreur(ERREUR_DESCRIPTION_OBLIGATOIRE);
      return;
    }

    if (tempsDebut.trim() === "") {
      setErreur(ERREUR_TEMPS_DEBUT_OBLIGATOIRE);
      return;
    }

    if (tempsFin.trim() === "") {
      setErreur(ERREUR_TEMPS_FIN_OBLIGATOIRE);
      return;
    }

    if (new Date(tempsFin).getTime() <= new Date(tempsDebut).getTime()) {
      setErreur(ERREUR_FIN_AVANT_DEBUT);
      return;
    }

    try {
      setAjoutEnCours(true);

      await API.ajouterActivitePourEtudiant({
        ajouterActiviteDTOEtudiant: {
          etudiantId: idEtudiant,
          activite: {
            titre: titreActivite,
            description: descriptionActivite,
            tempsDebut: new Date(tempsDebut),
            tempsFin: new Date(tempsFin),
          },
        },
      });
      setTitreActivite("");
      setDescriptionActivite("");
      setTempsDebut("");
      setTempsFin("");
      setMessage(MESSAGE_ACTIVITE_AJOUTEE);

      await chargerEtudiant();
    } catch (erreurCapturee: any) {
      setErreur(retournerErreur(erreurCapturee, ERREUR_SERVEUR));
    } finally {
      setAjoutEnCours(false);
    }
  }

  /**
   * ici je supprime une activite
   * puis je recharge letudiant
   */
  async function supprimerUneActivite(activiteId: string) {
    const confirmation = window.confirm(MESSAGE_CONFIRMATION_SUPPRESSION);

    if (confirmation === false) {
      return;
    }

    viderMessages();

    try {
      await API.retirerActivite({ activiteId });
      setMessage(MESSAGE_ACTIVITE_SUPPRIMEE);
      await chargerEtudiant();
    } catch (erreurCapturee: any) {
      setErreur(retournerErreur(erreurCapturee, ERREUR_SERVEUR));
    }
  }

  /**
   * ici je montre les activite en pile verticale
   * chaque activite a son propre bloc
   */
  function afficherActivites() {
    if (etudiant === null) {
      return <p className="mb-0">{TITRE_AUCUNE_ACTIVITE}</p>;
    }

    if (etudiant.horaire === null) {
      return <p className="mb-0">{TITRE_AUCUNE_ACTIVITE}</p>;
    }

    if (etudiant.horaire!.activites!.length === 0) {
      return <p className="mb-0">{TITRE_AUCUNE_ACTIVITE}</p>;
    }

    return (
      <div className="d-flex flex-column gap-3">
        {etudiant.horaire!.activites!.map((activite: Activite) => {
          return (
            <div key={activite.id} className="card">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <h6 className="mb-2">{activite.titre}</h6>
                    <div className="mb-2">{activite.description}</div>
                    <div>
                      {LABEL_DEBUT +
                        formaterDateHeure(activite.tempsDebut!.toISOString())}
                    </div>
                    <div>
                      {LABEL_FIN +
                        formaterDateHeure(activite.tempsFin!.toISOString())}
                    </div>
                  </div>

                  <button
                    type="button"
                    className="btn btn-sm btn-danger"
                    onClick={() => supprimerUneActivite(activite.id!)}
                  >
                    {BOUTON_SUPPRIMER}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  /**
   * si sa charge je montre juste sa
   */
  if (chargement) {
    return <div className="container-fluid p-4">{Chargement()}</div>;
  }

  /**
   * si erreur avant davoir letudiant
   * je montre juste le message
   */
  if (erreur !== "" && etudiant === null) {
    return (
      <div className="container-fluid p-4">
        <h2>{erreur}</h2>
      </div>
    );
  }

  /**
   * dernier filet de securite
   */
  if (etudiant === null) {
    return (
      <div className="container-fluid p-4">
        <h2>{ERREUR_ETUDIANT_INTROUVABLE}</h2>
      </div>
    );
  }

  /**
   * ici je construit toute la page
   * je laisse le calendrier juste pour afficher
   * et la gestion se fait dans la liste dactivite
   */
  return (
    <div className="container-fluid">
      <div className="row border-bottom bg-light p-3">
        <div className="col-12 col-md-4 mb-2 mb-md-0">
          <button
            type="button"
            className="btn btn-secondary me-2"
            onClick={() => GotoHomePage(router)}
          >
            {BOUTON_ACCUEIL}
          </button>

          <button
            type="button"
            className="btn btn-secondary me-2"
            onClick={() => GotoDashboard(router, etudiant.id!)}
          >
            {BOUTON_DASHBOARD}
          </button>

          <button type="button" className="btn btn-secondary me-2">
            {BOUTON_CALENDRIER}
          </button>
        </div>

        <div className="col-12 col-md-4 text-md-center mb-2 mb-md-0">
          <h3 className="mb-0">{TITRE_PAGE}</h3>
        </div>
    
        <div className="col-12 col-md-4 text-md-end">
          <button
            type="button"
            className="btn btn-dark"
            onClick={() => GotoLogin(router)}
          >
            {BOUTON_DECONNEXION}
          </button>
        </div>
      </div>
      <div className="row p-3">
        <div className="col-12">
          {message !== "" && (
            <div className="alert alert-success">{message}</div>
          )}
          {erreur !== "" && <div className="alert alert-danger">{erreur}</div>}
        </div>

        <div className="col-12 col-lg-8 mb-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">{TITRE_CALENDRIER}</h5>

              <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin]}
                initialView="dayGridMonth"
                locale="fr-ca"
                headerToolbar={{
                  left: "prev,next today",
                  center: "title",
                  right: "dayGridMonth,timeGridWeek,timeGridDay",
                }}
                buttonText={{
                  today: CALENDRIER_AUJOURD_HUI,
                  month: CALENDRIER_MOIS,
                  week: CALENDRIER_SEMAINE,
                  day: CALENDRIER_JOUR,
                }}
                events={construireEvenements()}
                height={CALENDRIER_HAUTEUR}
                dayCellContent={(arg) => {
                  const dateKey = formaterDateLocale(arg.date);
                  const prevision = previsions.get(dateKey);

                  return (
                    <div
                      className="position-relative"
                      onMouseEnter={() => setSurvolDate(dateKey)}
                      onMouseLeave={() => setSurvolDate(null)}
                    >
                      <span className="fc-daygrid-day-number">
                        {arg.date.getDate()}
                      </span>

                      {prevision !== undefined && (
                        <small
                          style={{
                            fontSize: "0.65rem",
                            color: "#555",
                            display: "block",
                            textAlign: "center",
                          }}
                        >
                          {obtenirEmojiMeteo(prevision.code)}
                        </small>
                      )}

                      {survolDate === dateKey && prevision !== undefined && (
                        <div
                          className="card position-absolute shadow"
                          style={{
                            top: "100%",
                            left: 0,
                            minWidth: "150px",
                            zIndex: 1050,
                          }}
                        >
                          <div className="card-body p-2">
                            <small className="d-block fw-semibold mb-1">
                              {dateKey}
                            </small>
                            <small className="d-block">
                              {obtenirEmojiMeteo(prevision.code)}
                            </small>
                            <small className="d-block">
                              <span style={{ color: "#c0392b" }}>
                                {prevision.temperatureMax}°C
                              </span>
                              {" / "}
                              <span style={{ color: "#2980b9" }}>
                                {prevision.temperatureMin}°C
                              </span>
                            </small>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                }}
              />
            </div>
          </div>

          <div className="card mt-3">
            <div className="card-body">
              <h5 className="card-title">{TITRE_LISTE_ACTIVITES}</h5>
              {afficherActivites()}
            </div>
          </div>
        </div>

        <div className="col-12 col-lg-4 mb-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">{TITRE_AJOUT_ACTIVITE}</h5>

              <form onSubmit={soumettreActivite}>
                <div className="mb-3">
                  <label className="form-label">{LABEL_TITRE}</label>
                  <input
                    type="text"
                    className="form-control"
                    value={titreActivite}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setTitreActivite(e.target.value)
                    }
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">{LABEL_DESCRIPTION}</label>
                  <textarea
                    className="form-control"
                    rows={4}
                    value={descriptionActivite}
                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                      setDescriptionActivite(e.target.value)
                    }
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">{LABEL_TEMPS_DEBUT}</label>
                  <input
                    type="datetime-local"
                    className="form-control"
                    value={tempsDebut}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setTempsDebut(e.target.value)
                    }
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">{LABEL_TEMPS_FIN}</label>
                  <input
                    type="datetime-local"
                    className="form-control"
                    value={tempsFin}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setTempsFin(e.target.value)
                    }
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={ajoutEnCours}
                >
                  {ajoutEnCours
                    ? BOUTON_AJOUT_EN_COURS
                    : BOUTON_AJOUTER_ACTIVITE}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
