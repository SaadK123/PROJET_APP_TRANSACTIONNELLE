import { URLS } from "./FichierConfiguration";
import type { Conversation, SucessDTO } from "./TypesObjets";

async function lireReponse<T>(response: Response): Promise<T> {
    const texte = await response.text();
    const data = texte ? JSON.parse(texte) : null;

    if (!response.ok) {
        throw new Error(data?.message || "Erreur serveur");
    }

    if (data && data.success === false) {
        throw new Error(data.message || "Action impossible");
    }

    return data as T;
}

export async function creerConversation(
    chefId: string,
    nomConversation: string,
): Promise<SucessDTO> {
    const response = await fetch(URLS.CREER_CONVERSATION, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            chefId,
            nomConversation,
        }),
    });

    return lireReponse<SucessDTO>(response);
}

export async function getConversationsParEtudiant(
    idEtudiant: string,
): Promise<Conversation[]> {
    const url = `${URLS.OBTENIR_CONVERSATIONS_ETUDIANT}?idEtudiant=${encodeURIComponent(
        idEtudiant,
    )}`;

    const response = await fetch(url);
    return lireReponse<Conversation[]>(response);
}

export async function getConversationById(
    idConversation: string,
): Promise<Conversation> {
    const url = `${URLS.OBTENIR_CONVERSATION_PAR_ID}?id=${encodeURIComponent(
        idConversation,
    )}`;

    const response = await fetch(url);
    return lireReponse<Conversation>(response);
}

export async function supprimerConversation(
    idConversation: string,
): Promise<SucessDTO> {
    const url = `${URLS.SUPPRIMER_CONVERSATION}?id=${encodeURIComponent(
        idConversation,
    )}`;

    const response = await fetch(url, {
        method: "DELETE",
    });

    return lireReponse<SucessDTO>(response);
}

export async function envoyerInvitationConversation(params: {
    etudiantNomUtilisateur: string;
    message: string;
    type: "NOUVELLE_CONVERSATION_INVITATION";
    groupId: string;
    titre: string;
    envoyeurId: string;
}): Promise<SucessDTO> {
    const response = await fetch(URLS.ENVOYER_INVITATION_CONVERSATION, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
    });

    return lireReponse<SucessDTO>(response);
}

export async function rejoindreConversation(
    idConversation: string,
    idEtudiant: string,
): Promise<SucessDTO> {
    const response = await fetch(URLS.REJOINDRE_CONVERSATION, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            idGroupe: idConversation,
            idEtudiant,
        }),
    });

    return lireReponse<SucessDTO>(response);
}

export async function quitterConversation(
    idConversation: string,
    idEtudiant: string,
): Promise<SucessDTO> {
    const response = await fetch(URLS.QUITTER_CONVERSATION, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            idGroupe: idConversation,
            idEtudiant,
        }),
    });

    return lireReponse<SucessDTO>(response);
}

export async function virerEtudiantConversation(params: {
    nomUtilisateur: string;
    etudiantQuiVireId: string;
    groupid: string;
}): Promise<SucessDTO> {
    const response = await fetch(URLS.VIRER_ETUDIANT_CONVERSATION, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
    });

    return lireReponse<SucessDTO>(response);
}

export async function envoyerMessage(params: {
    idConversation: string;
    envoyeurId: string;
    contenu: string;
}): Promise<SucessDTO> {
    const response = await fetch(URLS.ENVOYER_MESSAGE, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
    });

    return lireReponse<SucessDTO>(response);
}