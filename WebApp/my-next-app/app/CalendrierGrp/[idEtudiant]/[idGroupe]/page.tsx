"use client";

import { useEffect, useState } from "react";
import type { ChangeEvent, FormEvent, ReactNode } from "react";
import { useParams, useRouter } from "next/navigation";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

import { ajouterActivitePourGroupe, retirerActivite } from "@/app/FetchMethodesActivites";
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
import type { Activite, Etudiant, Groupe } from "@/app/TypesObjets";

/**
 * Ce type prepare les donnees pour le calendrier.
 * Je garde seulement les champs utiles pour afficher
 * les activites sans ajouter de structure en trop.
 */
type EvenementCalendrier = {
  id: string;
  title: string;
  start: string;
  end: string;
};

export default function PageCalendrierGroupe() {
  // je garde le router pour changer de page
  const router = useRouter();

  /**
   * Cette partie lit les deux ids dans l url.
   * Le premier id sert a savoir quel etudiant est connecte.
   * Le deuxieme id sert a retrouver le bon groupe.
   */
  const params = useParams<{ idEtudiant: string; idGroupe: string }>();
  const idEtudiant = params.idEtudiant;
  const idGroupe = params.idGroupe;

  // ce state contient le groupe charge depuis le backend
  const [groupe, setGroupe] = useState<Groupe | null>(null);

  // ce state sert a afficher le texte de chargement
  const [chargement, setChargement] = useState<boolean>(true);

  // ce state garde le dernier message erreur
  const [erreur, setErreur] = useState<string>("");

  // ce state garde le dernier message succes
  const [message, setMessage] = useState<string>("");

  /**
   * Ces states servent au formulaire d invitation.
   * Je garde le nom utilisateur vise, puis le titre
   * et le message qui seront envoyes dans la notification.
   */
  const [nomUtilisateurInvitation, setNomUtilisateurInvitation] = useState<string>("");
  const [titreInvitation, setTitreInvitation] = useState<string>("Invitation de groupe");
  const [messageInvitation, setMessageInvitation] = useState<string>(
    "Tu as recu une invitation dans le groupe"
  );

  /**
   * Dans ce bloc je garde tous les champs utiles
   * pour la creation d une activite de groupe.
   * Tout reste en texte pour que le code soit simple.
   */
  const [titreActivite, setTitreActivite] = useState<string>("");
  const [descriptionActivite, setDescriptionActivite] = useState<string>("");
  const [tempsDebut, setTempsDebut] = useState<string>("");
  const [tempsFin, setTempsFin] = useState<string>("");
  const [dureeEnMinute, setDureeEnMinute] = useState<string>("60");

  /**
   * Cette fonction transforme une erreur en texte simple.
   * Je passe par retournerErreur quand c est possible.
   * Si quelque chose se passe mal, je retombe sur un message par defaut.
   */
  function lireErreur(erreurCapturee: unknown): string {
    try {
      const attraperErreur = retournerErreur as (
        erreur: unknown,
        messageDefaut: string
      ) => string;

      const messageLu = attraperErreur(erreurCapturee, "erreur serveur");

      if (typeof messageLu === "string") {
        if (messageLu.trim() !== "") {
          return messageLu;
        }
      }
    } catch {
      return "erreur serveur";
    }

    return "erreur serveur";
  }

  // je nettoie les deux messages avant une action
  function viderMessages() {
    setErreur("");
    setMessage("");
  }

  /**
   * Cette fonction va chercher le groupe dans le backend.
   * Je l utilise au depart puis apres les actions importantes
   * pour garder les donnees de la page a jour.
   */
  async function chargerGroupe() {
    setChargement(true);
    viderMessages();

    try {
      const groupeCharge = await obtenirGroupeParId(idGroupe);
      setGroupe(groupeCharge);
    } catch (erreurCapturee) {
      setErreur(lireErreur(erreurCapturee));
    }

    setChargement(false);
  }

  /**
   * Des que la page ouvre, je charge le groupe.
   * Si l id du groupe change, je relance aussi ce chargement.
   */
  useEffect(() => {
    chargerGroupe();
  }, [idGroupe]);

  /**
   * Cette verification sert a savoir si la personne connectee
   * correspond bien au chef du groupe.
   * Le resultat est reutilise dans plusieurs parties de la page.
   */
  function utilisateurEstChef(): boolean {
    if (groupe === null) {
      return false;
    }

    if (groupe.chef.id === idEtudiant) {
      return true;
    }

    return false;
  }

  // je prepare le nom complet du chef pour l affichage
  function lireNomChef(): string {
    if (groupe === null) {
      return "";
    }

    return groupe.chef.prenom + " " + groupe.chef.nom;
  }

  // cette petite fonction donne le nombre total de membres
  function lireNombreMembres(): number {
    if (groupe === null) {
      return 0;
    }

    return groupe.etudiants.length;
  }

  /**
   * Je transforme le role en texte simple.
   * Cela evite de remettre la meme verification directement
   * dans la partie visuelle de la page.
   */
  function lireRole(): string {
    if (utilisateurEstChef()) {
      return "Chef";
    }

    return "Membre";
  }

  /**
   * Ce passage transforme les activites du groupe
   * dans le format attendu par FullCalendar.
   * Je parcours la liste une par une pour rester direct.
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
   * Cette fonction gere l envoi d une invitation.
   * Je controle d abord les cas simples comme le groupe absent,
   * le role non autorise et le champ vide.
   */
  async function soumettreInvitation(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    viderMessages();

    if (groupe === null) {
      setErreur("groupe introuvable");
      return;
    }

    if (utilisateurEstChef() === false) {
      setErreur("seul le chef peut inviter");
      return;
    }

    if (nomUtilisateurInvitation.trim() === "") {
      setErreur("nom utilisateur obligatoire");
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
      setMessage("invitation envoyee");
    } catch (erreurCapturee) {
      setErreur(lireErreur(erreurCapturee));
    }
  }

  /**
   * Cette fonction ajoute une activite dans l horaire du groupe.
   * Je verifie les champs un a un pour eviter les appels inutiles.
   * Si tout marche, je vide le formulaire puis je recharge le groupe.
   */
  async function soumettreActivite(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    viderMessages();

    if (groupe === null) {
      setErreur("groupe introuvable");
      return;
    }

    if (utilisateurEstChef() === false) {
      setErreur("seul le chef peut ajouter une activite");
      return;
    }

    if (groupe.horaire === null) {
      setErreur("horaire du groupe introuvable");
      return;
    }

    if (titreActivite.trim() === "") {
      setErreur("titre obligatoire");
      return;
    }

    if (descriptionActivite.trim() === "") {
      setErreur("description obligatoire");
      return;
    }

    if (tempsDebut.trim() === "") {
      setErreur("temps debut obligatoire");
      return;
    }

    if (tempsFin.trim() === "") {
      setErreur("temps fin obligatoire");
      return;
    }

    const duree = Number(dureeEnMinute);

    if (Number.isNaN(duree)) {
      setErreur("duree invalide");
      return;
    }

    if (duree <= 0) {
      setErreur("duree invalide");
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
      setMessage("activite ajoutee");

      await chargerGroupe();
    } catch (erreurCapturee) {
      setErreur(lireErreur(erreurCapturee));
    }
  }

  /**
   * Dans cette action je supprime une activite par son id.
   * Juste apres, je recharge le groupe pour revoir la liste
   * et le calendrier avec les donnees a jour.
   */
  async function supprimerUneActivite(activiteId: string) {
    viderMessages();

    try {
      await retirerActivite(activiteId);
      setMessage("activite supprimee");
      await chargerGroupe();
    } catch (erreurCapturee) {
      setErreur(lireErreur(erreurCapturee));
    }
  }

  /**
   * Cette fonction retire un membre du groupe.
   * Je bloque le cas ou le chef essayerait de se retirer lui meme.
   * Quand tout passe, je recharge les donnees du groupe.
   */
  async function retirerMembre(etudiant: Etudiant) {
    viderMessages();

    if (utilisateurEstChef() === false) {
      setErreur("seul le chef peut virer un membre");
      return;
    }

    if (etudiant.id === idEtudiant) {
      setErreur("le chef ne peut pas se virer lui meme");
      return;
    }

    try {
      await virerEtudiantDuGroupe(etudiant.id, idEtudiant, idGroupe);
      setMessage("membre vire du groupe");
      await chargerGroupe();
    } catch (erreurCapturee) {
      setErreur(lireErreur(erreurCapturee));
    }
  }

  /**
   * Je quitte le groupe puis je repars vers le tableau de bord.
   * Cette action sert au membre normal et ne montre pas
   * de fenetre de confirmation.
   */
  async function quitterLeGroupe() {
    viderMessages();

    try {
      await quitterGroupe(idGroupe, idEtudiant);
      GotoDashboard(router, idEtudiant);
    } catch (erreurCapturee) {
      setErreur(lireErreur(erreurCapturee));
    }
  }

  /**
   * Ce bloc supprime le groupe complet.
   * Quand la suppression passe, je redirige
   * directement vers le tableau de bord.
   */
  async function supprimerLeGroupe() {
    viderMessages();

    try {
      await supprimerGroupe(idGroupe, idEtudiant);
      GotoDashboard(router, idEtudiant);
    } catch (erreurCapturee) {
      setErreur(lireErreur(erreurCapturee));
    }
  }

  // cette fonction fabrique le message succes
  function afficherMessageSucces(): ReactNode {
    if (message === "") {
      return null;
    }

    return <div className="alert alert-success">{message}</div>;
  }

  // je fabrique le message erreur seulement s il existe
  function afficherMessageErreur(): ReactNode {
    if (erreur === "") {
      return null;
    }

    return <div className="alert alert-danger">{erreur}</div>;
  }

  /**
   * Dans cette partie je construis la liste des membres.
   * Le bouton Virer apparait seulement pour le chef
   * et jamais sur la propre ligne du chef.
   */
  function afficherMembres(): ReactNode {
    if (groupe === null) {
      return <p className="mb-0">aucun membre</p>;
    }

    if (groupe.etudiants.length === 0) {
      return <p className="mb-0">aucun membre</p>;
    }

    return (
      <div className="list-group">
        {groupe.etudiants.map((etudiant) => {
          let boutonVirer: ReactNode = null;

          if (utilisateurEstChef()) {
            if (etudiant.id !== idEtudiant) {
              boutonVirer = (
                <button
                  type="button"
                  className="btn btn-sm btn-danger"
                  onClick={() => retirerMembre(etudiant)}
                >
                  Virer
                </button>
              );
            }
          }

          return (
            <div
              key={etudiant.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <div>
                <div>{etudiant.prenom} {etudiant.nom}</div>
                <div>{etudiant.nomUtilisateur}</div>
              </div>

              <div>{boutonVirer}</div>
            </div>
          );
        })}
      </div>
    );
  }

  /**
   * Ce bloc montre les activites en liste simple.
   * Je laisse aussi un bouton supprimer a droite
   * quand la personne connectee est le chef.
   */
  function afficherActivites(): ReactNode {
    if (groupe === null) {
      return <p className="mb-0">aucune activite</p>;
    }

    if (groupe.horaire === null) {
      return <p className="mb-0">aucune activite</p>;
    }

    if (groupe.horaire.activites.length === 0) {
      return <p className="mb-0">aucune activite</p>;
    }

    return (
      <div className="list-group">
        {groupe.horaire.activites.map((activite: Activite) => {
          let boutonSupprimer: ReactNode = null;

          if (utilisateurEstChef()) {
            boutonSupprimer = (
              <button
                type="button"
                className="btn btn-sm btn-danger"
                onClick={() => supprimerUneActivite(activite.id)}
              >
                Supprimer
              </button>
            );
          }

          return (
            <div
              key={activite.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <div>
                <div>{activite.titre}</div>
                <div>{activite.description}</div>
                <div>Debut : {activite.tempsDebut}</div>
                <div>Fin : {activite.tempsFin}</div>
              </div>

              <div>{boutonSupprimer}</div>
            </div>
          );
        })}
      </div>
    );
  }

  /**
   * Cette fonction choisit le gros bouton principal.
   * Le chef voit la suppression du groupe.
   * Le membre simple voit le bouton pour partir.
   */
  function afficherBlocActions(): ReactNode {
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
            Supprimer le groupe
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
          Quitter le groupe
        </button>
      </div>
    );
  }

  /**
   * Ce formulaire sert a inviter un etudiant
   * a partir de son nom utilisateur.
   * Je cache tout ce bloc pour les membres simples.
   */
  function afficherBlocInvitation(): ReactNode {
    if (groupe === null) {
      return null;
    }

    if (utilisateurEstChef() === false) {
      return null;
    }

    return (
      <div className="card mt-3">
        <div className="card-body">
          <h5 className="card-title">Inviter un etudiant</h5>

          <form onSubmit={soumettreInvitation}>
            <div className="mb-3">
              <label className="form-label">Nom utilisateur</label>
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
              <label className="form-label">Titre notification</label>
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
              <label className="form-label">Message notification</label>
              <textarea
                className="form-control"
                value={messageInvitation}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                  setMessageInvitation(e.target.value)
                }
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Envoyer invitation
            </button>
          </form>
        </div>
      </div>
    );
  }

  /**
   * Ce formulaire sert a ajouter une activite au groupe.
   * Je le garde volontairement simple avec des champs directs
   * et sans mise en page compliquee.
   */
  function afficherBlocAjoutActivite(): ReactNode {
    if (groupe === null) {
      return null;
    }

    if (utilisateurEstChef() === false) {
      return null;
    }

    return (
      <div className="card mt-3">
        <div className="card-body">
          <h5 className="card-title">Ajouter une activite</h5>

          <form onSubmit={soumettreActivite}>
            <div className="mb-3">
              <label className="form-label">Titre</label>
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
              <label className="form-label">Description</label>
              <textarea
                className="form-control"
                value={descriptionActivite}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                  setDescriptionActivite(e.target.value)
                }
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Temps debut</label>
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
              <label className="form-label">Temps fin</label>
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
              <label className="form-label">Duree en minute</label>
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
              Ajouter activite
            </button>
          </form>
        </div>
      </div>
    );
  }

  /**
   * Pendant le chargement je montre juste un texte brut.
   * Je ne cherche pas a faire plus joli que necessaire.
   */
  if (chargement) {
    return (
      <div className="container-fluid p-4">
        <h2>Chargement...</h2>
      </div>
    );
  }

  /**
   * Si une erreur arrive avant que le groupe existe,
   * je montre ce grand message a la place de la page.
   */
  if (erreur !== "") {
    if (groupe === null) {
      return (
        <div className="container-fluid p-4">
          <h2>{erreur}</h2>
        </div>
      );
    }
  }

  // dernier filet de securite si aucun groupe n est disponible
  if (groupe === null) {
    return (
      <div className="container-fluid p-4">
        <h2>Groupe introuvable</h2>
      </div>
    );
  }

  /**
   * Cette partie assemble toute la page.
   * Je garde un style tres simple en bootstrap
   * avec la logique comme vraie priorite.
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
            Accueil
          </button>

          <button
            type="button"
            className="btn btn-secondary me-2"
            onClick={() => GotoDashboard(router, idEtudiant)}
          >
            Dashboard
          </button>

          <button
            type="button"
            className="btn btn-secondary me-2"
            onClick={() => GotoCalendar(router, idEtudiant)}
          >
            Calendrier perso
          </button>
        </div>

        <div className="col-12 col-md-4 text-md-center mb-2 mb-md-0">
          <h3 className="mb-0">Calendrier de groupe</h3>
        </div>

        <div className="col-12 col-md-4 text-md-end">
          <button
            type="button"
            className="btn btn-dark"
            onClick={() => GotoLogin(router)}
          >
            Deconnexion
          </button>
        </div>
      </div>

      <div className="row p-3">
        <div className="col-12">
          {afficherMessageSucces()}
          {afficherMessageErreur()}
        </div>

        <div className="col-12 col-lg-4 mb-3">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">{groupe.nomGroupe}</h4>
              <p className="mb-2">Chef : {lireNomChef()}</p>
              <p className="mb-2">Nombre de membres : {lireNombreMembres()}</p>
              <p className="mb-2">Mon role : {lireRole()}</p>

              <button
                type="button"
                className="btn btn-outline-primary w-100 mt-2"
                onClick={chargerGroupe}
              >
                Recharger le groupe
              </button>

              {afficherBlocActions()}
            </div>
          </div>

          <div className="card mt-3">
            <div className="card-body">
              <h5 className="card-title">Membres du groupe</h5>
              {afficherMembres()}
            </div>
          </div>

          {afficherBlocInvitation()}
          {afficherBlocAjoutActivite()}
        </div>

        <div className="col-12 col-lg-8 mb-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Calendrier</h5>

              <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                headerToolbar={{
                  left: "prev,next today",
                  center: "title",
                  right: "dayGridMonth,timeGridWeek,timeGridDay",
                }}
                buttonText={{
                  today: "Aujourd hui",
                  month: "Mois",
                  week: "Semaine",
                  day: "Jour",
                }}
                events={construireEvenements()}
                height="70vh"
              />
            </div>
          </div>

          <div className="card mt-3">
            <div className="card-body">
              <h5 className="card-title">Liste des activites</h5>
              {afficherActivites()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}