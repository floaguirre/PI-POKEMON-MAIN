import React, {useEffect} from 'react'
import PokemonCard from './PokemonCard'

import {useSelector, useDispatch} from 'react-redux';

import {getPokemonsAction} from '../actions/pokemonActions'


function PokemonList() {
  const dispatch = useDispatch();

  const loadPokemons = useSelector(state => state.pokemons.loadPokemons);

  useEffect(() => {

    if(!loadPokemons){
      const getPokemons = () => dispatch(getPokemonsAction());
      getPokemons();


    }
    
  },[], loadPokemons)

  const pokemons = useSelector(state => state.pokemons.pokemons);
  const error = useSelector(state => state.pokemons.error);
  const loading = useSelector(state => state.pokemons.loading);




  return (
    <div className='row mt-5'>
      {error ? <p>Hubo un error</p> : null}
      {loading ? <p>Cargando...</p> : (
        pokemons.map( pokemon => (
          <PokemonCard
            key={pokemon.id}
            pokemon={pokemon} 
          />
        ))
      )}

    </div>
  )
}

export default PokemonList