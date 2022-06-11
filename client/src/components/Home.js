import React, {Fragment, useEffect, useState} from 'react'
import PokemonList from './PokemonList'
import SearchBar from './SearchBar';

import {useSelector, useDispatch} from 'react-redux';

import {loadBackUpAction} from '../actions/pokemonActions'

function Home() {

  const dispatch = useDispatch();
  const loadedBackUp = useSelector(state => state.pokemons.loadBackUp)
  const pokemons = useSelector(state => state.pokemons.pokemons);

  const itemsXpage = 12;

  const [currentpage , setCurrentpage] = useState(1);
  const [totalpages, setTotalpages] = useState(1);
  const indexOfLastPokemon = currentpage * itemsXpage;
  const indexOfFirstPokemon = indexOfLastPokemon - itemsXpage;
  const currentPokemons = pokemons.slice(indexOfFirstPokemon,indexOfLastPokemon)
  

  useEffect(() => {
    if(!loadedBackUp){
      const loadBackUp = () => dispatch(loadBackUpAction());
      loadBackUp();
      

    }else {
      const itemsXpage = 12;
      
      const calculatePages = Math.ceil(pokemons.length/itemsXpage);

      setTotalpages(calculatePages);


    }

    
    
  },[dispatch, loadedBackUp, setTotalpages, pokemons])


  
  

  

  

  
  const error = useSelector(state => state.pokemons.error);
  const loading = useSelector(state => state.pokemons.loading);

  
  
  

  const previousPage = () => {
    const newActualPage = currentpage - 1;
    if(newActualPage === 0) return;



    setCurrentpage(newActualPage);

  }
  const nextPage = () => {
    const newActualPage = currentpage + 1;

    if(newActualPage > totalpages) return;
    setCurrentpage(newActualPage);

  }


  return (
    <Fragment>
        <div className='container mt-5'>
          <div className='container mt-5'>
            <SearchBar />

          </div>
            <div className='row justify-content-center'>
                <PokemonList 
                  pokemons={currentPokemons}
                  error={error}
                  loading={loading}
                />

                { (currentpage === 1) ? null : (
                  <button
                    type='button'
                    className='btn btn-info mr-1 mb-5 mt-3'
                    onClick={previousPage}
                  >
                    &laquo; Previous
                  </button>
                )}

                { (currentpage === totalpages) ? null : (
                  <button
                    type='button'
                    className='btn btn-info mb-5 mt-3'
                    onClick={nextPage}
                  >
                    Next &raquo;
                  </button>
                )}

                

                

            </div>
        </div>
    </Fragment>
  )
}

export default Home