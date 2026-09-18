// src/pages/Accueil.tsx
import { Link } from "react-router-dom";

export function Accueil() {
  return (
    <div className="mx-auto max-w-2xl p-6 text-center">
      <h1 className="mb-4 text-3xl font-bold text-slate-900 dark:text-slate-100">
        Bienvenue sur CinéTrouve
      </h1>
      <p className="mb-2 text-slate-600 dark:text-slate-400">
        Cherchez un film ou une série par son titre, consultez sa fiche et gardez les meilleurs
        de côté.
      </p>
      <p className="mb-6 text-slate-600 dark:text-slate-400">
        Vos favoris vous attendent une fois connecté.
      </p>
      <Link
        to="/recherche"
        className="inline-block rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
      >
        Lancer une recherche
      </Link>
    </div>
  );
}
