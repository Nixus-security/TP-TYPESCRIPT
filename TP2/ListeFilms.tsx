import type { Film, StatutFilm } from "../lib/utils";
import { Carte } from "./Carte";
import { Badge } from "./Badge";
import type { TonBadge } from "./Badge";
import { Bouton } from "./Bouton";

export interface ListeFilmsProps {
  films: Film[];
  messageVide?: string;
  onSelection?: (film: Film) => void;
}

// Correspondance statut -> libellé + ton du badge (indexée par StatutFilm).
const badgeStatut: Record<StatutFilm, { libelle: string; ton: TonBadge }> = {
  vu: { libelle: "Déjà vu", ton: "succes" },
  a_voir: { libelle: "À voir", ton: "info" },
  abandonne: { libelle: "Abandonné", ton: "neutre" },
};

export function ListeFilms({
  films,
  messageVide = "Aucun film à afficher.",
  onSelection,
}: ListeFilmsProps) {
  // Cas vide traité EN PREMIER, avec un retour anticipé.
  if (films.length === 0) {
    return (
      <div className="rounded-lg bg-gray-100 p-8 text-center text-gray-500">
        {messageVide}
      </div>
    );
  }

  return (
    <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      {films.map((film) => {
        const statut = badgeStatut[film.statut];
        return (
          <li key={film.id}>
            <Carte
              titre={film.titre}
              sousTitre={`${film.annee} — ${film.note}/10`}
              actions={
                onSelection ? (
                  <Bouton
                    libelle="Détails"
                    variante="secondaire"
                    onClick={() => onSelection(film)}
                  />
                ) : undefined
              }
            >
              <div className="flex flex-wrap gap-2">
                <Badge texte={statut.libelle} ton={statut.ton} />
                {film.genres.map((genre) => (
                  <Badge key={genre} texte={genre} />
                ))}
              </div>
            </Carte>
          </li>
        );
      })}
    </ul>
  );
}
