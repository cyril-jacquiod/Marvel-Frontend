import { useState, useEffect } from "react";
import axios from "axios";

const Home = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios.get("http://localhost:3000/Users");
      console.log(response.data);
      setData(response.data);
      setIsLoading(false);
    };
    fetchUsers();
  }, []);
  return (
    <div className="container">
      <h1>Bienvenu sur la page d'accueil</h1>
      {isLoading === true ? (
        <p>En cours de chargement</p>
      ) : (
        <div>
          {data.map((item) => {
            return (
              <p key={item._id}>
                {item.username} / {item.email}
              </p>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Home;
