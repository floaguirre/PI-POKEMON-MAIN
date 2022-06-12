import React, {Fragment, useEffect, useState} from 'react'
import PokemonList from './PokemonList'
import SearchBar from './SearchBar';

import {useSelector, useDispatch} from 'react-redux';

import {loadBackUpAction, getPokemonsAction} from '../actions/pokemonActions'
import Pagination from './Pagination';

function Home() {

  const dispatch = useDispatch();

  const loadedBackUp = useSelector(state => state.pokemons.loadBackUp)
  
  useEffect(() => {
    if(!loadedBackUp){
      const loadBackUp = () => dispatch(loadBackUpAction());
      loadBackUp();
      

    }

  }, [dispatch, loadedBackUp])

  const backUp = useSelector(state => state.pokemons.backUp);

  useEffect(() => {
    if(loadedBackUp) {
      const getPokemons  = (backUp) => dispatch(getPokemonsAction(backUp));
      getPokemons(backUp);
    }
  }, [dispatch, backUp, loadedBackUp])
  


  const pokemons = useSelector(state => state.pokemons.pokemons);
  const itemsXpage = 12;
  
  const [totalpages, setTotalpages] = useState(1);
 
  useEffect(() => {
    const calculatePages = Math.ceil(pokemons.length/itemsXpage);
    setTotalpages(calculatePages);

  },[setTotalpages, pokemons])
  

  
  

  const [currentpage , setCurrentpage] = useState(1);
  
  
  const indexOfLastPokemon = currentpage * itemsXpage;
  const indexOfFirstPokemon = indexOfLastPokemon - itemsXpage;
  const currentPokemons = pokemons.slice(indexOfFirstPokemon,indexOfLastPokemon)
  
  
  const error = useSelector(state => state.pokemons.error);
  const loading = useSelector(state => state.pokemons.loading);

  
  const paginated = (pageNumber) => {
    setCurrentpage(pageNumber)
  }
  

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
    <div className='container'>
      <div className='mt-5'>
        <SearchBar />
      </div>
      <button>Clean Up</button>
      { loading && <h2> Loading ...</h2>}
      
      { pokemons && 
        <div className='mt-5'>
          <PokemonList pokemons={currentPokemons}/>
          
          <Pagination 
            paginated={paginated} 
            nextPage={nextPage} 
            previousPage={previousPage} 
            totalPages={totalpages}
            currentpage={currentpage}
      
          />
        </div>
        
      }

       
        
      

    </div>
  )
}

export default Home