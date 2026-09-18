// src/contextes/ThemeContext.tsx
//
// BONUS (consigne 6). Le troisième contexte, écrit sur le même patron
// que les deux autres : créé à undefined, Provider avec un useState,
// hook de consommation gardé.

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type Theme = "clair" | "sombre";

interface ThemeContexte {
  theme: Theme;
  basculer: () => void;
}

const CLE_STOCKAGE = "theme";

function lireThemeInitial(): Theme {
  try {
    return localStorage.getItem(CLE_STOCKAGE) === "sombre" ? "sombre" : "clair";
  } catch {
    return "clair";
  }
}

const Contexte = createContext<ThemeContexte | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(lireThemeInitial);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "sombre");
    localStorage.setItem(CLE_STOCKAGE, theme);
  }, [theme]);

  function basculer() {
    setTheme((t) => (t === "clair" ? "sombre" : "clair"));
  }

  return <Contexte.Provider value={{ theme, basculer }}>{children}</Contexte.Provider>;
}

export function useTheme(): ThemeContexte {
  const contexte = useContext(Contexte);
  if (contexte === undefined) {
    throw new Error("useTheme doit être utilisé dans un <ThemeProvider>");
  }
  return contexte;
}
