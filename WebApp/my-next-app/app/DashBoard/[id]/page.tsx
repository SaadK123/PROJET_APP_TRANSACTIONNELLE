"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getEtudiantById } from "@/app/FetchsMethodesEtudiants";
import {
  getGroupsFromEtudiant,
  ajouterEtudiantDansGroupe,
} from "@/app/FetchMethodesGroupes";
import {
  setNotificationToWasSeen,
  deleteNotification,
} from "@/app/FetchMethodesNotifications";
import {
  Etudiant,
  Groupe,
  Notification,
  Invitation,
  TYPES_NOTIFICATION,
} from "@/app/TypesObjets";

export default function DashBoard() {
  const params = useParams<{ idEtudiant: string }>();
  const idEtudiant = params.idEtudiant;
  const router = useRouter();

  const [etudiant, setEtudiant] = useState<Etudiant | null>(null);
  const [groupes, setGroupes] = useState<Groupe[]>([]);
  const [loading, setLoading] = useState(true);
  const [erreur, setErreur] = useState("");
  const [notificationsOuvertes, setNotificationsOuvertes] = useState(false);

  async function chargerPage() {
    try {
      setLoading(true);
      

      const etudiantCharge = await getEtudiantById(idEtudiant);
      const groupesCharges = await getGroupsFromEtudiant(idEtudiant);

      setEtudiant(etudiantCharge);
      setGroupes(groupesCharges);
    } catch (e) {
      setErreur("Impossible de charger le tableau de bord.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (idEtudiant) {
      chargerPage();
    }
  }, [idEtudiant]);

  function retournerAccueil() {
    router.push("/HomePage");
  }

  function deconnecter() {
    router.push("/SignIn");
  }

  function estInvitation(notification: Notification) {
    return (
      notification.type.valeur ===
      TYPES_NOTIFICATION.NEW_GROUP_INVITATION.valeur
    );
  }

  async function marquerCommeVue(notification: Notification) {
    if (notification.estVu) return;

    try {
      await setNotificationToWasSeen(notification.id);
      await chargerPage();
    } catch (e) {
      console.error(e);
    }
  }

  async function supprimerNotificationSimple(notification: Notification) {
    try {
      await deleteNotification(notification.id);
      await chargerPage();
    } catch (e) {
      console.error(e);
    }
  }

  async function refuserInvitation(notification: Notification) {
    try {
      await deleteNotification(notification.id);
      await chargerPage();
    } catch (e) {
      console.error(e);
    }
  }

  async function accepterInvitation(notification: Notification) {
    if (!etudiant) return;

    try {
      const invitation = notification as Invitation;

      await ajouterEtudiantDansGroupe(invitation.group.id, etudiant.id);
      await deleteNotification(notification.id);
      await chargerPage();
    } catch (e) {
      console.error(e);
    }
  }

  const notifications = etudiant ? etudiant.notifications : [];

  let nombreNotificationsNonVues = 0;
  let aNotificationsNonVues = false;

  const notificationsNonVues: Notification[] = [];
  const notificationsVues: Notification[] = [];

  for (let i = 0; i < notifications.length; i++) {
    const notification = notifications[i];

    if (notification.estVu) {
      notificationsVues.push(notification);
    } else {
      notificationsNonVues.push(notification);
      nombreNotificationsNonVues++;
      aNotificationsNonVues = true;
    }
  }

  const notificationsAffichees = notificationsNonVues.concat(notificationsVues);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f5f7fb]">
        <div className="text-2xl font-semibold text-gray-700">
          Chargement...
        </div>
      </div>
    );
  }

  if (erreur || !etudiant) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#f5f7fb] gap-4">
        <div className="text-2xl font-semibold text-red-600">
          {erreur || "Étudiant introuvable."}
        </div>

        <button
          onClick={deconnecter}
          className="px-5 py-2 rounded-lg bg-blue-600 text-white font-semibold"
          type="button"
        >
          Retour à la connexion
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f7fb]">
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-[1500px] mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button onClick={retournerAccueil} className="shrink-0">
              <img
                className="w-16 h-16 object-contain"
                src="/Img/LogoLinkUp.png"
                alt="Logo"
              />
            </button>

            <div className="hidden md:flex items-center gap-3">
              <button
                className="px-4 py-2 rounded-lg bg-blue-100 text-blue-900 border border-blue-300 font-semibold"
                type="button"
              >
                Tableau de bord
              </button>

              <button
                className="px-4 py-2 rounded-lg bg-gray-100 text-gray-800 border border-gray-300 font-semibold cursor-default"
                type="button"
              >
                Mes groupes
              </button>

              <button
                className="px-4 py-2 rounded-lg bg-gray-100 text-gray-800 border border-gray-300 font-semibold cursor-default"
                type="button"
              >
                Calendrier
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setNotificationsOuvertes(true)}
              className="relative w-12 h-12 rounded-xl border-2 border-gray-300 bg-white flex items-center justify-center shadow-sm hover:bg-gray-50"
              type="button"
            >
              <span className="text-2xl">☰</span>

              {aNotificationsNonVues && (
                <span className="absolute top-1.5 right-1.5 w-3.5 h-3.5 rounded-full bg-blue-500 border-2 border-white"></span>
              )}
            </button>

            <div className="dropdown">
              <button
                className="px-4 py-3 rounded-2xl border-2 border-gray-300 bg-white text-left shadow-sm min-w-[260px]"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <div className="font-bold text-gray-900">
                  {etudiant.firstname} {etudiant.lastname}
                </div>
                <div className="text-sm text-gray-600">{etudiant.ecole}</div>
                <div className="text-xs text-gray-500">
                  @{etudiant.username}
                </div>
              </button>

              <ul className="dropdown-menu">
                <li>
                  <button
                    className="dropdown-item"
                    onClick={deconnecter}
                    type="button"
                  >
                    Déconnecter
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1500px] mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-extrabold text-gray-900">
            Bonjour {etudiant.firstname}
          </h1>
          <p className="text-gray-600 mt-2 text-lg">
            Voici ton espace personnel LinkUp.
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-[1.2fr_0.8fr] gap-8">
          <div>
            <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6">
              <div className="flex items-center justify-between mb-6 gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Mes groupes
                  </h2>
                  <p className="text-gray-600">
                    {groupes.length} groupe{groupes.length > 1 ? "s" : ""} trouvé
                    {groupes.length > 1 ? "s" : ""}
                  </p>
                </div>
              </div>

              {groupes.length === 0 ? (
                <div className="text-gray-500 text-lg py-10">
                  Aucun groupe pour le moment.
                </div>
              ) : (
                <div className="flex flex-wrap gap-6">
                  {groupes.map((groupe) => (
                    <div
                      key={groupe.id}
                      className="w-[240px] h-[360px] rounded-[42px] border-[3px] border-black bg-blue-500 text-white shadow-md flex flex-col justify-between p-6 text-left"
                    >
                      <div>
                        <div className="text-sm font-semibold opacity-90 mb-2">
                          Groupe
                        </div>
                        <div className="text-3xl font-extrabold break-words leading-tight">
                          {groupe.nomGroupe}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="bg-white/20 rounded-2xl px-4 py-3 border border-white/30">
                          <div className="text-sm opacity-90">
                            Nombre d’étudiants
                          </div>
                          <div className="text-3xl font-extrabold">
                            {groupe.etudiants ? groupe.etudiants.length : 0}
                          </div>
                        </div>

                        <div className="bg-white/20 rounded-2xl px-4 py-3 border border-white/30">
                          <div className="text-sm opacity-90">Chef</div>
                          <div className="text-lg font-bold">
                            {groupe.chef
                              ? `${groupe.chef.firstname} ${groupe.chef.lastname}`
                              : "Non défini"}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div>
            <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Résumé</h2>

              <div className="grid grid-cols-1 gap-4">
                <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
                  <div className="text-sm text-gray-500">Nom complet</div>
                  <div className="text-xl font-bold text-gray-900">
                    {etudiant.firstname} {etudiant.lastname}
                  </div>
                </div>

                <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
                  <div className="text-sm text-gray-500">Courriel</div>
                  <div className="text-xl font-bold text-gray-900 break-all">
                    {etudiant.email}
                  </div>
                </div>

                <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
                  <div className="text-sm text-gray-500">École</div>
                  <div className="text-xl font-bold text-gray-900">
                    {etudiant.ecole}
                  </div>
                </div>

                <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
                  <div className="text-sm text-gray-500">
                    Notifications non vues
                  </div>
                  <div className="text-xl font-bold text-gray-900">
                    {nombreNotificationsNonVues}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`fixed inset-0 bg-black/30 transition-opacity duration-300 z-40 ${
          notificationsOuvertes
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setNotificationsOuvertes(false)}
      />

      <aside
        className={`fixed top-0 right-0 h-full w-full sm:w-[430px] bg-white z-50 shadow-2xl border-l border-gray-200 transform transition-transform duration-300 ${
          notificationsOuvertes ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="h-full flex flex-col">
          <div className="px-5 py-4 border-b border-gray-200 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-extrabold text-gray-900">
                Notifications
              </h2>
              <p className="text-sm text-gray-500">
                {notifications.length} notification
                {notifications.length > 1 ? "s" : ""}
              </p>
            </div>

            <button
              onClick={() => setNotificationsOuvertes(false)}
              className="w-11 h-11 rounded-xl border border-gray-300 bg-white text-xl font-bold"
              type="button"
            >
              ✕
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-4">
            {notificationsAffichees.length === 0 ? (
              <div className="text-gray-500 text-lg mt-6">
                Aucune notification pour le moment.
              </div>
            ) : (
              <div className="space-y-4">
                {notificationsAffichees.map((notification) => {
                  const invitation = notification as Invitation;

                  return (
                    <div
                      key={notification.id}
                      className={`rounded-2xl border p-4 shadow-sm ${
                        notification.estVu
                          ? "bg-white border-gray-200"
                          : "bg-blue-50 border-blue-300"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            {!notification.estVu && (
                              <span className="w-3 h-3 rounded-full bg-blue-500 shrink-0"></span>
                            )}

                            <h3 className="text-lg font-bold text-gray-900 break-words">
                              {notification.titre}
                            </h3>
                          </div>

                          <p className="text-gray-700 break-words">
                            {notification.message}
                          </p>

                          {estInvitation(notification) && (
                            <div className="mt-2 text-sm text-gray-700">
                              <div>
                                Groupe :{" "}
                                <span className="font-semibold">
                                  {invitation.group.nomGroupe}
                                </span>
                              </div>

                              <div>
                                Envoyeur :{" "}
                                <span className="font-semibold">
                                  {invitation.envoyeur.firstname}{" "}
                                  {invitation.envoyeur.lastname}
                                </span>
                              </div>
                            </div>
                          )}

                          <div className="mt-3 text-xs text-gray-500">
                            {new Date(notification.tempsCreation).toLocaleString(
                              "fr-CA"
                            )}
                          </div>

                          <div className="mt-4 flex flex-wrap gap-2">
                            <button
                              onClick={() => marquerCommeVue(notification)}
                              disabled={notification.estVu}
                              className={`px-3 py-2 rounded-xl font-semibold border ${
                                notification.estVu
                                  ? "bg-gray-200 text-gray-500 border-gray-200 cursor-not-allowed"
                                  : "bg-white text-gray-800 border-gray-300 hover:bg-gray-50"
                              }`}
                              type="button"
                            >
                              {notification.estVu ? "Vu" : "Marquer comme vue"}
                            </button>

                            {estInvitation(notification) ? (
                              <>
                                <button
                                  onClick={() => accepterInvitation(notification)}
                                  className="px-3 py-2 rounded-xl font-semibold border border-green-700 bg-green-600 text-white hover:bg-green-700"
                                  type="button"
                                >
                                  Accepter
                                </button>

                                <button
                                  onClick={() => refuserInvitation(notification)}
                                  className="px-3 py-2 rounded-xl font-semibold border border-red-700 bg-red-600 text-white hover:bg-red-700"
                                  type="button"
                                >
                                  Refuser
                                </button>
                              </>
                            ) : (
                              <button
                                onClick={() =>
                                  supprimerNotificationSimple(notification)
                                }
                                className="px-3 py-2 rounded-xl font-semibold border border-red-700 bg-red-600 text-white hover:bg-red-700"
                                type="button"
                              >
                                Supprimer
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </aside>
    </div>
  );
}