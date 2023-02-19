import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";

// PAGES A IMPORTER
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Comics from "./pages/Comics";
import Characters from "./pages/Characters";

// APPEL HEADER & FOOTER POUR TOUTES LES PAGES
import Header from "./components/Header";
import Footer from "./components/Footer";

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
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/Login" element={<Login handleToken={handleToken} />} />
        <Route path="/Comics" element={<Comics />} />
        <Route path="/Characters" element={<Characters />} />
        {/* CARACTERE ":" INDIQUE QUE NOTRE PATH CONTIENT UN PARAMETRE DYNAMIQUE ID
        <Route path="/Characters/:id" element={<Characters token/>} /> */}
      </Routes>
      <Footer>Made by Cyril at LeReacteur</Footer>
    </Router>
  );
}

export default App;
