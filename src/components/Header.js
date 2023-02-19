import "./Header.css";
import logo from "../components/Logo.png";
import { Link } from "react-router-dom";

const Header = ({ handleToken, token }) => {
  return (
    <header>
      {/* SI TOKEN ON AFFICHE BOUTON DECONNECTE, SINON S'INSCRIRE ET SE CONNECTER */}
      {token ? (
        <button
          className="container"
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
              alt="logo Marvel"
              style={{
                blockSize: 180,
                marginRight: 300,
                marginTop: 20,
                marginLeft: 20,
              }}
            />
            <Link to="/signup">
              <button className="otherButton">S'inscrire</button>
            </Link>
            <Link to="/login">
              <button className="otherButton">Se connecter</button>
            </Link>
          </span>
          <div>
            {/* // SI TOKEN OK CONNECT */}
            <Link to={token ? "/Comics" : "/SignUp"}>
              <button className="description">Comics</button>
            </Link>
            <Link to={"/Characters"}>
              <button className="description">Characters</button>
            </Link>
          </div>
        </>
      )}
    </header>
  );
};

export default Header;
