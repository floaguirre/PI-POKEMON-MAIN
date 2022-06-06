import React, {Fragment} from 'react'
import PokemonList from './PokemonList'

function Home() {
  return (
    <Fragment>
        <div className='container mt-5'>
            <div className='row justify-content-center'>
                <PokemonList />

            </div>
        </div>
    </Fragment>
  )
}

export default Home