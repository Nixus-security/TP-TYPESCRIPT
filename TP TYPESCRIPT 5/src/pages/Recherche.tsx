// src/pages/Recherche.tsx
//
// Le composant du TP4, presque inchangé : la recherche différée est
// maintenant le useDebounce générique du hook, et chaque carte est
// enveloppée dans un Link vers sa page de détail. CarteFilm ne bouge pas.

import { useState } from "react";
import { Link } from "react-router-dom";
import type { ReponseRecherche } from "../lib/omdb";
import { urlRecherche } from "../lib/omdb";
import { useDebounce, useFetch } from "../hooks/useFetch";
import { CarteFilm } from "../composants/CarteFilm";

export function Recherche() {
  const [terme, setTerme] = useState("");
  const termeDiffere = useDebounce(terme, 400);

  const { donnees, chargement, erreur } = useFetch<ReponseRecherche>(
    termeDiffere ? urlRecherche(termeDiffere) : null,
  );

  const films = donnees?.Response === "True" ? (donnees.Search ?? []) : [];
  const messageErreur =
    erreur ?? (donnees?.Response === "False" ? (donnees.Error ?? "La recherche a échoué.") : null);

  return (
    <div className="mx-auto max-w-5xl p-6">
      <h1 className="mb-4 text-2xl font-bold text-slate-900 dark:text-slate-100">
        Recherche de films
      </h1>

      <input
        type="text"
        value={terme}
        onChange={(e) => setTerme(e.target.value)}
        placeholder="Titre d'un film, d'une série…"
        className="mb-6 w-full rounded-lg border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      {!terme ? (
        <p className="text-slate-500">Tapez un titre pour lancer la recherche.</p>
      ) : chargement ? (
        <p className="text-slate-500">Chargement…</p>
      ) : messageErreur ? (
        <p className="text-red-600">{messageErreur}</p>
      ) : films.length === 0 ? (
        <p className="text-slate-500">Aucun film ne correspond à « {terme} ».</p>
      ) : (
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {films.map((film) => (
            <li key={film.imdbID}>
              <Link to={`/films/${film.imdbID}`}>
                <CarteFilm film={film} />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
