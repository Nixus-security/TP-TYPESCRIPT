// src/composants/RechercheFilms.tsx
import { useEffect, useState } from "react";
import type { FilmOmdb, ReponseRecherche } from "../lib/omdb";
import { urlRecherche } from "../lib/omdb";
import { CarteFilm } from "./CarteFilm";

export function RechercheFilms() {
  const [terme, setTerme] = useState("");
  const [termeDiffere, setTermeDiffere] = useState("");
  const [films, setFilms] = useState<FilmOmdb[]>([]);
  const [chargement, setChargement] = useState(false);
  const [erreur, setErreur] = useState<string | null>(null);

  // Recherche différée : on n'interroge l'API que 400 ms après la
  // dernière frappe, pour ne pas lancer une requête par caractère.
  useEffect(() => {
    const id = window.setTimeout(() => setTermeDiffere(terme), 400);
    return () => window.clearTimeout(id);
  }, [terme]);

  useEffect(() => {
    if (!termeDiffere) {
      setFilms([]);
      setErreur(null);
      setChargement(false);
      return;
    }

    const controleur = new AbortController();

    async function rechercher() {
      setChargement(true);
      setErreur(null);
      try {
        const r = await fetch(urlRecherche(termeDiffere), { signal: controleur.signal });
        if (!r.ok) throw new Error(`Erreur HTTP ${r.status}`);
        const d: ReponseRecherche = await r.json();
        if (d.Response === "False") {
          setFilms([]);
          setErreur(d.Error ?? "La recherche a échoué.");
          return;
        }
        setFilms(d.Search ?? []);
      } catch (e) {
        if (e instanceof DOMException && e.name === "AbortError") return;
        setErreur(e instanceof Error ? e.message : "Erreur inconnue");
      } finally {
        setChargement(false);
      }
    }

    rechercher();

    return () => controleur.abort();
  }, [termeDiffere]);

  return (
    <div className="mx-auto max-w-5xl p-6">
      <h1 className="mb-4 text-2xl font-bold text-slate-900">Recherche de films</h1>

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
      ) : erreur ? (
        <p className="text-red-600">{erreur}</p>
      ) : films.length === 0 ? (
        <p className="text-slate-500">Aucun film ne correspond à « {terme} ».</p>
      ) : (
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {films.map((film) => (
            <li key={film.imdbID}>
              <CarteFilm film={film} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
