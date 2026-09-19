import { FILMS, trierPar, filtrerParGenre } from "./lib/utils";
import { ListeFilms } from "./composants/ListeFilms";
import { Bouton } from "./composants/Bouton";

function App() {
  // Tous les films triés par titre.
  const tousLesFilms = trierPar(FILMS, "titre");

  // Un genre absent du catalogue -> tableau vide -> démontre le cas vide.
  const documentaires = filtrerParGenre(FILMS, "Documentaire");

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Catalogue de films</h1>
        <p className="text-gray-500">
          {FILMS.length} films — composants typés et mise en forme Tailwind.
        </p>
      </header>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-bold text-gray-900">Tous les films</h2>
        <ListeFilms
          films={tousLesFilms}
          onSelection={(film) => console.log("Sélection :", film.titre)}
        />
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-bold text-gray-900">Documentaires</h2>
        <ListeFilms
          films={documentaires}
          messageVide="Aucun documentaire dans le catalogue pour le moment."
        />
      </section>

      <section>
        <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-400">
          Les quatre états du composant bouton
        </p>
        <div className="flex flex-wrap gap-3">
          <Bouton libelle="Action principale" />
          <Bouton libelle="Action secondaire" variante="secondaire" />
          <Bouton libelle="Supprimer" variante="danger" />
          <Bouton libelle="Indisponible" desactive />
        </div>
      </section>
    </div>
  );
}

export default App;
