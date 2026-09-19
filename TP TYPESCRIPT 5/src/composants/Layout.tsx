// En-tête et pied de page ne sont écrits qu'ici, une seule fois.
// <Outlet /> affiche la page courante au milieu.

import { NavLink, Link, Outlet } from "react-router-dom";
import { useAuth } from "../contextes/AuthContext";
import { useFavoris } from "../contextes/FavorisContext";
import { useTheme } from "../contextes/ThemeContext";

const lienActif = "font-bold text-blue-600 dark:text-blue-400";
const lienInactif =
  "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100";

export function Layout() {
  const { pseudo, deconnecter } = useAuth();
  const { favoris } = useFavoris();
  const { theme, basculer } = useTheme();

  return (
    <div className="flex min-h-screen flex-col bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 px-6 py-4 dark:border-slate-800">
        <nav className="flex items-center gap-4 text-sm">
          <NavLink to="/" end className={({ isActive }) => (isActive ? lienActif : lienInactif)}>
            Accueil
          </NavLink>
          <NavLink
            to="/recherche"
            className={({ isActive }) => (isActive ? lienActif : lienInactif)}
          >
            Recherche
          </NavLink>
          <NavLink
            to="/favoris"
            className={({ isActive }) => (isActive ? lienActif : lienInactif)}
          >
            Favoris ({favoris.length})
          </NavLink>
        </nav>

        <div className="flex items-center gap-3 text-sm">
          <button
            type="button"
            onClick={basculer}
            className="rounded-lg border border-slate-300 px-2 py-1 text-xs dark:border-slate-700"
          >
            {theme === "clair" ? "🌙 Sombre" : "☀️ Clair"}
          </button>

          {pseudo ? (
            <>
              <span className="text-slate-600 dark:text-slate-400">
                Connecté en tant que {pseudo}
              </span>
              <button
                type="button"
                onClick={deconnecter}
                className="rounded-lg border border-slate-300 px-2 py-1 text-xs dark:border-slate-700"
              >
                Déconnexion
              </button>
            </>
          ) : (
            <Link to="/connexion" className={lienInactif}>
              Connexion
            </Link>
          )}
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t border-slate-200 px-6 py-4 text-center text-xs text-slate-400 dark:border-slate-800">
        TP5 — React Router
      </footer>
    </div>
  );
}
