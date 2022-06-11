import React from 'react'
import PokemonCard from './PokemonCard'




function PokemonList({pokemons, error, loading}) {
  

  




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