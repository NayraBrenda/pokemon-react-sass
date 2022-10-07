import axios from "axios";
import { useEffect, useState } from "react";
import "./Pokemons.scss";
import ReactLoading from "react-loading";

function Pokemons({ pokemon }) {
  const [pokemonItem, setPokemonItem] = useState({});
  const [ability, setAbility] = useState("");
  const [moveDetails, setMoveDetails] = useState();
  const [image, setImage] = useState();

  useEffect(() => {
    axios.get(pokemon.url).then((resp) => {
      setPokemonItem(resp.data);
      setImage(resp.data?.sprites?.front_default);
    });
  }, []);

  useEffect(() => {
    axios.get(ability).then((resp) => {
      setMoveDetails(resp.data);
    });
  }, [ability]);

  // function marking() {
  // }

  // function imageChange() {
  //   if (image === pokemonItem.sprites?.front_default) {
  //     setImage(pokemonItem.sprites?.back_default);
  //   } else {
  //     setImage(pokemonItem.sprites?.front_default);
  //   }
  // }

  return (
    <li className="perfil">
      <div className="pokemon-image">
        {image ? (
          <img
            src={image}
            onMouseOver={() => setImage(pokemonItem.sprites?.back_default)}
            onMouseOut={() => setImage(pokemonItem.sprites?.front_default)}
          />
        ) : (
          <ReactLoading type="spin" color="#fff" height={100} width={100} />
        )}
      </div>

      <h2 className="pokemon-name">{pokemon.name}</h2>

      <select
        className="pokemon-moves"
        value={ability}
        onChange={(e) => setAbility(e.target.value)}
      >
        <option value="">Movimentos:</option>
        {pokemonItem?.moves?.map((item) => {
          return <Move item={item} key={item.move.name} />;
        })}
      </select>

      {moveDetails && (
        <div className="move-details">
          precisão: {moveDetails?.accuracy || " "}, força:{" "}
          {moveDetails?.power || " "}
        </div>
      )}

      <ul className="pokemon-abilities">
        {pokemonItem.abilities?.map((abilitiesDetails) => {
          return (
            <AbilitiesDetails
              item={abilitiesDetails}
              key={abilitiesDetails.ability.name}
            />
          );
        })}
      </ul>
    </li>
  );
}

function Move({ item }) {
  return <option value={item.move.url}>{item.move.name}</option>;
}

function AbilitiesDetails({ item }) {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <li className="checkbox">
      <input
        type="checkbox"
        checked={isChecked}
        onClick={() => setIsChecked(!isChecked)}
      />
      <span className={isChecked ? "checked" : null}>{item.ability.name}</span>
    </li>
  );
}

export default Pokemons;
