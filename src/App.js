import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";

// PAGES A IMPORTER
import Home from "./pages/Home";
import ComicsList from "./pages/ComicsList";
import CaracterInfo from "./pages/CaracterInfo";
import CaracterList from "./pages/CaracterList";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";

// APPEL DU HEADER POUR TOUTES LES PAGES
import Header from "./components/Header";

function App() {
  // STATE POUR STOCKER VALEUR DE RECHERCHE
  const [search, setSearch] = useState("");

  /******************************************/
  /********** COOKIES *********************/
  /****************************************/

  // STATE POUR STOCKER TOKEN AVEC POUR VALEUR DE BASE LE COOKIE TOKEN SINON NULL (RAZ)
  const [token, setToken] = useState(Cookies.get("token-Marvel") || null);

  const handleToken = (token) => {
    if (token) {
      setToken(token);
      Cookies.set("token-Marvel", token, { expires: 14 });
    } else {
      setToken(null);
      Cookies.remove("token-Marvel");
    }
  };

  return (
    <Router>
      <Header
        token={token}
        search={search}
        handleToken={handleToken}
        setSearch={setSearch}
      />
      <Routes>
        {/* ROUTES FAISANT APPEL AUX COMPOSANTS (PAGES OU CONTAINERS) DES PROPS ELEMENT "HOME" "OFFER" "SIGNUP" */}
        <Route path="/" element={<Home />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/login" element={<Login handleToken={handleToken} />} />
        <Route path="/ComicsList" element={<ComicsList />} />
        <Route path="/CaracterList" element={<CaracterList />} />
        <Route path="/CaracterInfo" element={<CaracterInfo />} />
        {/* CARACTERE ":" INDIQUE QUE NOTRE PATH CONTIENT UN PARAMETRE DYNAMIQUE ID
        <Route path="/offer/:id" element={<Offer token/>} /> */}
      </Routes>
    </Router>
  );
}

export default App;
