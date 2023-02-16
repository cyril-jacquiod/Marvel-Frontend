import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Login = ({ handleToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http//localhost/3000/user/login", {
        email: email,
        password: password,
      });
      console.log(response.data);
      if (response.data.token) {
        // Cookies.set("token-vinted", response.data.token, { expires: 14 });
        handleToken(response.data.token);
        navigate("/");
      }
    } catch (error) {
      //   console.log(error.message);
      console.log(error.response.data);
    }
  };

  return (
    <div
      // STYLE INLINE POUR LE FORMULAIRE
      style={{
        display: "flex",
        backgroundColor: "black",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        height: "100hw",
      }}
    >
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
        onSubmit={handleLogin}
      >
        <h1
          style={{
            marginBottom: "40px",
            color: "white",
            justifyContent: "center",
            fontSize: "25px",
            fontFamily: "roboto",
            alignItems: "center",
            borderRadius: "5px",
          }}
        >
          Se Connecter
        </h1>
        <input
          style={{
            marginBottom: "10px",
            backgroundColor: "lightgray",
            padding: "10px",
            borderRadius: "5px",
          }}
          value={email}
          type="email"
          placeholder="Email"
          // DECLARATION DE FONCTION
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
          value={password}
          type="password"
          placeholder="Mot de passe"
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
        {/* // RE-DIRIGE A LA PAGE SIGNUP */}
        <Link
          style={{
            color: "white",
            fontSize: "22px",
            padding: "10px",
          }}
          to="/signup"
        >
          Pas encore de compte ? ... Inscris-toi
        </Link>
      </form>
    </div>
  );
};

export default Login;
