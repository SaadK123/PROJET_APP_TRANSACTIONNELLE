"use client";

import { useRouter } from "next/navigation";

import {
  GotoHomePage,
  GotoLogin,
  GotoSignUp,
} from "@/app/ChangerPage";

/**
 * ici je met tout les texte en haut
 * comme sa tout est centraliser
 * et plus facile a changer
 */

/* titres */
const TITRE_PRINCIPAL = "Fini le Casse-Tete des Horaires";
const SOUS_TITRE_1 =
  "Trouvez le moment parfait pour vous retrouver entre etudiants instantanement.";
const SOUS_TITRE_2 =
  "Partagez vos emplois du temps et on vous montre quand tout le monde est libre.";

/* boutons header */
const BOUTON_PRODUIT = "Produit";
const BOUTON_FORFAIT = "Forfait";
const BOUTON_CONTACT = "Contact";
const BOUTON_CONNEXION = "Connection";
const BOUTON_INSCRIPTION = "Inscription";

/* bouton principal */
const BOUTON_COMMENCER = "Commencez Gratuitement";

/* sections demo */
const TITRE_VOTRE_HORAIRE = "Votre Horaire";
const TITRE_AMIS = "Amis";
const TITRE_TEMPS_LIBRE = "Temps Libre";

/* exemple temps libre */
const TEXTE_TEMPS_LIBRE_1 = "Lundi 18h-22h";
const TEXTE_TEMPS_LIBRE_2 = "Jeudi 19h - 23h";

/* image */
const ALT_LOGO = "Logo";
const SRC_LOGO = "/Img/LogoLinkUp.png";

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="homepage-background min-h-screen bg-cover bg-center pb-5">
      <div className="container-fluid">
        {/* header principal */}
        <div className="row bg-white">
          {/* logo */}
          <div className="col-1">
            <button
              type="button"
              onClick={() => GotoHomePage(router)}
              className="border-0 bg-white"
            >
              <img
                className="homepage-logo p-2"
                src={SRC_LOGO}
                alt={ALT_LOGO}
              />
            </button>
          </div>

      
        

          {/* connexion et inscription */}
          <div className="col-2 p-3 text-center">
            <button
              onClick={() => GotoLogin(router)}
              className="ps-3 pe-3 mt-3"
              type="button"
            >
              {BOUTON_CONNEXION}
            </button>

            <button
              onClick={() => GotoSignUp(router)}
              className="ps-2 pe-2 rounded bg-green-500 text-white"
              type="button"
            >
              {BOUTON_INSCRIPTION}
            </button>
          </div>
        </div>

        {/* gros texte principal */}
        <div className="row pt-5 pb-4 text-center">
          <h1 className="h1-WritingHP">{TITRE_PRINCIPAL}</h1>
        </div>

        {/* sous texte */}
        <div className="row pb-5 text-center">
          <h5>
            {SOUS_TITRE_1}
            <br />
            {SOUS_TITRE_2}
          </h5>
        </div>

        {/* gros bouton principal */}
        <div className="row-7 text-center">
          <button
            type="button"
            onClick={() => GotoSignUp(router)}
            className="pt-3 pb-3 ps-5 pe-5 bg-green-500 rounded text-white border border-success mb-5"
          >
            <h4 className="h4-HP">{BOUTON_COMMENCER}</h4>
          </button>
        </div>

        {/* exemple visuel */}
        <div className="row p-5 mx-5 mt-5 bg-white">
          <div className="col">
            <div className="row">
              {/* votre horaire */}
              <div className="col hp-Border-Blue rounded border border-4">
                <div className="col pt-2 bg-white hp-schedule-Blue text-start">
                  <h5>{TITRE_VOTRE_HORAIRE}</h5>

                  <div className="p-5 mt-4 rounded bg-blue-200"></div>
                  <div className="p-4 mt-3 mb-3 rounded bg-blue-200"></div>
                  <div className="p-3 mb-4 rounded bg-blue-200"></div>
                </div>
              </div>

              {/* amis */}
              <div className="col ps-5 pe-5">
                <div className="row">
                  <div className="col hp-Border-Purple rounded border border-4">
                    <div className="col pt-2 pb-4 bg-white hp-friends-Purple text-start">
                      <h5>{TITRE_AMIS}</h5>

                      <div className="row p-5 ps-3 pb-2 pe-3">
                        <div className="col-2">
                          <div className="rounded-circle bg-blue-200">ㅤ</div>
                        </div>
                        <div className="col-8 ms-4 bg-blue-200 rounded">ㅤ</div>
                      </div>

                      <div className="row p-5 ps-3 pb-2 pt-4 pe-3">
                        <div className="col-2">
                          <div className="rounded-circle bg-purple-200">ㅤ</div>
                        </div>
                        <div className="col-8 ms-4 bg-purple-200 rounded">
                          ㅤ
                        </div>
                      </div>

                      <div className="row p-5 ps-3 pb-5 pt-4 pe-3">
                        <div className="col-2">
                          <div className="rounded-circle bg-green-200">ㅤ</div>
                        </div>
                        <div className="col-8 ms-4 bg-green-200 rounded">ㅤ</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* temps libre */}
              <div className="col hp-Border-Green rounded border border-4">
                <div className="col pt-2 bg-white hp-time-Green text-start">
                  <h5>{TITRE_TEMPS_LIBRE}</h5>

                  <div className="p-4 mt-5 rounded bg-green-200 hp-time-Green text-center">
                    <h5>{TEXTE_TEMPS_LIBRE_1}</h5>
                  </div>

                  <div className="p-4 mt-4 rounded bg-green-200 hp-time-Green text-center">
                    <h5>{TEXTE_TEMPS_LIBRE_2}</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* fin de page */}
      </div>
    </div>
  );
}