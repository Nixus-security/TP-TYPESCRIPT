import { useState, type ChangeEvent, type FormEvent } from "react";
import { Bouton } from "./Bouton";
import { ChampTexte } from "./ChampTexte";
import { valeursInitiales, valider, type Inscription, type Erreurs } from "../lib/inscription";

export interface FormulaireInscriptionProps {
  onInscription: (donnees: Inscription) => void;
}

export function FormulaireInscription({ onInscription }: FormulaireInscriptionProps) {
  const [donnees, setDonnees] = useState<Inscription>(valeursInitiales);
  const [erreurs, setErreurs] = useState<Erreurs>({});
  const [envoiEnCours, setEnvoiEnCours] = useState(false);

  const gererSaisie = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const valeur = type === "checkbox" ? checked : value;
    setDonnees((d) => ({ ...d, [name]: valeur }));
  };

  const gererEnvoi = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trouvees = valider(donnees);
    setErreurs(trouvees);
    if (Object.keys(trouvees).length > 0) return;

    setEnvoiEnCours(true);
    window.setTimeout(() => {
      onInscription(donnees);
      setDonnees(valeursInitiales);
      setErreurs({});
      setEnvoiEnCours(false);
    }, 500);
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={gererEnvoi} noValidate>
      <ChampTexte
        nom="prenom"
        label="Prénom"
        valeur={donnees.prenom}
        onChange={gererSaisie}
        erreur={erreurs.prenom}
      />
      <ChampTexte
        nom="email"
        label="Email"
        type="email"
        valeur={donnees.email}
        onChange={gererSaisie}
        erreur={erreurs.email}
      />
      <ChampTexte
        nom="motDePasse"
        label="Mot de passe"
        type="password"
        valeur={donnees.motDePasse}
        onChange={gererSaisie}
        erreur={erreurs.motDePasse}
      />
      <ChampTexte
        nom="confirmation"
        label="Confirmation du mot de passe"
        type="password"
        valeur={donnees.confirmation}
        onChange={gererSaisie}
        erreur={erreurs.confirmation}
      />

      <div className="flex flex-col gap-1">
        <label htmlFor="cgv" className="flex items-center gap-2 text-sm text-slate-700">
          <input
            id="cgv"
            name="cgv"
            type="checkbox"
            checked={donnees.cgv}
            onChange={gererSaisie}
            aria-invalid={!!erreurs.cgv}
            aria-describedby={erreurs.cgv ? "cgv-erreur" : undefined}
            className={erreurs.cgv ? "accent-red-600" : "accent-blue-600"}
          />
          J'accepte les CGV
        </label>
        {erreurs.cgv && (
          <p id="cgv-erreur" className="text-sm text-red-600">
            {erreurs.cgv}
          </p>
        )}
      </div>

      <Bouton
        type="submit"
        desactive={envoiEnCours}
        libelle={envoiEnCours ? "Envoi en cours…" : "S'inscrire"}
      />
    </form>
  );
}
