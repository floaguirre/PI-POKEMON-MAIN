import React from 'react'
import PokemonCard from './PokemonCard'




function PokemonList({pokemons}) {
  
  return (
    <div className='row mt-5'>
      {
        pokemons.map( pokemon => (
          <PokemonCard
            key={pokemon.id}
            pokemon={pokemon} 
          />
        ))
      }

    </div>
  )
}

export default PokemonList