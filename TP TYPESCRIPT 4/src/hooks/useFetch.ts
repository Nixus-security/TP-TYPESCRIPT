import { useEffect, useState } from "react";

export interface EtatFetch<T> {
  donnees: T | null;
  chargement: boolean;
  erreur: string | null;
}

export function useFetch<T>(url: string | null): EtatFetch<T> {
  const [donnees, setDonnees] = useState<T | null>(null);
  const [chargement, setChargement] = useState(false);
  const [erreur, setErreur] = useState<string | null>(null);

  useEffect(() => {
    if (!url) {
      setDonnees(null);
      setChargement(false);
      setErreur(null);
      return;
    }

    const controleur = new AbortController();

    async function charger() {
      setChargement(true);
      setErreur(null);
      try {
        const r = await fetch(url as string, { signal: controleur.signal });
        if (!r.ok) throw new Error(`Erreur HTTP ${r.status}`);
        const d: T = await r.json();
        setDonnees(d);
      } catch (e) {
        if (e instanceof DOMException && e.name === "AbortError") return;
        setErreur(e instanceof Error ? e.message : "Erreur inconnue");
      } finally {
        setChargement(false);
      }
    }

    charger();

    return () => controleur.abort();
  }, [url]);

  return { donnees, chargement, erreur };
}
