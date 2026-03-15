"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { obtenirEtudiantParId } from "@/app/FetchsMethodesEtudiants";
import {
  obtenirGroupesDeEtudiant,
  creerGroupe,
} from "@/app/FetchMethodesGroupes";
import {
  marquerNotificationCommeVue,
  supprimerNotification,
} from "@/app/FetchMethodesNotifications";
import type { Etudiant, Groupe, Notification } from "@/app/TypesObjets";

export default function DashBoard() {
  const params = useParams<{ id: string }>();
  const idEtudiant = params.id;
  const router = useRouter();

  const [etudiant, setEtudiant] = useState<Etudiant | null>(null);
  const [groupes, setGroupes] = useState<Groupe[]>([]);
  const [nomNouveauGroupe, setNomNouveauGroupe] = useState("");
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState("");
  const [notificationOuverteId, setNotificationOuverteId] = useState<
    string | null
  >(null);

  function gotoHomePage() {
    router.push("/HomePage");
  }

  function gotoLogIn() {
    router.push("/SignIn");
  }

  function gotoCalendrier() {
    router.push(`/calendrier/${idEtudiant}`);
  }

const gotoGroupCalendar = (idGroupe: string) => {
  router.push(`/CalendrierGrp/${idEtudiant}/${idGroupe}`);
};
function gotoParametre() {
  router.push(`/Parametres/${idEtudiant}`);
};

  async function chargerDonnees() {
    try {
      setChargement(true);
      setErreur("");

      const etudiantCharge = await obtenirEtudiantParId(idEtudiant);
      const groupesCharges = await obtenirGroupesDeEtudiant(idEtudiant);

      setEtudiant(etudiantCharge);
      setGroupes(groupesCharges);
    } catch (e) {
      console.error(e);
      setErreur("Erreur chargement");
    } finally {
      setChargement(false);
    }
  }

  async function handleCreerGroupe() {
    if (!etudiant) return;
    if (!nomNouveauGroupe.trim()) return;

    try {
      await creerGroupe(etudiant.id, nomNouveauGroupe);
      setNomNouveauGroupe("");
      await chargerDonnees();
    } catch (e) {
      console.error(e);
      setErreur("Erreur creation groupe");
    }
  }

  async function handleOuvrirNotification(notification: Notification) {
    if (notificationOuverteId === notification.id) {
      setNotificationOuverteId(null);
      return;
    }

    setNotificationOuverteId(notification.id);

    if (!notification.estVu) {
      try {
        await marquerNotificationCommeVue(notification.id);
        await chargerDonnees();
      } catch (e) {
        console.error(e);
      }
    }
  }

  async function handleSupprimerNotification(notification: Notification) {
    try {
      await supprimerNotification(notification.id);

      if (notificationOuverteId === notification.id) {
        setNotificationOuverteId(null);
      }

      await chargerDonnees();
    } catch (e) {
      console.error(e);
      setErreur("Erreur suppression notification");
    }
  }

  useEffect(() => {
    if (idEtudiant) {
      chargerDonnees();
    }
  }, [idEtudiant]);

  if (chargement) {
    return (
      <div className="homepage-background min-vh-100">
        <div className="container-fluid">
          <div className="row bg-white">
            <div className="col-12 p-4">
              <h2>Chargement...</h2>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (erreur && !etudiant) {
    return (
      <div className="homepage-background min-vh-100">
        <div className="container-fluid">
          <div className="row bg-white">
            <div className="col-12 p-4">
              <h2>{erreur}</h2>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!etudiant) {
    return (
      <div className="homepage-background min-vh-100">
        <div className="container-fluid">
          <div className="row bg-white">
            <div className="col-12 p-4">
              <h2>Aucun étudiant trouvé</h2>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const notifications = etudiant.notifications || [];

  return (
    <div className="homepage-background min-vh-100">
      <div className="container-fluid">
        <div className="row bg-white">
          <div className="col-1">
            <button onClick={gotoHomePage} className="border-0 bg-white">
              <img
                className="homepage-logo p-2"
                src="/Img/LogoLinkUp.png"
                alt="Logo"
              />
            </button>
          </div>

          <div className="col-9 p-3 text-end">
            <button className="ps-2 pe-2 mt-3 me-2" type="button">
              Tableau de bord
            </button>

            <button
              onClick={gotoCalendrier}
              className="ps-2 pe-2 mt-3 me-2"
              type="button"
            >
              Calendrier
            </button>

            <button 
            onClick={gotoParametre}
            className="ps-2 pe-2 mt-3" type="button">
              Paramètres
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
        </div>

        <div className="row pt-4 text-center">
          <h1>Bienvenue {etudiant.prenom}</h1>
        </div>

        {erreur && (
          <div className="row pt-3">
            <div className="col-10 mx-auto">
              <p>{erreur}</p>
            </div>
          </div>
        )}

        <div className="row p-5 mx-5 mt-4 bg-white">
          <div className="col-12 col-lg-4 mb-4">
            <h3>Profil</h3>

            <div className="mt-4">
              <p>Prénom : {etudiant.prenom}</p>
              <p>Nom : {etudiant.nom}</p>
              <p>Courriel : {etudiant.courriel}</p>
              <p>Nom utilisateur : {etudiant.nomUtilisateur}</p>
              <p>École : {etudiant.ecole}</p>
            </div>

            <div className="mt-5">
              <h4>Créer un groupe</h4>

              <div className="mb-3">
                <label>Nom du groupe</label>
                <input
                  value={nomNouveauGroupe}
                  onChange={(e) => setNomNouveauGroupe(e.currentTarget.value)}
                  type="text"
                  className="form-control"
                />
              </div>

              <button
                onClick={handleCreerGroupe}
                className="btn btn-primary"
                type="button"
              >
                Ajouter groupe
              </button>
            </div>
          </div>

          <div className="col-12 col-lg-4 mb-4">
            <h3>Mes groupes</h3>

            {groupes.length === 0 ? (
              <p className="mt-4">Aucun groupe</p>
            ) : (
              <div className="mt-4">
                {groupes.map((groupe) => (
                  <div key={groupe.id} className="border p-3 mb-3">
                    <p>{groupe.nomGroupe}</p>

                    <p>
                      Chef :{" "}
                      {groupe.chef
                        ? `${groupe.chef.prenom} ${groupe.chef.nom}`
                        : "Non défini"}
                    </p>

                    <p>
                      Étudiants :{" "}
                      {groupe.etudiants ? groupe.etudiants.length : 0}
                    </p>

                    <button
                      onClick={() => gotoGroupCalendar(groupe.id)}
                      className="btn btn-sm btn-outline-primary mt-2"
                      type="button"
                    >
                      Voir tout
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="col-12 col-lg-4">
            <h3>Notifications</h3>

            {notifications.length === 0 ? (
              <p className="mt-4">Aucune notification</p>
            ) : (
              <div className="mt-4">
                {notifications.map((notification) => {
                  const estOuverte = notificationOuverteId === notification.id;

                  return (
                    <div key={notification.id} className="border p-3 mb-3">
                      <button
                        onClick={() => handleOuvrirNotification(notification)}
                        className="border-0 bg-white text-start w-100 p-0"
                        type="button"
                      >
                        {notification.titre}
                        {!notification.estVu ? " (nouveau)" : ""}
                      </button>

                      {estOuverte && (
                        <div className="mt-3">
                          <p>{notification.message}</p>
                          <p>
                            {new Date(
                              notification.tempsCreation,
                            ).toLocaleString("fr-CA")}
                          </p>

                          <button
                            onClick={() =>
                              handleSupprimerNotification(notification)
                            }
                            className="btn btn-sm btn-outline-dark"
                            type="button"
                          >
                            Supprimer
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
          );
}
