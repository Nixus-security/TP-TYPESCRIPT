import { Route, Routes } from "react-router-dom";
import { Layout } from "./composants/Layout";
import { RouteProtegee } from "./composants/RouteProtegee";
import { Accueil } from "./pages/Accueil";
import { Recherche } from "./pages/Recherche";
import { DetailFilm } from "./pages/DetailFilm";
import { Favoris } from "./pages/Favoris";
import { Connexion } from "./pages/Connexion";
import { PageIntrouvable } from "./pages/PageIntrouvable";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Accueil />} />
        <Route path="recherche" element={<Recherche />} />
        <Route path="films/:id" element={<DetailFilm />} />
        <Route
          path="favoris"
          element={
            <RouteProtegee>
              <Favoris />
            </RouteProtegee>
          }
        />
        <Route path="connexion" element={<Connexion />} />
        <Route path="*" element={<PageIntrouvable />} />
      </Route>
    </Routes>
  );
}

export default App;
