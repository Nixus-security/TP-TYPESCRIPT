export interface Inscription {
  prenom: string;
  email: string;
  motDePasse: string;
  confirmation: string;
  cgv: boolean;
}

export const valeursInitiales: Inscription = {
  prenom: "",
  email: "",
  motDePasse: "",
  confirmation: "",
  cgv: false,
};

export type Erreurs = Partial<Record<keyof Inscription, string>>;

export type InscriptionEnregistree = Omit<Inscription, "motDePasse" | "confirmation"> & {
  id: number;
};

const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function valider(donnees: Inscription): Erreurs {
  const erreurs: Erreurs = {};

  if (donnees.prenom.trim().length < 2) {
    erreurs.prenom = "Le prénom doit contenir au moins 2 caractères.";
  }

  if (!regexEmail.test(donnees.email)) {
    erreurs.email = "L'adresse email n'est pas valide.";
  }

  if (donnees.motDePasse.length < 8) {
    erreurs.motDePasse = "Le mot de passe doit contenir au moins 8 caractères.";
  }

  if (donnees.confirmation !== donnees.motDePasse) {
    erreurs.confirmation = "La confirmation ne correspond pas au mot de passe.";
  }

  if (!donnees.cgv) {
    erreurs.cgv = "Vous devez accepter les CGV.";
  }

  return erreurs;
}
