"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  obtenirEtudiantParId,
  mettreAjourProfilEtudiant,
  mettreAjourMotDePasse,
  supprimerEtudiant,
} from "@/app/FetchsMethodesEtudiants";
import type { Etudiant } from "@/app/TypesObjets";

export default function Parametres() {
  const params = useParams<{ id: string }>();
  const idEtudiant = params.id;
  const router = useRouter();

  const [etudiant, setEtudiant] = useState<Etudiant | null>(null);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState("");
  const [message, setMessage] = useState("");

  const [prenom, setPrenom] = useState("");
  const [nom, setNom] = useState("");
  const [nomUtilisateur, setNomUtilisateur] = useState("");
  const [ecole, setEcole] = useState("");

  const [vieuxMotDePasse, setVieuxMotDePasse] = useState("");
  const [nouveauMotDePasse, setNouveauMotDePasse] = useState("");

  const [motDePasseSuppression, setMotDePasseSuppression] = useState("");

  function gotoHomePage() {
    router.push("/HomePage");
  }

  function gotoDashBoard() {
    router.push(`/DashBoard/${idEtudiant}`);
  }

  function gotoLogIn() {
    router.push("/SignIn");
  }

  function gotoCalendrier() {
    router.push(`/calendrier/${idEtudiant}`);
  }

  async function chargerEtudiant() {
    try {
      setChargement(true);
      setErreur("");
      setMessage("");

      const etudiantCharge = await obtenirEtudiantParId(idEtudiant);
      setEtudiant(etudiantCharge);

      setPrenom(etudiantCharge.prenom);
      setNom(etudiantCharge.nom);
      setNomUtilisateur(etudiantCharge.nomUtilisateur);
      setEcole(etudiantCharge.ecole);
    } catch (e) {
      if (e instanceof Error) {
        setErreur(e.message);
      } else {
        setErreur("Erreur lors du chargement de l'étudiant");
      }
    } finally {
      setChargement(false);
    }
  }

  async function handleSauvegarderProfil() {
    if (!etudiant) return;

    const prenomTrim = prenom.trim();
    const nomTrim = nom.trim();
    const nomUtilisateurTrim = nomUtilisateur.trim();
    const ecoleTrim = ecole.trim();

    if (!prenomTrim || !nomTrim || !nomUtilisateurTrim || !ecoleTrim) {
      setErreur("Tous les champs du profil doivent être remplis.");
      setMessage("");
      return;
    }

    try {
      setErreur("");
      setMessage("");

      await mettreAjourProfilEtudiant(
        etudiant.id,
        nomUtilisateurTrim,
        nomTrim,
        ecoleTrim,
        prenomTrim,
      );

      setMessage("Profil mis à jour");
      await chargerEtudiant();
    } catch (e) {
      if (e instanceof Error) {
        setErreur(e.message);
      } else {
        setErreur("Erreur mise à jour profil");
      }
    }
  }

  async function handleChangerMotDePasse() {
    if (!etudiant) return;

    const vieuxTrim = vieuxMotDePasse.trim();
    const nouveauTrim = nouveauMotDePasse.trim();

    if (!vieuxTrim || !nouveauTrim) {
      setErreur("Les deux champs de mot de passe sont obligatoires.");
      setMessage("");
      return;
    }

    if (nouveauTrim.length < 8 || nouveauTrim.length > 28) {
      setErreur(
        "Le nouveau mot de passe doit contenir entre 8 et 28 caractères.",
      );
      setMessage("");
      return;
    }

    try {
      setErreur("");
      setMessage("");

      await mettreAjourMotDePasse(etudiant.id, vieuxTrim, nouveauTrim);

      setVieuxMotDePasse("");
      setNouveauMotDePasse("");
      setMessage("Mot de passe mis à jour");
    } catch (e) {
      setErreur(
        e instanceof Error ? e.message : "Erreur changement mot de passe",
      );
    }
  }

  async function handleSupprimerCompte() {
    if (!etudiant) return;

    const motDePasseTrim = motDePasseSuppression.trim();

    if (!motDePasseTrim) {
      setErreur("Entre ton mot de passe pour supprimer ton compte.");
      setMessage("");
      return;
    }

    const confirmation = window.confirm(
      "Es-tu certain de vouloir supprimer ton compte ? Cette action est irréversible.",
    );

    if (!confirmation) return;

    try {
      setErreur("");
      setMessage("");

      await supprimerEtudiant(etudiant.courriel, motDePasseTrim);

      setMotDePasseSuppression("");
      alert("Compte supprimé avec succès.");
      router.push("/SignIn");
    } catch (e) {
      setErreur(
        e instanceof Error
          ? e.message
          : "Erreur lors de la suppression du compte",
      );
      setMessage("");
    }
  }

  useEffect(() => {
    if (idEtudiant) {
      chargerEtudiant();
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
            <button
              onClick={gotoDashBoard}
              className="ps-2 pe-2 mt-3 me-2"
              type="button"
            >
              Tableau de bord
            </button>

            <button
              onClick={gotoCalendrier}
              className="ps-2 pe-2 mt-3 me-2"
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

        <div className="row pt-4 text-center">
          <h1>Paramètres</h1>
        </div>

        {erreur && (
          <div className="row pt-3">
            <div className="col-10 mx-auto">
              <p>{erreur}</p>
            </div>
          </div>
        )}

        {message && (
          <div className="row pt-3">
            <div className="col-10 mx-auto">
              <p>{message}</p>
            </div>
          </div>
        )}

        <div className="row p-5 mx-5 mt-4 bg-white">
          <div className="col-12 col-lg-6 mb-4">
            <h3>Modifier profil</h3>

            <div className="mt-4">
              <label>Prénom</label>
              <input
                value={prenom}
                onChange={(e) => setPrenom(e.currentTarget.value)}
                type="text"
                className="form-control mb-3"
              />

              <label>Nom</label>
              <input
                value={nom}
                onChange={(e) => setNom(e.currentTarget.value)}
                type="text"
                className="form-control mb-3"
              />

              <label>Nom utilisateur</label>
              <input
                value={nomUtilisateur}
                onChange={(e) => setNomUtilisateur(e.currentTarget.value)}
                type="text"
                className="form-control mb-3"
              />

              <label>École</label>
              <input
                value={ecole}
                onChange={(e) => setEcole(e.currentTarget.value)}
                type="text"
                className="form-control mb-3"
              />

              <button
                onClick={handleSauvegarderProfil}
                className="bg-blue-500 rounded text-white p-2"
                type="button"
              >
                Sauvegarder profil
              </button>
            </div>
          </div>

          <div className="col-12 col-lg-6">
            <h3>Changer mot de passe</h3>

            <div className="mt-4">
              <label>Vieux mot de passe</label>
              <input
                value={vieuxMotDePasse}
                onChange={(e) => setVieuxMotDePasse(e.currentTarget.value)}
                type="password"
                className="form-control mb-3"
              />

              <label>Nouveau mot de passe</label>
              <input
                value={nouveauMotDePasse}
                onChange={(e) => setNouveauMotDePasse(e.currentTarget.value)}
                type="password"
                className="form-control mb-3"
              />

              <button
                onClick={handleChangerMotDePasse}
                className="bg-green-500 rounded text-white p-2"
                type="button"
              >
                Changer mot de passe
              </button>
            </div>

            <div className="mt-5 border-top pt-4">
              <h3 className="text-danger">Supprimer mon compte</h3>
              <p>
                Cette action est définitive. Entre ton mot de passe pour
                confirmer.
              </p>

              <label>Mot de passe</label>
              <input
                value={motDePasseSuppression}
                onChange={(e) =>
                  setMotDePasseSuppression(e.currentTarget.value)
                }
                type="password"
                className="form-control mb-3"
              />

              <button
                onClick={handleSupprimerCompte}
                className="bg-red-600 rounded text-white p-2"
                type="button"
              >
                Supprimer mon compte
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
