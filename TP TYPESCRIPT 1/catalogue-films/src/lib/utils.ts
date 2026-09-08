// =====================================================================
//  utils.ts — Catalogue de films
//  TP1 — React.js & TypeScript
// =====================================================================

// --- Données de démonstration ----------------------------------------

export type StatutFilm = "vu" | "a_voir" | "abandonne";

export interface Film {
  readonly id: number;
  titre: string;
  annee: number;
  genres: string[];
  note: number;
  statut: StatutFilm;
}

export const FILMS: Film[] = [
  { id: 1, titre: "Alien", annee: 1979, genres: ["SF", "Horreur"], note: 8.5, statut: "vu" },
  { id: 2, titre: "Blade Runner", annee: 1982, genres: ["SF", "Thriller"], note: 8.1, statut: "vu" },
  { id: 3, titre: "Arrival", annee: 2016, genres: ["SF", "Drame"], note: 7.9, statut: "a_voir" },
  { id: 4, titre: "Dune", annee: 2021, genres: ["SF", "Aventure"], note: 8.0, statut: "a_voir" },
  { id: 5, titre: "Solaris", annee: 1972, genres: ["SF", "Drame"], note: 8.4, statut: "abandonne" },
];

// --- 1. Paramètres non typés -----------------------------------------

export function formaterTitre(titre: string, annee: number): string {
  return `${titre} (${annee})`;
}

export function resume(film: Pick<Film, "titre" | "annee" | "note" | "genres">): string {
  return `${film.titre} — ${film.annee} — ${film.note}/10 — ${film.genres.join(", ")}`;
}

// --- 2. Un retour de type variable ------------------------------------
// Le type union force l'appelant à faire un narrowing (typeof) avant
// d'utiliser le résultat comme un nombre.

export function moyenne(notes: number[]): number | "Aucune note" {
  if (notes.length === 0) return "Aucune note";
  const total = notes.reduce((a, b) => a + b, 0);
  return total / notes.length;
}

// --- 3. Une recherche qui peut échouer --------------------------------

function trouverParId<T extends { id: number }>(liste: T[], id: number): T | undefined {
  return liste.find((film) => film.id === id);
}

export function titreDuFilm(liste: { id: number; titre: string }[], id: number): string | undefined {
  return trouverParId(liste, id)?.titre;
}

// --- 4. Un tri générique ----------------------------------------------
// `keyof T` garantit que `cle` est bien un champ existant de T.

export function trierPar<T>(liste: T[], cle: keyof T): T[] {
  return [...liste].sort((a, b) => (a[cle] > b[cle] ? 1 : -1));
}

// --- 5. Un paramètre optionnel jamais vérifié -------------------------

export function filtrerParGenre(liste: Pick<Film, "genres">[], genre?: string): Pick<Film, "genres">[] {
  if (!genre) return liste;
  return liste.filter((film) => film.genres.includes(genre));
}

// --- 6. Un statut libre ------------------------------------------------
// `StatutFilm` remplace la chaîne libre : une faute de frappe est
// détectée à la compilation.

export function estVu(statut: StatutFilm): boolean {
  return statut === "vu";
}

export function libelleStatut(statut: StatutFilm): string {
  switch (statut) {
    case "vu":
      return "Déjà vu";
    case "a_voir":
      return "À voir";
    case "abandonne":
      return "Abandonné";
    default: {
      const jamais: never = statut;
      return jamais;
    }
  }
}

// --- 7. Une valeur venue de l'extérieur --------------------------------
// `JSON.parse` renvoie `unknown` : on valide la forme avant de faire
// confiance à la donnée, plutôt que de se contenter d'un `as`.

export function chargerFavoris(): number[] {
  const brut = localStorage.getItem("favoris");
  if (!brut) return [];
  const donnees: unknown = JSON.parse(brut);
  if (!Array.isArray(donnees) || !donnees.every((valeur) => typeof valeur === "number")) {
    return [];
  }
  return donnees;
}

export function enregistrerFavoris(favoris: number[]): void {
  localStorage.setItem("favoris", JSON.stringify(favoris));
}

// --- 8. Une mise à jour partielle --------------------------------------

export function mettreAJour(film: Film, modifications: Partial<Omit<Film, "id">>): Film {
  return { ...film, ...modifications };
}

// --- 9. Une création sans identifiant ----------------------------------

let prochainId = 100;

export function creer(nouveauFilm: Omit<Film, "id">): Film {
  return { id: prochainId++, ...nouveauFilm };
}

// --- 10. Une mutation silencieuse --------------------------------------
// `Readonly<Film>` interdit toute mutation du paramètre : la fonction
// est forcée de renvoyer un nouvel objet.

export function ajouterNote(film: Readonly<Film>, nouvelleNote: number): Film {
  return { ...film, note: (film.note + nouvelleNote) / 2 };
}
