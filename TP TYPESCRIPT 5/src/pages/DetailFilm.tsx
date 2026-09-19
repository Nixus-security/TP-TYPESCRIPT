import { Link, useParams } from "react-router-dom";
import type { FilmDetailOmdb } from "../lib/omdb";
import { afficheDisponible, urlDetail } from "../lib/omdb";
import { useFetch } from "../hooks/useFetch";
import { useFavoris } from "../contextes/FavorisContext";
import { Badge } from "../composants/Badge";
import { Bouton } from "../composants/Bouton";

export function DetailFilm() {
  const { id } = useParams();
  // url: string | null — pas d'identifiant, pas de requête, pas de `if` dans l'effet.
  const { donnees, chargement, erreur } = useFetch<FilmDetailOmdb>(id ? urlDetail(id) : null);
  const { favoris, dispatch } = useFavoris();

  if (chargement) return <p className="p-6 text-slate-500">Chargement…</p>;
  if (erreur) return <p className="p-6 text-red-600">{erreur}</p>;
  if (!donnees || donnees.Response === "False") {
    return <p className="p-6 text-slate-500">Ce film est introuvable.</p>;
  }

  const dejaEnFavoris = favoris.some((film) => film.imdbID === donnees.imdbID);

  return (
    <div className="mx-auto max-w-3xl p-6">
      <Link to="/recherche" className="mb-4 inline-block text-sm text-blue-600 hover:underline">
        ← Retour à la recherche
      </Link>

      <div className="flex flex-col gap-6 md:flex-row">
        {afficheDisponible(donnees.Poster) ? (
          <img
            src={donnees.Poster}
            alt={`Affiche de ${donnees.Title}`}
            className="aspect-[2/3] w-full max-w-xs rounded object-cover"
          />
        ) : (
          <div className="flex aspect-[2/3] w-full max-w-xs items-center justify-center rounded bg-slate-100 text-xs text-slate-400 dark:bg-slate-800">
            Pas d'affiche
          </div>
        )}

        <div className="flex-1">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            {donnees.Title}{" "}
            <span className="font-normal text-slate-500">({donnees.Year})</span>
          </h1>

          <div className="mt-2 flex flex-wrap gap-2">
            <Badge texte={donnees.Genre} ton="info" />
            <Badge texte={donnees.Runtime} ton="neutre" />
            {donnees.imdbRating !== "N/A" && (
              <Badge texte={`★ ${donnees.imdbRating}`} ton="succes" />
            )}
          </div>

          <p className="mt-4 text-sm text-slate-700 dark:text-slate-300">{donnees.Plot}</p>

          <div className="mt-6">
            <Bouton
              libelle={dejaEnFavoris ? "Déjà dans les favoris" : "Ajouter aux favoris"}
              desactive={dejaEnFavoris}
              onClick={() => dispatch({ type: "ajouter", film: donnees })}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
