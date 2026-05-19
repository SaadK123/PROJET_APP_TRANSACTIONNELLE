import { API } from "@/Api";

// aller au calendrier d'un groupe
export function GotoCalendarGroupe(router: any, idEtudiant: string, idGroupe: string) {
    router.push(`/CalendrierGrp/${idEtudiant}/${idGroupe}`)
}

// aller au dashboard
export function GotoDashboard(router: any, idEtudiant: string) {
    router.push(`/DashBoard/${idEtudiant}`)
}

// aller aux paramètres
export function GotoParametres(router: any, idEtudiant: string) {
    router.push(`/Parametres/${idEtudiant}`)
}

// aller aux conversations
export function GoToConversations(router: any, idEtudiant: string) {
    router.push(`/Conversations/${idEtudiant}`)
}

// aller a une conversation
export function GoToConversation(router: any, idEtudiant: string, idConversation: string) {
    router.push(`/Conversations/${idEtudiant}/${idConversation}`)
}

// aller a la page d'accueil
export function GotoHomePage(router: any) {
    router.push("/HomePage")
}

// aller au calendrier
export function GotoCalendar(router: any, idEtudiant: string) {
    router.push(`/calendrier/${idEtudiant}`)
}

// aller a la page login sans supprimer le cookie
export function GotoPageLogin(router: any) {
    router.push("/SignIn")
}

// aller au login en supprimant le cookie
export async function GotoLogin(router: any) {
    try {
        await API.logout()
    } catch (e) {
    }

    router.push("/SignIn")
}

// aller au signup
export function GotoSignUp(router: any) {
    router.push("/SignUp")
}