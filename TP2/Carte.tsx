import type { ReactNode } from "react";

export interface CarteProps {
  titre: string;
  sousTitre?: string;
  children: ReactNode;
  actions?: ReactNode; // pied de carte, optionnel
}

export function Carte({ titre, sousTitre, children, actions }: CarteProps) {
  return (
    <div className="rounded-lg bg-white p-4 shadow">
      <h3 className="font-bold text-gray-900">{titre}</h3>

      {/* Uniquement si le sous-titre est fourni */}
      {sousTitre && <p className="text-sm text-gray-500">{sousTitre}</p>}

      <div className="mt-3">{children}</div>

      {/* Uniquement si des actions sont fournies */}
      {actions && <div className="mt-4">{actions}</div>}
    </div>
  );
}
