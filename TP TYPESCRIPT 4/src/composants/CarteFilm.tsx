// src/composants/CarteFilm.tsx
import type { FilmOmdb } from "../lib/omdb";
import { Carte } from "./Carte";
import { Badge } from "./Badge";
import type { TonBadge } from "./Badge";

export interface CarteFilmProps {
  film: FilmOmdb;
}

const typeBadge: Record<string, { libelle: string; ton: TonBadge }> = {
  movie: { libelle: "Film", ton: "info" },
  series: { libelle: "Série", ton: "succes" },
  game: { libelle: "Jeu", ton: "attention" },
};

export function CarteFilm({ film }: CarteFilmProps) {
  const badge = typeBadge[film.Type] ?? { libelle: film.Type, ton: "neutre" as TonBadge };

  return (
    <Carte titre={film.Title} sousTitre={film.Year}>
      <div className="flex flex-col gap-3">
        {film.Poster === "N/A" ? (
          <div className="flex h-64 items-center justify-center rounded bg-slate-100 text-slate-400">
            Pas d'affiche
          </div>
        ) : (
          <img
            src={film.Poster}
            alt={`Affiche de ${film.Title}`}
            className="h-64 w-full rounded object-cover"
          />
        )}
        <Badge texte={badge.libelle} ton={badge.ton} />
      </div>
    </Carte>
  );
}
