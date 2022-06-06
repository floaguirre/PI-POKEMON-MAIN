import React from 'react'

import {useSelector} from 'react-redux';

function DetailPokemon() {
  const pokemon = useSelector(state => state.pokemons.detail)

  const loading = useSelector(state => state.pokemons.loading)

  const {id, name, hp, attack, defense, speed, height, weight, sprite, types} = pokemon

  return (
    <div className='container'>
      <div className='cold-md-6 mb-3 mt-5'>
      {loading ? <p>Cargando...</p> : (
        <div className='card'>
          
            
            
            <h2 className='card-header'>{name}</h2>
            <img className='card-img-top' src={sprite} alt={`Pokemon Sprite ${name}`}></img>
            <h3>HP:{hp}</h3>
            <h3>ATTACK: {attack}</h3>
            <h3>DEFENSE: {defense}</h3>
            <h3>SPEED: {speed}</h3>
            <h3>HEIGHT: {height}</h3>
            <h3>WEIGHT: {weight}</h3>
            <h3>TYPES:</h3>
            {types?.map(type => (
              <h3 >{type}</h3>
            ))}
            
  

          
          
        </div>
        )}
      </div>

    </div>
  )
}

export default DetailPokemon