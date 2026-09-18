// src/lib/omdb.ts

export interface FilmOmdb {
  imdbID: string;
  Title: string;
  Year: string;
  Type: string; // "movie" | "series" | "game" — l'API n'est pas plus précise
  Poster: string; // une URL, ou la chaîne "N/A"
}

export interface ReponseRecherche {
  Search?: FilmOmdb[]; // absent quand la recherche échoue
  totalResults?: string;
  Response: "True" | "False";
  Error?: string;
}

const BASE_URL = "https://www.omdbapi.com/";

export function urlRecherche(terme: string): string {
  const params = new URLSearchParams({
    apikey: import.meta.env.VITE_OMDB_KEY,
    s: terme,
  });
  return `${BASE_URL}?${params.toString()}`;
}
