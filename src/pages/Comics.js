import "./Comics.css";

// STOCKAGE DATA
import { useState, useEffect } from "react";
// UTILISATION DES ROUTES
import axios from "axios";

const Comics = ({ search, setSearch }) => {
  // FUNCTION STATE POUR STOCKAGE
  const [data, setData] = useState();
  // SETISLOADING PAR DEFAUT : TRUE
  const [isLoading, setIsLoading] = useState(true);

  // CETTE REQUETE : LISTE DES COMICS PAR "THUMBNAIL" = URL(PATH) + EXTENSION(.JPG)
  useEffect(() => {
    // DECLARATION FONCTION ASYNC FAISANT REQUETE (FONCTION USEEFFECT PAS ASYNC)
    const fetchData = async () => {
      // TRY CATCH EN CAS DE REQUETE KO
      try {
        // DECLARATION DE LA VARIABLE RESPONSE AVEC CLE ID
        const response = await axios.get("http://localhost:3000/Comics");
        // VERIFICATION AVEC console.log(response.data); OK AVEC BDD
        // STOCKAGE DU RESULTAT DANS DATA
        setData(response.data);
        // CHARGEMENT OK : ISLOADING FALSE
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    // RECUPERATION DATA
    fetchData();
  }, []);
  // CHARGEMENT ENCOURS : ISLOADING TRUE + MESSAGE LOADING

  return isLoading ? (
    <p>Loading ...</p>
  ) : (
    <div>
      <div>
        {/* BARRE DE RECHERCHE SUR MOT CLE */}
        <input
          className="searchButton"
          // ON RECUPERE LA VALEUR AFFICHÉE
          value={search}
          type="text"
          placeholder="Recherche ..."
          onChange={(event) => {
            setSearch(event.target.value);
          }}
        />
      </div>
      {/* RECUPERATION DU DATA VIA LA CLE ID SOUS FORME DE TABLEAU PAR CARACTER */}
      <div classname="container">
        {data.results.map((comics) => {
          return (
            <div>
              <article key={comics._id}>
                <p>{comics.title}</p>
                <img
                  src={comics.thumbnail.path + "." + comics.thumbnail.extension}
                  alt="comics"
                />
              </article>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Comics;
