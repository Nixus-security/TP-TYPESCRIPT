export type VarianteBouton = "primaire" | "secondaire" | "danger";

export interface BoutonProps {
  libelle: string;
  variante?: VarianteBouton; // "primaire" par défaut
  desactive?: boolean; // false par défaut
  onClick?: () => void;
}

// La table des styles : un style par variante.
// Si on ajoute une variante à l'union sans l'ajouter ici, TS le signale.
const classesParVariante: Record<VarianteBouton, string> = {
  primaire: "bg-blue-600 text-white hover:bg-blue-700",
  secondaire: "bg-gray-200 text-gray-800 hover:bg-gray-300",
  danger: "bg-red-600 text-white hover:bg-red-700",
};

export function Bouton({
  libelle,
  variante = "primaire",
  desactive = false,
  onClick,
}: BoutonProps) {
  return (
    <button
      onClick={onClick}
      disabled={desactive}
      className={
        "rounded-md px-4 py-2 font-medium " +
        "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 " +
        "disabled:opacity-50 disabled:cursor-not-allowed " +
        classesParVariante[variante]
      }
    >
      {libelle}
    </button>
  );
}
