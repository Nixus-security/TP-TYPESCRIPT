// Aucun mot de passe, aucun serveur : un pseudo non vide suffit.
// Si on arrive ici via une redirection depuis une route protégée,
// on repart sur la page initialement demandée après connexion.

import { useState, type FormEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contextes/AuthContext";
import { Bouton } from "../composants/Bouton";

interface EtatEmplacement {
  de?: { pathname: string };
}

export function Connexion() {
  const [pseudo, setPseudo] = useState("");
  const { connecter } = useAuth();
  const naviguer = useNavigate();
  const emplacement = useLocation();

  const etat = emplacement.state as EtatEmplacement | null;
  const destination = etat?.de?.pathname ?? "/";

  function validerConnexion(e?: FormEvent) {
    e?.preventDefault();
    const nettoye = pseudo.trim();
    if (!nettoye) return;
    connecter(nettoye);
    naviguer(destination, { replace: true });
  }

  return (
    <div className="mx-auto max-w-md p-6">
      <h1 className="mb-4 text-2xl font-bold text-slate-900 dark:text-slate-100">Connexion</h1>

      <form onSubmit={validerConnexion} className="flex flex-col gap-4">
        <input
          type="text"
          value={pseudo}
          onChange={(e) => setPseudo(e.target.value)}
          placeholder="Votre pseudo"
          className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <Bouton libelle="Se connecter" onClick={() => validerConnexion()} />
      </form>
    </div>
  );
}
