// src/pages/Favoris.tsx
//
// Accessible seulement connecté (voir RouteProtegee). Lit et modifie le
// même contexte que le compteur de l'en-tête et le bouton de la page
// de détail : aucune prop ne traverse le Layout.

import { Link } from "react-router-dom";
import { useFavoris } from "../contextes/FavorisContext";
import { CarteFilm } from "../composants/CarteFilm";
import { Bouton } from "../composants/Bouton";

export function Favoris() {
  const { favoris, dispatch } = useFavoris();

  if (favoris.length === 0) {
    return <p className="p-6 text-slate-500">Aucun favori pour l'instant.</p>;
  }

  return (
    <div className="mx-auto max-w-5xl p-6">
      <h1 className="mb-4 text-2xl font-bold text-slate-900 dark:text-slate-100">Mes favoris</h1>
      <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {favoris.map((film) => (
          <li key={film.imdbID} className="flex flex-col gap-2">
            <Link to={`/films/${film.imdbID}`}>
              <CarteFilm film={film} />
            </Link>
            <Bouton
              libelle="Retirer"
              variante="danger"
              onClick={() => dispatch({ type: "retirer", id: film.imdbID })}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
