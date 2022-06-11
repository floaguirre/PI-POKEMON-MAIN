import React, {useState} from 'react'

import { useDispatch, useSelector } from 'react-redux';

import {searchPokemonAction} from '../actions/pokemonActions'

function SearchBar() {

  const dispatch = useDispatch();

  const searchPokemon = (name, pokemons) => dispatch(searchPokemonAction(name, pokemons));
  
  const pokemons = useSelector(state => state.pokemons.backUp);

  const [name, setName] = useState('');

  const submitSearchPokemon = (e) => {
    e.preventDefault();
    if(name === '') return;

    searchPokemon(name, pokemons);

    setName('');

  }

  
  return (
    <form className='col-md-8' onClick={submitSearchPokemon}>
      <fieldset className='text-left'>
        <legend>Search Pokemon By Name</legend>
      </fieldset>

      <div className='row'>
        <div className='col-md-4'>
          <input
              name='name'
              className='form-control'
              type="text"
              placeholder='pikachu'
              value={name}
              onChange={(e) => setName([e.target.value])}


          /> 

        </div>
        <div className='col-md-2'>
          <input
            type='submit'
            className='btn btn-block btn-primary'
            value='search'

          
          />

        </div>
          

      </div>
    </form>
  )
}

export default SearchBar