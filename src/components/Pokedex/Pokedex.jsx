import React, { useEffect, useState } from 'react';

import './index.css';

import { getByPagination, getPokemonDetailByUrl } from '../../service/PokeApi';

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  const [pokemons, setPokemons] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState({});

  async function getPokemons() {
    const { data = {} } = await getByPagination();
    const promises = data.results.map(result => getPokemonDetailByUrl(result.url));

    const pokemons = await Promise.all(promises);
    console.log(pokemons[0].data);
    setPokemons(pokemons);
    setSelectedPokemon(pokemons[0].data || {})
  };

  useEffect(() => {
    getPokemons();
  }, []);

  // todo: refactor logic
  function nextPokemon() {
    const index = pokemons.findIndex(pokemon => pokemon.data.id === selectedPokemon.id);
    const newIndex = index + 1 > pokemons.length - 1 ? 0 : index + 1;

    const newSelectedPokemon = pokemons[newIndex].data;
    setSelectedPokemon(newSelectedPokemon);
  };

  // todo: refactor logic
  function backPokemon() {
    const index = pokemons.findIndex(pokemon => pokemon.data.id === selectedPokemon.id);
    const newIndex = index - 1 < 0 ? pokemons.length - 1 : index - 1;

    const newSelectedPokemon = pokemons[newIndex].data;
    setSelectedPokemon(newSelectedPokemon);
  };


  return (
    <div id="pokedex">
      <div id="left">
        <div id="logo"></div>
        <div id="bg_curve1_left"></div>
        <div id="bg_curve2_left"></div>
        <div id="curve1_left">
          <div id="buttonGlass">
            <div id="reflect"> </div>
          </div>
          <div id="miniButtonGlass1"></div>
          <div id="miniButtonGlass2"></div>
          <div id="miniButtonGlass3"></div>
        </div>
        <div id="curve2_left">
          <div id="junction">
            <div id="junction1"></div>
            <div id="junction2"></div>
          </div>
        </div>
        <div id="screen">
          <div id="topPicture">
            <div id="buttontopPicture1"></div>
            <div id="buttontopPicture2"></div>
          </div>
          <div id="picture">
            <img src={selectedPokemon.sprites?.front_default} alt="psykokwak" height="170" />
          </div>
          <div id="buttonbottomPicture"></div>
          <div id="speakers">
            <div className="sp"></div>
            <div className="sp"></div>
            <div className="sp"></div>
            <div className="sp"></div>
          </div>
        </div>
        <div id="bigbluebutton"></div>
        <div id="barbutton1"></div>
        <div id="barbutton2"></div>
        <div id="cross">
          <div id="leftcross" onClick={backPokemon}>
            <div id="leftT"></div>
          </div>
          <div id="topcross">
            <div id="upT"></div>
          </div>
          <div id="rightcross" onClick={nextPokemon}>
            <div id="rightT"></div>
          </div>
          <div id="midcross">
            <div id="midCircle"></div>
          </div>
          <div id="botcross">
            <div id="downT"></div>
          </div>
        </div>
      </div>
      <div id="right">
        <div id="stats">
          <strong>Name:</strong> {selectedPokemon.name || 'Loading...'}<br />
          <strong>Height:</strong> {selectedPokemon.height || 'Loading...'}<br />
          <strong>Weight:</strong> {selectedPokemon.weight || 'Loading...'}<br /><br />
        </div>
        <div id="blueButtons1">
          <div className="blueButton"></div>
          <div className="blueButton"></div>
          <div className="blueButton"></div>
          <div className="blueButton"></div>
          <div className="blueButton"></div>
        </div>
        <div id="blueButtons2">
          <div className="blueButton"></div>
          <div className="blueButton"></div>
          <div className="blueButton"></div>
          <div className="blueButton"></div>
          <div className="blueButton"></div>
        </div>
        <div id="miniButtonGlass4"></div>
        <div id="miniButtonGlass5"></div>
        <div id="barbutton3"></div>
        <div id="barbutton4"></div>
        <div id="yellowBox1"></div>
        <div id="yellowBox2"></div>
        <div id="bg_curve1_right"></div>
        <div id="bg_curve2_right"></div>
        <div id="curve1_right"></div>
        <div id="curve2_right"></div>
      </div>
    </div>
  );
}
