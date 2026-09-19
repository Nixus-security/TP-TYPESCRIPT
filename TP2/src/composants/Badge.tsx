export type TonBadge = "neutre" | "succes" | "info" | "attention";

export interface BadgeProps {
  texte: string;
  ton?: TonBadge; // "neutre" par défaut
}

// Même principe que le bouton : un objet indexé par l'union.
const classesParTon: Record<TonBadge, string> = {
  neutre: "bg-gray-100 text-gray-700",
  succes: "bg-green-100 text-green-700",
  info: "bg-blue-100 text-blue-700",
  attention: "bg-yellow-100 text-yellow-800",
};

export function Badge({ texte, ton = "neutre" }: BadgeProps) {
  return (
    <span
      className={
        "inline-block rounded-full px-2 py-0.5 text-xs font-medium " +
        classesParTon[ton]
      }
    >
      {texte}
    </span>
  );
}
