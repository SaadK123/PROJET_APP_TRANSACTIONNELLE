export default function SignIn() {
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
            <div className="row ms-5 mt-4">
              <label className="col-1">Nom</label>
              <label className="col-1">Prenom</label>
            </div>
            <div className="row ms-5">
              <input className="col-5 " type="text" />
              <input className="col-3" type="text" />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
