import "./Header.css";
import logo from "../components/Logo.png";
import { Link } from "react-router-dom";

const Header = ({ handleToken, token, search, setSearch }) => {
  return (
    <header
      style={{
        backgroundColor: "black",
        height: "200px",
      }}
    >
      {/* SI TOKEN ON AFFICHE BOUTON DECONNECTE, SINON S'INSCRIRE ET SE CONNECTER */}
      {token ? (
        <button
          className="header"
          onClick={() => {
            // ON SUPPRIME LE COOKIE (Cookies.remove("token-vinted");)
            handleToken(null);
          }}
        >
          Se Déconnecter
        </button>
      ) : (
        <>
          <span>
            <img
              src={logo}
              alt="logo vinted"
              style={{
                blockSize: 150,
                marginRight: 40,
                alignItems: "bottom",
              }}
            />
          </span>
          {/* // STYLE INLINE POUR LES BOUTONS */}
          {/* BARRE DE RECHERCHE SUR MOT CLE */}
          <input
            className="searchButton"
            style={{
              background: "white",
              backgroundColor: "lightgray",
              color: "black",
              fontSize: 15,
              borderRadius: 5,
              width: 350,
              padding: "10px",
              marginLeft: 30,
              marginRight: 30,
            }}
            // ON RECUPERE LA VALEUR AFFICHÉE
            value={search}
            type="text"
            placeholder="Rechercher des articles"
            onChange={(event) => {
              setSearch(event.target.value);
            }}
          />
          {/* // SI TOKEN OK CONNECT */}
          <Link to={token ? "/Publish" : "/login"}>
            {/* <Link to={"/Publish"}> */}
            <button className="descriptionButton">Description</button>
          </Link>{" "}
          {/* Recherche des articles
            </button> */}
          <Link to="/signup">
            <button className="otherButton">S'inscrire</button>
          </Link>
          <Link to="/login">
            <button className="otherButton">Se connecter</button>
          </Link>
        </>
      )}
    </header>
  );
};

export default Header;
