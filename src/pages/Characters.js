import { useState, useEffect } from "react";
import axios from "axios";

const Characters = () => {
  // FUNCTION STATE POUR STOCKAGE
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState();

  // CETTE REQUETE : LISTE DES CHARACTERS "THUMBNAIL"
  useEffect(() => {
    // DECLARATION DE FONCTION FAISANT LA REQUETE VIA UNE AUTRE FONCTION (FCT USEEFFECT PAS ASYNC)
    const fetchData = async () => {
      // TRY CATCH EN CAS DE REQUETE KO
      try {
        // DECLARATION DE LA VARIABLE RESPONSE AVEC CLE RECHERCHE TITLE FONCTIONNE PAS
        const response = await axios.get("http://localhost:3000/Characters");
        // VERIFICATION AVEC console.log(response.data);
        // STOCKAGE DU RESULTAT DANS DATA
        setData(response.data);
        // METTRE ISLOADING A FALSE
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);
  return isLoading ? (
    <p>Loading ...</p>
  ) : (
    <div>
      {/* RECUPERATION DU DATA VIA LA CLE ID SOUS FORME DE TABLEAU PAR CARACTER */}
      {data.results.map((character) => {
        return (
          <article key={character._id}>
            <p>{character.name}</p>
            <img
              src={
                character.thumbnail.path + "." + character.thumbnail.extension
              }
              alt="character"
            />
          </article>
        );
      })}
    </div>
  );
};

export default Characters;
