"use client";

import { useEffect, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { useParams, useRouter } from "next/navigation";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";

import {
  ajouterActivitePourGroupe,
  retirerActivite,
} from "@/app/FetchMethodesActivites";

import {
  obtenirGroupeParId,
  envoyerInvitationGroupe,
  quitterGroupe,
  supprimerGroupe,
  virerEtudiantDuGroupe,
} from "@/app/FetchMethodesGroupes";

import {
  GotoCalendar,
  GotoDashboard,
  GotoHomePage,
  GotoLogin,
} from "@/app/ChangerPage";

import { retournerErreur } from "@/app/attraperErreur";
import { TYPES_NOTIFICATION } from "@/app/TypesObjets";
import type { Activite, Groupe } from "@/app/TypesObjets";
import Spinner from "react-bootstrap/Spinner";

/**
 * ici je met toute les constante en haut
 * comme sa tout est au meme endroit
 * et je reutilise les texte partout
 */

/* erreurs */
const ERREUR_SERVEUR = "erreur serveur";
const ERREUR_GROUPE_INTROUVABLE = "groupe introuvable";
const ERREUR_HORAIRE_GROUPE_INTROUVABLE = "horaire du groupe introuvable";
const ERREUR_SEUL_CHEF_INVITER = "seul le chef peut inviter";
const ERREUR_SEUL_CHEF_AJOUTER_ACTIVITE =
  "seul le chef peut ajouter une activité";
const ERREUR_SEUL_CHEF_VIRER = "seul le chef peut virer un membre";
const ERREUR_NOM_UTILISATEUR_OBLIGATOIRE = "nom utilisateur obligatoire";
const ERREUR_TITRE_OBLIGATOIRE = "titre obligatoire";
const ERREUR_DESCRIPTION_OBLIGATOIRE = "description obligatoire";
const ERREUR_TEMPS_DEBUT_OBLIGATOIRE = "temps début obligatoire";
const ERREUR_TEMPS_FIN_OBLIGATOIRE = "temps fin obligatoire";
const ERREUR_DUREE_INVALIDE = "durée invalide";
const ERREUR_FIN_AVANT_DEBUT =
  "le temps de fin doit être après le temps de début";

/* succes */
const MESSAGE_INVITATION_ENVOYEE = "invitation envoyée";
const MESSAGE_ACTIVITE_AJOUTEE = "activité ajoutée";
const MESSAGE_ACTIVITE_SUPPRIMEE = "activité supprimée";
const MESSAGE_MEMBRE_RETIRE = "membre viré du groupe";

/* titres */
const TITRE_PAGE = "Calendrier de groupe";
const TITRE_MEMBRES = "Membres du groupe";
const TITRE_INVITATION = "Inviter un étudiant";
const TITRE_AJOUT_ACTIVITE = "Ajouter une activité";
const TITRE_CALENDRIER = "Calendrier";
const TITRE_LISTE_ACTIVITES = "Liste des activités";
const TITRE_CHARGEMENT = "Chargement...";
const TITRE_AUCUN_MEMBRE = "aucun membre";
const TITRE_AUCUNE_ACTIVITE = "aucune activité";

/* labels */
const LABEL_CHEF = "Chef : ";
const LABEL_NOMBRE_MEMBRES = "Nombre de membres : ";
const LABEL_MON_ROLE = "Mon rôle : ";
const LABEL_NOM_UTILISATEUR = "Nom utilisateur";
const LABEL_TITRE_NOTIFICATION = "Titre notification";
const LABEL_MESSAGE_NOTIFICATION = "Message notification";
const LABEL_TITRE = "Titre";
const LABEL_DESCRIPTION = "Description";
const LABEL_TEMPS_DEBUT = "Temps début";
const LABEL_TEMPS_FIN = "Temps fin";
const LABEL_DUREE = "Durée en minute";
const LABEL_DEBUT = "Début : ";
const LABEL_FIN = "Fin : ";

/* boutons */
const BOUTON_ACCUEIL = "Accueil";
const BOUTON_DASHBOARD = "Dashboard";
const BOUTON_CALENDRIER_PERSO = "Calendrier perso";
const BOUTON_DECONNEXION = "Déconnexion";
const BOUTON_RECHARGER = "Recharger le groupe";
const BOUTON_SUPPRIMER_GROUPE = "Supprimer le groupe";
const BOUTON_QUITTER_GROUPE = "Quitter le groupe";
const BOUTON_ENVOYER_INVITATION = "Envoyer invitation";
const BOUTON_AJOUTER_ACTIVITE = "Ajouter activité";
const BOUTON_SUPPRIMER = "Supprimer";
const BOUTON_VIRER = "Virer";

/* roles */
const ROLE_CHEF = "Chef";
const ROLE_MEMBRE = "Membre";

/* calendrier */
const CALENDRIER_AUJOURD_HUI = "Aujourd hui";
const CALENDRIER_MOIS = "Mois";
const CALENDRIER_SEMAINE = "Semaine";
const CALENDRIER_JOUR = "Jour";
const CALENDRIER_HAUTEUR = "70vh";

/**
 * ce type sert juste pour fullcalendar
 * je garde juste les champ utile
 */
type EvenementCalendrier = {
  id: string;
  title: string;
  start: string;
  end: string;
};

export default function PageCalendrierGroupe() {
  const router = useRouter();

  /**
   * ici je lis les id depuis url
   * idEtudiant = personne connecter
   * idGroupe = groupe afficher
   */
  const params = useParams<{ idEtudiant: string; idGroupe: string }>();
  const idEtudiant = params.idEtudiant;
  const idGroupe = params.idGroupe;

  /* state principal */
  const [groupe, setGroupe] = useState<Groupe | null>(null);
  const [chargement, setChargement] = useState<boolean>(true);
  const [erreur, setErreur] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  /* state formulaire invitation */
  const [nomUtilisateurInvitation, setNomUtilisateurInvitation] =
    useState<string>("");
  const [titreInvitation, setTitreInvitation] = useState<string>(
    "Invitation de groupe"
  );
  const [messageInvitation, setMessageInvitation] = useState<string>(
    "Tu as recu une invitation dans le groupe"
  );

  /* state formulaire activite */
  const [titreActivite, setTitreActivite] = useState<string>("");
  const [descriptionActivite, setDescriptionActivite] = useState<string>("");
  const [tempsDebut, setTempsDebut] = useState<string>("");
  const [tempsFin, setTempsFin] = useState<string>("");
  const [dureeEnMinute, setDureeEnMinute] = useState<string>("60");

  /**
   * je vide les message avant une action
   * comme sa je garde lecran propre
   */
  function viderMessages() {
    setErreur("");
    setMessage("");
  }
//Animation Chargement
  function Chargement() {
  return <Spinner animation="border" />;
}
  /**
   * ici je charge le groupe depuis backend
   * je reutilise sa au debut et apres les action
   */
  async function chargerGroupe() {
    setChargement(true);
    viderMessages();

    try {
      const groupeCharge = await obtenirGroupeParId(idGroupe);
      setGroupe(groupeCharge);
    } catch (erreurCapturee: any) {
      setGroupe(null);
      setErreur(retournerErreur(erreurCapturee, ERREUR_SERVEUR));
    }

    setChargement(false);
  }

  /**
   * des que la page ouvre je charge le groupe
   * si idGroupe change je recharge aussi
   */
  useEffect(() => {
    if (idGroupe) {
      chargerGroupe();
    }
  }, [idGroupe]);

  /**
   * ici je check si la personne connecter
   * est bien le chef du groupe
   */
  function utilisateurEstChef(): boolean {
    if (groupe === null) {
      return false;
    }

    return groupe.chef.id === idEtudiant;
  }

  /**
   * sa lit le nom complet du chef
   */
  function lireNomChef(): string {
    if (groupe === null) {
      return "";
    }

    return groupe.chef.prenom + " " + groupe.chef.nom;
  }

  /**
   * sa compte les membre du groupe
   */
  function lireNombreMembres(): number {
    if (groupe === null) {
      return 0;
    }

    return groupe.etudiants.length;
  }

  /**
   * sa retourne le role en texte simple
   */
  function lireRole(): string {
    if (utilisateurEstChef()) {
      return ROLE_CHEF;
    }

    return ROLE_MEMBRE;
  }

  /**
   * ici je transforme les activite
   * dans le format attendu par fullcalendar
   */
  function construireEvenements(): EvenementCalendrier[] {
    const evenements: EvenementCalendrier[] = [];

    if (groupe === null) {
      return evenements;
    }

    if (groupe.horaire === null) {
      return evenements;
    }

    for (let i = 0; i < groupe.horaire.activites.length; i++) {
      const activite = groupe.horaire.activites[i];

      evenements.push({
        id: activite.id,
        title: activite.titre,
        start: activite.tempsDebut,
        end: activite.tempsFin,
      });
    }

    return evenements;
  }

  /**
   * ici je rend la date un peu plus lisible
   * si jamais la date est bizarre je retourne le texte brut
   */
  function formaterDateHeure(dateTexte: string): string {
    const date = new Date(dateTexte);

    if (Number.isNaN(date.getTime())) {
      return dateTexte;
    }

    return date.toLocaleString("fr-CA");
  }

  /**
   * ici je gere lenvoie dinvitation
   */
  async function soumettreInvitation(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    viderMessages();

    if (groupe === null) {
      setErreur(ERREUR_GROUPE_INTROUVABLE);
      return;
    }

    if (utilisateurEstChef() === false) {
      setErreur(ERREUR_SEUL_CHEF_INVITER);
      return;
    }

    if (nomUtilisateurInvitation.trim() === "") {
      setErreur(ERREUR_NOM_UTILISATEUR_OBLIGATOIRE);
      return;
    }

    try {
      await envoyerInvitationGroupe(
        nomUtilisateurInvitation,
        messageInvitation,
        TYPES_NOTIFICATION.NOUVELLE_GROUPE_INVITATION.valeur,
        groupe.id,
        titreInvitation,
        idEtudiant
      );

      setNomUtilisateurInvitation("");
      setMessage(MESSAGE_INVITATION_ENVOYEE);
    } catch (erreurCapturee: any) {
      setErreur(retournerErreur(erreurCapturee, ERREUR_SERVEUR));
    }
  }

  /**
   * ici je gere lajout dune activite
   * je valide les champ avant
   */
  async function soumettreActivite(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    viderMessages();

    if (groupe === null) {
      setErreur(ERREUR_GROUPE_INTROUVABLE);
      return;
    }

    if (utilisateurEstChef() === false) {
      setErreur(ERREUR_SEUL_CHEF_AJOUTER_ACTIVITE);
      return;
    }

    if (groupe.horaire === null) {
      setErreur(ERREUR_HORAIRE_GROUPE_INTROUVABLE);
      return;
    }

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

    const duree = Number(dureeEnMinute);

    if (Number.isNaN(duree) || duree <= 0) {
      setErreur(ERREUR_DUREE_INVALIDE);
      return;
    }

    try {
      await ajouterActivitePourGroupe(
        descriptionActivite,
        titreActivite,
        tempsDebut,
        tempsFin,
        groupe.horaire.id,
        duree
      );

      setTitreActivite("");
      setDescriptionActivite("");
      setTempsDebut("");
      setTempsFin("");
      setDureeEnMinute("60");
      setMessage(MESSAGE_ACTIVITE_AJOUTEE);

      await chargerGroupe();
    } catch (erreurCapturee: any) {
      setErreur(retournerErreur(erreurCapturee, ERREUR_SERVEUR));
    }
  }

  /**
   * ici je supprime une activite
   * puis je recharge le groupe
   */
  async function supprimerUneActivite(activiteId: string) {
    viderMessages();

    try {
      await retirerActivite(activiteId);
      setMessage(MESSAGE_ACTIVITE_SUPPRIMEE);
      await chargerGroupe();
    } catch (erreurCapturee: any) {
      setErreur(retournerErreur(erreurCapturee, ERREUR_SERVEUR));
    }
  }

  /**
   * ici je vire un membre du groupe
   * le bouton existe deja pas pour le chef
   * donc pas besoin de check en plus
   */
  async function retirerMembre(nomUtilisateurEtudiant: string) {
    viderMessages();

    if (utilisateurEstChef() === false) {
      setErreur(ERREUR_SEUL_CHEF_VIRER);
      return;
    }

    if (groupe === null) {
      setErreur(ERREUR_GROUPE_INTROUVABLE);
      return;
    }

    try {
      await virerEtudiantDuGroupe(nomUtilisateurEtudiant, idEtudiant, idGroupe);
      setMessage(MESSAGE_MEMBRE_RETIRE);
      await chargerGroupe();
    } catch (erreurCapturee: any) {
      setErreur(retournerErreur(erreurCapturee, ERREUR_SERVEUR));
    }
  }

  /**
   * ici un membre quitte le groupe
   */
  async function quitterLeGroupe() {
    viderMessages();

    try {
      await quitterGroupe(idGroupe, idEtudiant);
      GotoDashboard(router, idEtudiant);
    } catch (erreurCapturee: any) {
      setErreur(retournerErreur(erreurCapturee, ERREUR_SERVEUR));
    }
  }

  /**
   * ici le chef supprime le groupe
   */
  async function supprimerLeGroupe() {
    viderMessages();

    try {
      await supprimerGroupe(idGroupe, idEtudiant);
      GotoDashboard(router, idEtudiant);
    } catch (erreurCapturee: any) {
      setErreur(retournerErreur(erreurCapturee, ERREUR_SERVEUR));
    }
  }

  /**
   * ici je construit la liste des membre
   * un bouton virer apparait juste pour le chef
   */
  function afficherMembres() {
    if (groupe === null) {
      return <p className="mb-0">{TITRE_AUCUN_MEMBRE}</p>;
    }

    if (groupe.etudiants.length === 0) {
      return <p className="mb-0">{TITRE_AUCUN_MEMBRE}</p>;
    }

    return (
      <div className="list-group">
        {groupe.etudiants.map((etudiant) => {
          return (
            <div
              key={etudiant.nomUtilisateur}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <div>
                <div>
                  {etudiant.prenom} {etudiant.nom}
                </div>
                <div>{etudiant.nomUtilisateur}</div>
              </div>

              {utilisateurEstChef() &&
                etudiant.nomUtilisateur !== groupe.chef.nomUtilisateur && (
                  <button
                    type="button"
                    className="btn btn-sm btn-danger"
                    onClick={() => retirerMembre(etudiant.nomUtilisateur)}
                  >
                    {BOUTON_VIRER}
                  </button>
                )}
            </div>
          );
        })}
      </div>
    );
  }

  /**
   * ici je montre les activite en pile verticale
   * chaque activite a son bloc
   */
  function afficherActivites() {
    if (groupe === null) {
      return <p className="mb-0">{TITRE_AUCUNE_ACTIVITE}</p>;
    }

    if (groupe.horaire === null) {
      return <p className="mb-0">{TITRE_AUCUNE_ACTIVITE}</p>;
    }

    if (groupe.horaire.activites.length === 0) {
      return <p className="mb-0">{TITRE_AUCUNE_ACTIVITE}</p>;
    }

    return (
      <div className="d-flex flex-column gap-3">
        {groupe.horaire.activites.map((activite: Activite) => {
          return (
            <div key={activite.id} className="card">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <h6 className="mb-2">{activite.titre}</h6>
                    <div className="mb-2">{activite.description}</div>
                    <div>{LABEL_DEBUT + formaterDateHeure(activite.tempsDebut)}</div>
                    <div>{LABEL_FIN + formaterDateHeure(activite.tempsFin)}</div>
                  </div>

                  {utilisateurEstChef() && (
                    <button
                      type="button"
                      className="btn btn-sm btn-danger"
                      onClick={() => supprimerUneActivite(activite.id)}
                    >
                      {BOUTON_SUPPRIMER}
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  /**
   * ici je montre le bouton principal
   * chef = supprimer groupe
   * membre = quitter groupe
   */
  function afficherBlocActions() {
    if (groupe === null) {
      return null;
    }

    if (utilisateurEstChef()) {
      return (
        <div className="mt-3">
          <button
            type="button"
            className="btn btn-danger w-100"
            onClick={supprimerLeGroupe}
          >
            {BOUTON_SUPPRIMER_GROUPE}
          </button>
        </div>
      );
    }

    return (
      <div className="mt-3">
        <button
          type="button"
          className="btn btn-warning w-100"
          onClick={quitterLeGroupe}
        >
          {BOUTON_QUITTER_GROUPE}
        </button>
      </div>
    );
  }

  /**
   * ici je montre le bloc invitation
   * juste pour le chef
   */
  function afficherBlocInvitation() {
    if (groupe === null) {
      return null;
    }

    if (utilisateurEstChef() === false) {
      return null;
    }

    return (
      <div className="card mt-3">
        <div className="card-body">
          <h5 className="card-title">{TITRE_INVITATION}</h5>

          <form onSubmit={soumettreInvitation}>
            <div className="mb-3">
              <label className="form-label">{LABEL_NOM_UTILISATEUR}</label>
              <input
                type="text"
                className="form-control"
                value={nomUtilisateurInvitation}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setNomUtilisateurInvitation(e.target.value)
                }
              />
            </div>

            <div className="mb-3">
              <label className="form-label">{LABEL_TITRE_NOTIFICATION}</label>
              <input
                type="text"
                className="form-control"
                value={titreInvitation}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setTitreInvitation(e.target.value)
                }
              />
            </div>

            <div className="mb-3">
              <label className="form-label">{LABEL_MESSAGE_NOTIFICATION}</label>
              <textarea
                className="form-control"
                value={messageInvitation}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                  setMessageInvitation(e.target.value)
                }
              />
            </div>

            <button type="submit" className="btn btn-primary">
              {BOUTON_ENVOYER_INVITATION}
            </button>
          </form>
        </div>
      </div>
    );
  }

  /**
   * ici je montre le formulaire activite
   * juste pour le chef aussi
   */
  function afficherBlocAjoutActivite() {
    if (groupe === null) {
      return null;
    }

    if (utilisateurEstChef() === false) {
      return null;
    }

    return (
      <div className="card mt-3">
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

            <div className="mb-3">
              <label className="form-label">{LABEL_DUREE}</label>
              <input
                type="number"
                className="form-control"
                value={dureeEnMinute}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setDureeEnMinute(e.target.value)
                }
              />
            </div>

            <button type="submit" className="btn btn-success">
              {BOUTON_AJOUTER_ACTIVITE}
            </button>
          </form>
        </div>
      </div>
    );
  }

  /**
   * si sa charge je montre juste sa
   */
  if (chargement) {
    return (
      <div className="container-fluid p-4">
        {Chargement()}
      </div>
    );
  }

  /**
   * si erreur avant davoir le groupe
   * je montre juste le message
   */
  if (erreur !== "" && groupe === null) {
    return (
      <div className="container-fluid p-4">
        <h2>{erreur}</h2>
      </div>
    );
  }

  /**
   * dernier filet de securite
   */
  if (groupe === null) {
    return (
      <div className="container-fluid p-4">
        <h2>{ERREUR_GROUPE_INTROUVABLE}</h2>
      </div>
    );
  }

  /**
   * ici je construit toute la page
   * bootstrap simple et logique claire
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
            onClick={() => GotoDashboard(router, idEtudiant)}
          >
            {BOUTON_DASHBOARD}
          </button>

          <button
            type="button"
            className="btn btn-secondary me-2"
            onClick={() => GotoCalendar(router, idEtudiant)}
          >
            {BOUTON_CALENDRIER_PERSO}
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
          {message !== "" && <div className="alert alert-success">{message}</div>}
          {erreur !== "" && <div className="alert alert-danger">{erreur}</div>}
        </div>

        <div className="col-12 col-lg-4 mb-3">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">{groupe.nomGroupe}</h4>
              <p className="mb-2">{LABEL_CHEF + lireNomChef()}</p>
              <p className="mb-2">{LABEL_NOMBRE_MEMBRES + lireNombreMembres()}</p>
              <p className="mb-2">{LABEL_MON_ROLE + lireRole()}</p>

              <button
                type="button"
                className="btn btn-outline-primary w-100 mt-2"
                onClick={chargerGroupe}
              >
                {BOUTON_RECHARGER}
              </button>

              {afficherBlocActions()}
            </div>
          </div>

          <div className="card mt-3">
            <div className="card-body">
              <h5 className="card-title">{TITRE_MEMBRES}</h5>
              {afficherMembres()}
            </div>
          </div>

          {afficherBlocInvitation()}
          {afficherBlocAjoutActivite()}
        </div>

        <div className="col-12 col-lg-8 mb-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">{TITRE_CALENDRIER}</h5>

              <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin]}
                initialView="dayGridMonth"
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
      </div>
    </div>
  );
}