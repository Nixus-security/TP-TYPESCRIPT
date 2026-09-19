// L'état est piloté par un reducer : le Provider ne fait que détenir
// l'état et l'écrire dans localStorage, toute la logique métier vit
// dans reducerFavoris, une fonction pure.

import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  type Dispatch,
  type ReactNode,
} from "react";
import type { FilmOmdb } from "../lib/omdb";

type ActionFavoris =
  | { type: "ajouter"; film: FilmOmdb }
  | { type: "retirer"; id: string }
  | { type: "vider" };

interface FavorisContexte {
  favoris: FilmOmdb[];
  dispatch: Dispatch<ActionFavoris>;
}

const CLE_STOCKAGE = "favoris";

function reducerFavoris(etat: FilmOmdb[], action: ActionFavoris): FilmOmdb[] {
  switch (action.type) {
    case "ajouter":
      if (etat.some((film) => film.imdbID === action.film.imdbID)) return etat;
      return [...etat, action.film];
    case "retirer":
      return etat.filter((film) => film.imdbID !== action.id);
    case "vider":
      return [];
  }
}

// La lecture se fait ici, à l'initialisation du useReducer — jamais dans
// le reducer, ce serait un effet de bord dans une fonction pure.
function lireFavorisInitiaux(): FilmOmdb[] {
  try {
    const brut = localStorage.getItem(CLE_STOCKAGE);
    return brut ? (JSON.parse(brut) as FilmOmdb[]) : [];
  } catch {
    return [];
  }
}

const Contexte = createContext<FavorisContexte | undefined>(undefined);

export function FavorisProvider({ children }: { children: ReactNode }) {
  const [favoris, dispatch] = useReducer(reducerFavoris, [], lireFavorisInitiaux);

  useEffect(() => {
    localStorage.setItem(CLE_STOCKAGE, JSON.stringify(favoris));
  }, [favoris]);

  return (
    <Contexte.Provider value={{ favoris, dispatch }}>{children}</Contexte.Provider>
  );
}

export function useFavoris(): FavorisContexte {
  const contexte = useContext(Contexte);
  if (contexte === undefined) {
    throw new Error("useFavoris doit être utilisé dans un <FavorisProvider>");
  }
  return contexte;
}
