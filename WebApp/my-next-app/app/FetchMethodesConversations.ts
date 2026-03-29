import { URLS } from "./FichierConfiguration";

export async function creerConversationPrivee(
    chefId: string,
    nomGroupe: string
) {
    const response = await fetch(URLS.CREER_CONVERSATION, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            chefId,
            nomGroupe,
        }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Erreur creation conversation");
    }

    return data;
}