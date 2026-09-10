import { useState } from "react";
import { FormulaireInscription } from "./composants/FormulaireInscription";
import { ListeInscriptions } from "./composants/ListeInscriptions";
import type { Inscription, InscriptionEnregistree } from "./lib/inscription";

let prochainId = 1;

function App() {
  const [inscriptions, setInscriptions] = useState<InscriptionEnregistree[]>([]);

  const ajouterInscription = (donnees: Inscription) => {
    const nouvelle: InscriptionEnregistree = {
      id: prochainId++,
      prenom: donnees.prenom,
      email: donnees.email,
      cgv: donnees.cgv,
    };
    setInscriptions((liste) => [nouvelle, ...liste]);
  };

  const supprimerInscription = (id: number) => {
    setInscriptions((liste) => liste.filter((i) => i.id !== id));
  };

  return (
    <main className="mx-auto grid max-w-5xl gap-8 p-6 md:grid-cols-2">
      <section>
        <h1 className="mb-4 text-2xl font-bold text-slate-900">Inscription</h1>
        <FormulaireInscription onInscription={ajouterInscription} />
      </section>
      <section>
        <h2 className="mb-4 text-2xl font-bold text-slate-900">Inscriptions</h2>
        <ListeInscriptions inscriptions={inscriptions} onSuppression={supprimerInscription} />
      </section>
    </main>
  );
}

export default App;
