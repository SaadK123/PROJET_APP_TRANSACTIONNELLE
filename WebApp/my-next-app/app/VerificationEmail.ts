export function verifierEmail(email: string): string {
  const emailNettoye = email.trim();

  if (emailNettoye === "") {
    return "l email est obligatoire";
  }

  const morceaux = emailNettoye.split("@");

  if (morceaux.length !== 2) {
    return "email invalide";
  }

  const partieAvant = morceaux[0].trim();
  const partieApres = morceaux[1].trim();

  if (partieAvant === "" || partieApres === "") {
    return "email invalide";
  }

  return "";
}

export function verifierMotDePasse(motDePasse: string): string {
  if (motDePasse.trim() === "") {
    return "le mot de passe est obligatoire";
  }

  if (motDePasse.length < 8) {
    return "le mot de passe doit contenir au moins 8 caracteres";
  }

  let contientMajuscule = false;
  let contientChiffre = false;
  let contientCaractereSpecial = false;

  for (let i = 0; i < motDePasse.length; i++) {
    const caractere = motDePasse[i];

    if (caractere >= "A" && caractere <= "Z") {
      contientMajuscule = true;
    } else if (caractere >= "0" && caractere <= "9") {
      contientChiffre = true;
    } else if (
      !(caractere >= "a" && caractere <= "z") &&
      !(caractere >= "A" && caractere <= "Z") &&
      !(caractere >= "0" && caractere <= "9")
    ) {
      contientCaractereSpecial = true;
    }
  }

  if (!contientMajuscule) {
    return "le mot de passe doit contenir au moins une majuscule";
  }

  if (!contientChiffre) {
    return "le mot de passe doit contenir au moins un chiffre";
  }

  if (!contientCaractereSpecial) {
    return "le mot de passe doit contenir au moins un caractere special";
  }

  return "";
}