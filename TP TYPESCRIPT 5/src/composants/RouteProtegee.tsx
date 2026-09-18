// src/composants/RouteProtegee.tsx
//
// Une seule responsabilité : rediriger vers /connexion si personne n'est
// connecté. Le vrai statut de ce code : ça cache un affichage, ça ne
// protège rien — la donnée arrive du serveur, c'est lui qui autorise.

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
