export default function SignUpTestPage() {
  return (
    <>
      {/* Head */}
      <div className="container-fluid">
        <h2 className="row mt-5 ms-5">Créer un compte</h2>

        <label className="row ms-5">
          Rejoins des milliers d'étudiants qui organisent mieux leur temps
        </label>
        {/* Nom utilisateur */}
        <div className="row">
          <form className="col-12 border rounded bg-light mt-4 p-5">
            <div className="mb-3">
              <label>Nom d'utilisateur</label>
              <input className="form-control" type="text" />
            </div>
            {/* Nom */}
            <div className="row mb-3">
              <div className="col-7">
                <label>Nom</label>
                <input type="text" className="form-control" />
              </div>
              <div className="col-5">
                <label>Prenom</label>
                <input type="text" className="form-control" />
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
