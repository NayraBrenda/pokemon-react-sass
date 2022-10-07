import "./App.scss";
import Pokemons from "./Components/Pokemons";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const url = "https://pokeapi.co/api/v2/pokemon/";

  const [pokemons, setPokemons] = useState({});

  useEffect(() => {
    axios.get(url).then((resp) => {
      setPokemons(resp.data);
    }, []);
  });

  return (
    <div className="app">
      <ul className="container">
        {pokemons?.results?.map((item) => {
          return <Pokemons pokemon={item} key={item.name} />;
        })}
      </ul>
    </div>
  );
}

export default App;
