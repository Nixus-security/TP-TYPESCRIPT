import type { Film } from "./lib/utils";
import { FILMS, trierPar, resume, formaterTitre, libelleStatut, estVu, moyenne } from "./lib/utils";
import "./App.css";

const films: Film[] = trierPar(FILMS, "note").reverse().slice(0, 3);

const moyenneNotes = moyenne(FILMS.map((film) => film.note));
const moyenneAffichee =
  typeof moyenneNotes === "number" ? `${moyenneNotes.toFixed(2)}/10` : moyenneNotes;

function App() {
  return (
    <main id="catalogue">
      <h1>Catalogue de films</h1>
      <p className="moyenne">Note moyenne du catalogue : {moyenneAffichee}</p>

      <ul className="films">
        {films.map((film) => (
          <li key={film.id} className={`film statut-${film.statut}`}>
            <h2>{formaterTitre(film.titre, film.annee)}</h2>
            <p>{resume(film)}</p>
            <p className="statut">
              {libelleStatut(film.statut)} {estVu(film.statut) ? "✅" : "⏳"}
            </p>
          </li>
        ))}
      </ul>
    </main>
  );
}

export default App;
