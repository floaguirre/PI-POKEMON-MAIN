import React from 'react'
import {Link} from 'react-router-dom'

import {useDispatch, useSelector} from 'react-redux';

import {getDetailAction} from '../actions/pokemonActions'

function PokemonCard({pokemon}) {
  const {id, name, sprite, types} = pokemon;
  const pokemons = useSelector(state => state.pokemons.pokemons);

  const dispatch = useDispatch();

  const getDetailPokemon = (idPokemon, pokemons) => dispatch(getDetailAction(idPokemon, pokemons));


  return (
    <div className='col-md-4 mb-3 mt-5' >
      <div className='card'>
        <h2 className='card-header'>{name}</h2>
        <img className='card-img-top' src={sprite} alt={name}></img>
        {types.map(type => (
          <h2>{type}</h2>
        ))}
        <div className='card-body'>
          <Link
            to={`/pokemons/detail/${id}`}
            className='btn btn-block btn-primary'
            onClick={() => getDetailPokemon(id, pokemons)}
          >
            Details Pokemon
          </Link>
        </div>

      </div>

    </div>
  )
}

export default PokemonCard