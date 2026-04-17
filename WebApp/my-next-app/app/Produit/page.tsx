import { TestControlleurApi,Configuration} from '@/src/api'


const api = new TestControlleurApi(new Configuration({
    basePath: 'http://localhost:8080',
    accessToken: () => localStorage.getItem('token') ?? ''
}))

export default function() {
 api.getEtudiantById({id : "34234324"});

api.updateEtudiantProfile({
    miseAJourEtudiantProfil: {
        etudiantID: "123",
        nomUtilisateur: "test",
        nom: "test",
        prenom: "test",
        ecole: "bdeb"
    }
})
}