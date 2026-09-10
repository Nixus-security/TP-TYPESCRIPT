import type { ChangeEvent } from "react";

export interface ChampTexteProps {
  nom: string;
  label: string;
  valeur: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: "text" | "email" | "password";
  erreur?: string;
  placeholder?: string;
}

export function ChampTexte({
  nom,
  label,
  valeur,
  onChange,
  type = "text",
  erreur,
  placeholder,
}: ChampTexteProps) {
  const idErreur = `${nom}-erreur`;

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={nom} className="text-sm font-medium text-slate-700">
        {label}
      </label>
      <input
        id={nom}
        name={nom}
        type={type}
        value={valeur}
        onChange={onChange}
        placeholder={placeholder}
        aria-invalid={!!erreur}
        aria-describedby={erreur ? idErreur : undefined}
        className={`rounded-lg border px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-offset-1 ${
          erreur
            ? "border-red-500 focus:ring-red-400"
            : "border-slate-300 focus:ring-blue-400"
        }`}
      />
      {erreur && (
        <p id={idErreur} className="text-sm text-red-600">
          {erreur}
        </p>
      )}
    </div>
  );
}
