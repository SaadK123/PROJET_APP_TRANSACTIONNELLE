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
  const [notificationsOuvertes, setNotificationsOuvertes] = useState(false);

  function gotoHomePage() {
    router.push("/HomePage");
  }

  function gotoLogIn() {
    router.push("/SignIn");
  }

  function gotoSignUp() {
    router.push("/SignUp");
  }

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
      setErreur("Erreur lors du chargement du dashboard");
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
      setErreur("Erreur lors de la création du groupe");
    }
  }

  async function handleMarquerNotificationCommeVue(notification: Notification) {
    if (notification.estVu) return;

    try {
      await marquerNotificationCommeVue(notification.id);
      await chargerDonnees();
    } catch (e) {
      console.error(e);
      setErreur("Erreur lors de la mise à jour de la notification");
    }
  }

  async function handleSupprimerNotification(notification: Notification) {
    try {
      await supprimerNotification(notification.id);
      await chargerDonnees();
    } catch (e) {
      console.error(e);
      setErreur("Erreur lors de la suppression de la notification");
    }
  }

  useEffect(() => {
    if (idEtudiant) {
      chargerDonnees();
    }
  }, [idEtudiant]);

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

  const notifications = etudiant.notifications || [];
  const notificationsTriees = [...notifications].sort((a, b) => {
    if (a.estVu === b.estVu) return 0;
    return a.estVu ? 1 : -1;
  });

  const nombreNotificationsNonVues = notifications.filter(
    (notification) => !notification.estVu,
  ).length;

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
              className="ps-2 pe-2 mt-3 text-dark rounded bg-light border"
              type="button"
            >
              Tableau de bord
            </button>
            <button
              className="ps-2 pe-2 ms-2 me-2 text-dark rounded bg-light border"
              type="button"
            >
              Mes groupes
            </button>
            <button
              className="ps-2 pe-2 me-2 text-dark rounded bg-light border"
              type="button"
            >
              Calendrier
            </button>
          </div>

          <div className="col-4 col-md-3 p-3 text-center">
            <button
              onClick={() => setNotificationsOuvertes(true)}
              className="ps-3 pe-3 mt-3 me-2 position-relative"
              type="button"
            >
              ☰ Notifications
              {nombreNotificationsNonVues > 0 && (
                <span
                  className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                  style={{ fontSize: "0.7rem" }}
                >
                  {nombreNotificationsNonVues}
                </span>
              )}
            </button>

            <button
              onClick={gotoLogIn}
              className="ps-3 pe-3 mt-3 me-2"
              type="button"
            >
              Déconnexion
            </button>

            <button
              onClick={gotoSignUp}
              className="ps-2 pe-2 rounded bg-success text-white"
              type="button"
            >
              Inscription
            </button>
          </div>
        </div>

        <div className="row">
          <div className="col-12 col-md-4 p-4">
            <h2>Bienvenue {etudiant.prenom}</h2>

            <div className="mt-4">
              <p>
                <strong>Prénom :</strong> {etudiant.prenom}
              </p>
              <p>
                <strong>Nom :</strong> {etudiant.nom}
              </p>
              <p>
                <strong>Courriel :</strong> {etudiant.courriel}
              </p>
              <p>
                <strong>Nom utilisateur :</strong> {etudiant.nomUtilisateur}
              </p>
              <p>
                <strong>École :</strong> {etudiant.ecole}
              </p>
            </div>

            <div className="mt-5">
              <h3>Créer un groupe</h3>

              <div className="mb-3">
                <label>Nom du groupe</label>
                <input
                  value={nomNouveauGroupe}
                  onChange={(e) => setNomNouveauGroupe(e.currentTarget.value)}
                  type="text"
                  className="form-control"
                />
              </div>

              <div className="d-grid">
                <button
                  onClick={handleCreerGroupe}
                  className="btn btn-primary"
                  type="button"
                >
                  Créer le groupe
                </button>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-8 p-4">
            <h2>Mes groupes</h2>

            {groupes.length === 0 ? (
              <p>Aucun groupe pour le moment.</p>
            ) : (
              <div className="row">
                {groupes.map((groupe) => (
                  <div className="col-12 col-md-6 mb-3" key={groupe.id}>
                    <div className="border rounded p-3 bg-white">
                      <h4>{groupe.nomGroupe}</h4>
                      <p className="mb-1">
                        <strong>Chef :</strong>{" "}
                        {groupe.chef
                          ? `${groupe.chef.prenom} ${groupe.chef.nom}`
                          : "Non défini"}
                      </p>
                      <p className="mb-0">
                        <strong>Nombre d'étudiants :</strong>{" "}
                        {groupe.etudiants ? groupe.etudiants.length : 0}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {notificationsOuvertes && (
        <>
          <div
            onClick={() => setNotificationsOuvertes(false)}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0,0,0,0.35)",
              zIndex: 1040,
            }}
          />

          <div
            style={{
              position: "fixed",
              top: 0,
              right: 0,
              width: "380px",
              maxWidth: "100%",
              height: "100vh",
              backgroundColor: "white",
              zIndex: 1050,
              borderLeft: "1px solid #ddd",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div className="p-3 border-bottom d-flex justify-content-between align-items-center">
              <div>
                <h4 className="mb-1">Notifications</h4>
                <small className="text-muted">
                  {notifications.length} notification
                  {notifications.length > 1 ? "s" : ""}
                </small>
              </div>

              <button
                onClick={() => setNotificationsOuvertes(false)}
                className="btn btn-sm btn-outline-dark"
                type="button"
              >
                X
              </button>
            </div>

            <div
              className="p-3"
              style={{
                overflowY: "auto",
                flex: 1,
              }}
            >
              {notificationsTriees.length === 0 ? (
                <p>Aucune notification.</p>
              ) : (
                notificationsTriees.map((notification) => (
                  <div
                    key={notification.id}
                    className={`border rounded p-3 mb-3 ${
                      notification.estVu ? "bg-white" : "bg-light"
                    }`}
                  >
                    <h6 className="mb-2">{notification.titre}</h6>

                    <p className="mb-2">{notification.message}</p>

                    <p className="mb-2">
                      <small className="text-muted">
                        {new Date(notification.tempsCreation).toLocaleString(
                          "fr-CA",
                        )}
                      </small>
                    </p>

                    <p className="mb-3">
                      <small>
                        <strong>Type :</strong> {notification.type}
                      </small>
                    </p>

                    <div className="d-flex gap-2">
                      {!notification.estVu && (
                        <button
                          onClick={() =>
                            handleMarquerNotificationCommeVue(notification)
                          }
                          className="btn btn-sm btn-outline-primary"
                          type="button"
                        >
                          Marquer comme vue
                        </button>
                      )}

                      <button
                        onClick={() =>
                          handleSupprimerNotification(notification)
                        }
                        className="btn btn-sm btn-outline-danger"
                        type="button"
                      >
                        Supprimer
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
