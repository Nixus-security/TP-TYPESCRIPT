// Rediriger vers /connexion si personne n'est connecté, rien de plus.
// À prendre pour ce que c'est : ça cache un affichage, ça ne protège rien.
// La vraie autorisation, c'est le serveur qui la donne.

import { Navigate, useLocation } from "react-router-dom";
import type { ReactNode } from "react";
import { useAuth } from "../contextes/AuthContext";

export function RouteProtegee({ children }: { children: ReactNode }) {
  const { pseudo } = useAuth();
  const emplacement = useLocation();

  if (!pseudo) {
    return <Navigate to="/connexion" state={{ de: emplacement }} replace />;
  }

  return <>{children}</>;
}
