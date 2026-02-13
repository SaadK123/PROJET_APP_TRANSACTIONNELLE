export default function SignUpTestPage() {
  return (
    <>
      {/* Fond d'écran, généré par chatGPT */}
      <div className="signup-background min-h-screen bg-cover bg-center">
        {/* Head */}
        <div className="container-fluid">
          <div className="col-7 mx-auto text-center">
            <h2>Créer un compte</h2>

            <label>
              Rejoins des milliers d'étudiants qui organisent mieux leur temps
            </label>
          </div>

          <div>
            <form className="border rounded signup-form p-5 col-7 mx-auto">
              {/* Nom utilisateur */}
              <div className="mb-3">
                <label>Nom d'utilisateur</label>
                <input className="form-control border-black" type="text" />
              </div>
              {/* Nom */}
              <div className="row mb-3">
                <div className="col-7">
                  <label>Nom</label>
                  <input type="text" className="form-control border-black" />
                </div>
                <div className="col-5">
                  <label>Prénom</label>
                  <input type="text" className="form-control border-black" />
                </div>
              </div>
              {/* Université / Cégep */}
              <div className="mb-3">
                <label htmlFor="school">Université/Cégep</label>
                <select
                  className="form-select border-black"
                  name="school"
                  id="school"
                >
                  <option value="">Choisir une université ou un cégèp</option>
                  {/* Cégeps */}
                  <option value="bois_de_boulogne">
                    Collège Bois-de-Boulogne
                  </option>
                  <option value="vanier">Collège Vanier</option>
                  <option value="montmorency">Cégep de Montmorency</option>
                  <option value="sainte_foy">Cégep de Sainte-Foy</option>
                  <option value="limoilou">Cégep Limoilou</option>
                  <option value="temiscouata">Cégep de Témiscouata</option>
                  {/* Universités */}
                  <option value="mcgill">Université McGill</option>
                  <option value="uqam">
                    Université du Québec à Montréal (UQAM)
                  </option>
                  <option value="laval">Université Laval</option>
                  <option value="montreal">Université de Montréal</option>
                  <option value="concordia">Université Concordia</option>
                  <option value="sherbrooke">Université de Sherbrooke</option>
                  <option value="trois_rivieres">
                    Université du Québec à Trois-Rivières (UQTR)
                  </option>
                  <option value="outaouais">
                    Université du Québec en Outaouais (UQO)
                  </option>
                  <option value="chicoutimi">
                    Université du Québec à Chicoutimi (UQAC)
                  </option>
                </select>
              </div>

              <div className="mb-3 ">
                <label>Email Étudiant</label>
                <input
                  type="text"
                  className="form-control border-black"
                ></input>
              </div>
              {/* Mot de passe */}
              <div className="mb-5">
                <label>Mot de passe</label>
                <input
                  type="text"
                  className="form-control border-black"
                ></input>
                <input
                  type="checkbox"
                  className="form-check-input border-black"
                  id="condition"
                ></input>
                <label className="form-check-label ms-2 " htmlFor="condition">
                  J'accepte les{" "}
                  <span>
                    <a href="??">condition d'utilisation</a>{" "}
                  </span>
                  et la{" "}
                  <span>
                    <a href="??">politique de confidentialité</a>
                  </span>
                </label>
              </div>
              <div className="d-grid mb-4">
                <button
                  className="btn btn-createAcc btn-lg border-black"
                  type="submit"
                >
                  Créer mon compte
                </button>
              </div>
              <div className="col-7 mx-auto text-center">
                <label>
                  Tu as déjà un compte?{" "}
                  <span>
                    <a href="??">Connecte-toi</a>
                  </span>
                </label>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
