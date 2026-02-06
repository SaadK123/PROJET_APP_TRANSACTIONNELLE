export default function () {
  return (
    <>
      {/* Head */}
      <div className="container-fluid">
        <h2 className="row mt-5 ms-5">Créer un compte</h2>
        <label className="row ms-5">
          Rejoins des miliers d'étudiants qui organisent mieux leur temps
        </label>
        <div className="row">
          {/* Sign in Form */}
          <form className="col-12 border rounded-3 bg-light mt-5">
            <label className="row ms-5">Nom d'utilisateur</label>
            <div className="row ms-5">
              <input className="col-6" type="text" />
            </div>
            <div className="row">
              {/* Nom */}
              <div className="col-7">
                <label className="row ms-5">Nom</label>
                <div className="row ms-5">
                  <input className="col-12" type="text" />
                </div>
              </div>
              {/* Prénonm */}
              <div className="col-5">
                <label className="row ms-5">Prénom</label>
                <div className="row ms-5">
                  <input className="col-10" type="text" />
                </div>
              </div>
            </div>
            {/* Université/Cégep */}
            <div className="row">
              <label className="row ms-5">Université/Cégep</label>
              <div className="row ms-5">
                <input className="col-11" type="text" />
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
