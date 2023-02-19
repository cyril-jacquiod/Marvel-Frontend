import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

// ATTENTION .v2
// const cloudinary = require("cloudinary").v2;

const SignUp = ({ handleToken }) => {
  // STATE QUI GERENT LES INPUTS DU FORMULAIRE SIGNUP
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [description, setDescription] = useState("");

  // STATE QUI GERE LE MESSAGE D'ERREUR
  const [errorMessage, setErrorMessage] = useState("");

  // PERMET NAVIGATION DANS LE SITE APRES EXECUTION DU CODE
  const navigate = useNavigate();
  // SOUMISSION DU FORMULAIRE SANS RAFFRAICHISSEMENT
  const handleSignup = async (event) => {
    event.preventDefault();
    // SUPRESSION DU MESSAGE D'ERREUR - METTRE VIDE
    setErrorMessage("");
    try {
      // REQUETE AXIOS
      const response = await axios.post("http//localhost:3000/User/SignUp", {
        email: email,
        username: username,
        password: password,
      });

      // SI TOKEN GENERE ET STOCKE DANS APP.JS
      if (response.data.token) {
        // J'ENREGISTRE MON STATE ET MES COOKIES
        handleToken(response.data.token);
        // PUIS JE REDIRIGE VERS LA PAGE HOME APRES EXECUTION FONCTION
        navigate("/");
      }
    } catch (error) {
      // VERIFICATION console.log(error.message);
      console.log(error.response.data);
      console.log(error.response.status);
      // SI MESSAGE D'ERREUR "This email already has an account"
      if (error.response.data.message === "This email already has an account") {
        setErrorMessage(
          // REPONSE A L'UTILISATEUR
          "Cet email est déjà utilisé, veuillez créer un compte avec un mail valide."
        );
      }
      // SI MESSAGE D'ERREUR "Missing parameters"
      if (error.response.data.message === "Missing parameters") {
        setErrorMessage("Veuillez remplir tous les champs svp.");
      }
    }
  };
  return (
    <div
      // STYLE INLINE APPLIQUE POUR LE FORMULAIRE ENTRE LES DIV
      style={{
        display: "flex",
        backgroundColor: "black",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        height: "100hw",
        width: "100vw",
      }}
    >
      {/* STYLE CSS POUR LE BODY */}
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "black",
          aligncontent: "center",
          width: "30vw",
          height: "50vh",
          marginBottom: "20px",
          marginTop: "10px",
        }}
        // APPELEE LORS DE LA SOUMISSION DU FORMULAIRE
        onsubmit={handleSignup}
        // onsubmit={{event}} voir correction
      >
        <h2
          style={{
            marginTop: "80px",
            marginBottom: "40px",
            color: "white",
            justifyContent: "center",
            fontSize: "25px",
            fontFamily: "roboto",
            alignItems: "center",
            borderRadius: "5px",
          }}
        >
          S'incrire
        </h2>
        <input
          style={{
            marginBottom: "10px",
            backgroundColor: "lightgray",
            padding: "10px",
            borderRadius: "5px",
          }}
          type="text"
          placeholder="Nom d'utilisateur"
          // ON RECUPERE LA VALEUR USERNAME STOCKEE DANS LE STATE USERNAME
          value={username}
          onChange={(event) => {
            setUserName(event.target.value);
          }}
        />
        <input
          style={{
            marginBottom: "10px",
            backgroundColor: "lightgray",
            padding: "10px",
            borderRadius: "5px",
          }}
          type="email"
          placeholder="Email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <input
          style={{
            marginBottom: "10px",
            backgroundColor: "lightgray",
            padding: "10px",
            borderRadius: "5px",
          }}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />

        <input
          style={{
            marginBottom: "30px",
            backgroundColor: "#ee231f",
            fontSize: "15px",
            fontWeight: "bold",
            padding: "10px",
            borderRadius: "5px",
          }}
          type="submit"
          value="Valider"
        />
        {/* MESSAGE D'ERREUR */}
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        {/* REDIRECTION VERS LA PAGE LOGIN + MESSAGE */}
        <Link
          style={{
            color: "white",
            fontSize: "22px",
            padding: "10px",
          }}
          to="/login"
        >
          Tu as déjà un compte, connecte-toi !
        </Link>
      </form>
    </div>
  );
};

export default SignUp;
