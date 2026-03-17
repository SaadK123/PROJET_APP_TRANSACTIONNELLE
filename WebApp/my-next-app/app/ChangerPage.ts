// aller au calendrier d'un groupe
export function GotoCalendarGroupe(router:any,idEtudiant:string,idGroupe:string){
    router.push(`/CalendrierGrp/${idEtudiant}/${idGroupe}`)
}

// aller au dashboard
export function GotoDashboard(router:any,idEtudiant:string){
    router.push(`/DashBoard/${idEtudiant}`)
}

// aller aux paramètres
export function GotoParametres(router:any,idEtudiant:string){
    router.push(`/Parametres/${idEtudiant}`)
}


// aller a la page d'accueil
export function GotoHomePage(router:any){
    router.push("/HomePage")
}

 export function GotoCalendar(router:any,idEtudiant:string) {
    router.push(`/Calendrier/${idEtudiant}`)
 }
// aller au login
export function GotoLogin(router:any){
    router.push("/SignIn")
}

// aller au signup
export function GotoSignUp(router:any){
    router.push("/SignUp")
}