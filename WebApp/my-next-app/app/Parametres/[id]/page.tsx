"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import {
  obtenirEtudiantParId,
  mettreAjourProfilEtudiant,
  mettreAjourMotDePasse,
  supprimerEtudiant
} from "@/app/FetchsMethodesEtudiants";

import { retournerErreur } from "@/app/attraperErreur";

import {
 GotoLogin,
 GotoHomePage,
 GotoDashboard,
  GotoCalendar
  
} from "@/app/ChangerPage";

import type { Etudiant } from "@/app/TypesObjets";
import Spinner from "react-bootstrap/Spinner";

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

//Animation Chargement
  function Chargement() {
  return <Spinner animation="border" />;
}
  /*
   permet de charger les informations de l'etudiant
   depuis l'api puis remplir les champs du formulaire
  */
  async function chargerEtudiant() {

    try {

      setChargement(true);
      setErreur("");
      setMessage("");

      const etudiantCharge = await obtenirEtudiantParId(idEtudiant);

      setEtudiant(etudiantCharge);

      // on remplit les champs avec les infos recues
      setPrenom(etudiantCharge.prenom);
      setNom(etudiantCharge.nom);
      setNomUtilisateur(etudiantCharge.nomUtilisateur);
      setEcole(etudiantCharge.ecole);

    } catch (e) {

      setErreur(retournerErreur(e,"Erreur chargement étudiant"));

    } finally {

      setChargement(false);

    }

  }



  /*
   permet de sauvegarder les modifications
   du profil de l'etudiant
  */
  async function handleSauvegarderProfil() {

    if (etudiant === null) {
      return;
    }

    const prenomTrim = prenom.trim();
    const nomTrim = nom.trim();
    const nomUtilisateurTrim = nomUtilisateur.trim();
    const ecoleTrim = ecole.trim();

    // on verifie que tous les champs sont remplis
    if (!prenomTrim || !nomTrim || !nomUtilisateurTrim || !ecoleTrim) {

      setErreur("Tous les champs doivent être remplis");
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
        prenomTrim
      );

      setMessage("Profil mis à jour");

      // on recharge les infos pour refresh la page
      await chargerEtudiant();

    } catch (e) {

      setErreur(retournerErreur(e,"Erreur mise à jour profil"));

    }

  }



  /*
   permet de changer le mot de passe
   de l'utilisateur
  */
  async function handleChangerMotDePasse() {

    if (etudiant === null) {
      return;
    }

    const vieuxTrim = vieuxMotDePasse.trim();
    const nouveauTrim = nouveauMotDePasse.trim();

    // verification des champs
    if (!vieuxTrim || !nouveauTrim) {

      setErreur("Les champs mot de passe sont obligatoires");
      setMessage("");
      return;

    }

    if (nouveauTrim.length < 8 || nouveauTrim.length > 28) {

      setErreur("Le mot de passe doit contenir entre 8 et 28 caractères");
      setMessage("");
      return;

    }

    try {

      setErreur("");
      setMessage("");

      await mettreAjourMotDePasse(etudiant.id,vieuxTrim,nouveauTrim);

      setVieuxMotDePasse("");
      setNouveauMotDePasse("");

      setMessage("Mot de passe mis à jour");

    } catch (e) {

      setErreur(retournerErreur(e,"Erreur changement mot de passe"));

    }

  }



  /*
   permet de supprimer definitivement
   le compte utilisateur
  */
  async function handleSupprimerCompte() {

    if (etudiant === null) {
      return;
    }

    const motDePasseTrim = motDePasseSuppression.trim();

    if (!motDePasseTrim) {

      setErreur("Entre ton mot de passe pour supprimer ton compte");
      setMessage("");
      return;

    }

    const confirmation = window.confirm(
      "Supprimer le compte définitivement ?"
    );

    if (!confirmation) {
      return;
    }

    try {

      setErreur("");
      setMessage("");

      await supprimerEtudiant(etudiant.courriel,motDePasseTrim);

      alert("Compte supprimé");

      GotoLogin(router);

    } catch (e) {

      setErreur(retournerErreur(e,"Erreur suppression compte"));

    }

  }



  /*
   permet de charger l'etudiant
   quand la page est ouverte
  */
  useEffect(() => {

    if (idEtudiant) {
      chargerEtudiant();
    }

  }, [idEtudiant]);



  if (chargement) {

    return (
      <div className="container-fluid p-4">
        {Chargement()}
      </div>
    );

  }



  if (erreur && etudiant === null) {

    return (
      <div className="container p-5">
        <h2>{erreur}</h2>
      </div>
    );

  }



  if (etudiant === null) {

    return (
      <div className="container p-5">
        <h2>Aucun étudiant trouvé</h2>
      </div>
    );

  }



  return (

    <div className="container-fluid">

      {/* barre navigation */}

      <div className="row bg-white border-bottom">

        <div className="col-2 col-md-1">

          <button onClick={() => GotoHomePage(router)} className="border-0 bg-white">

            <img
              className="homepage-logo p-2"
              src="/Img/LogoLinkUp.png"
              alt="Logo"
            />

          </button>

        </div>


        <div className="col-8 col-md-9 p-3 text-end">

          <button
            onClick={() => GotoDashboard(router,idEtudiant)}
            className="ps-2 pe-2 mt-3 border me-2"
            type="button"
          >
            Tableau de bord
          </button>

          <button
            onClick={() => GotoCalendar(router,idEtudiant)}
            className="ps-2 pe-2 mt-3 border me-2"
            type="button"
          >
            Calendrier
          </button>

        </div>


        <div className="col-2 p-3 text-center">

          <button
            onClick={() => GotoLogin(router)}
            className="ps-3 pe-3 mt-3"
            type="button"
          >
            Déconnexion
          </button>

        </div>

      </div>



      {/* titre page */}

      <div className="row pt-4 text-center">

        <h1>Paramètres</h1>

      </div>



      {/* affichage erreur */}

      {erreur ? (

        <div className="row pt-3">
          <div className="col-10 mx-auto">
            <p>{erreur}</p>
          </div>
        </div>

      ) : null}



      {/* affichage message succes */}

      {message ? (

        <div className="row pt-3">
          <div className="col-10 mx-auto">
            <p>{message}</p>
          </div>
        </div>

      ) : null}



      {/* zone formulaire */}

      <div className="row p-5 mx-5 mt-4 bg-white">

        {/* section modification profil */}

        <div className="col-12 col-lg-6 mb-4">

          <h3>Modifier profil</h3>

          <div className="mt-4">

            <label>Prénom</label>
            <input
              value={prenom}
              onChange={(e)=>setPrenom(e.currentTarget.value)}
              type="text"
              className="form-control mb-3"
            />

            <label>Nom</label>
            <input
              value={nom}
              onChange={(e)=>setNom(e.currentTarget.value)}
              type="text"
              className="form-control mb-3"
            />

            <label>Nom utilisateur</label>
            <input
              value={nomUtilisateur}
              onChange={(e)=>setNomUtilisateur(e.currentTarget.value)}
              type="text"
              className="form-control mb-3"
            />

            <label>École</label>
            <input
              value={ecole}
              onChange={(e)=>setEcole(e.currentTarget.value)}
              type="text"
              className="form-control mb-3"
            />

            <button
              onClick={handleSauvegarderProfil}
              className="btn btn-primary"
              type="button"
            >
              Sauvegarder profil
            </button>

          </div>

        </div>



        {/* section changement mot de passe */}

        <div className="col-12 col-lg-6">

          <h3>Changer mot de passe</h3>

          <div className="mt-4">

            <label>Vieux mot de passe</label>

            <input
              value={vieuxMotDePasse}
              onChange={(e)=>setVieuxMotDePasse(e.currentTarget.value)}
              type="password"
              className="form-control mb-3"
            />

            <label>Nouveau mot de passe</label>

            <input
              value={nouveauMotDePasse}
              onChange={(e)=>setNouveauMotDePasse(e.currentTarget.value)}
              type="password"
              className="form-control mb-3"
            />

            <button
              onClick={handleChangerMotDePasse}
              className="btn btn-success"
              type="button"
            >
              Changer mot de passe
            </button>

          </div>



          {/* section suppression compte */}

          <div className="mt-5 border-top pt-4">

            <h3 className="text-danger">Supprimer mon compte</h3>

            <p>
              Cette action est définitive. Entre ton mot de passe pour confirmer.
            </p>

            <label>Mot de passe</label>

            <input
              value={motDePasseSuppression}
              onChange={(e)=>setMotDePasseSuppression(e.currentTarget.value)}
              type="password"
              className="form-control mb-3"
            />

            <button
              onClick={handleSupprimerCompte}
              className="btn btn-danger"
              type="button"
            >
              Supprimer mon compte
            </button>

          </div>

        </div>

      </div>

    </div>

  );

}