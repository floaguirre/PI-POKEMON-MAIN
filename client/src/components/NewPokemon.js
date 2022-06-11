import React, {useEffect, useState, Fragment} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import { controlForm } from '../helper';

import {createNewPokemonAction, getTypesAction} from '../actions/pokemonActions'

function NewPokemon() {

  const dispatch = useDispatch();
  const loadedTypes = useSelector(state => state.pokemons.loadedTypes);

  useEffect(() => {
    if(!loadedTypes){
      const loadTypes = () => dispatch(getTypesAction());
      loadTypes();
    }

  },[dispatch, loadedTypes])

  const navigate = useNavigate();

  //state del componente

  const [input, setInput] = useState({
    name: '',
    hp: null,
    attack: null,
    defense : null,
    speed: null,
    height: null,
    weight : null,
    sprite : '',


  })

  const {name, hp, attack, defense, speed, height, weight, sprite} = input;
  const [types, setTypes] = useState([])
  const [error, setError] = useState(false);
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name] : e.target.value
    })

    setErrors(controlForm({
      ...input,
      [e.target.name] : e.target.value
    }))
  }

  const typesPokemon = useSelector(state => state.pokemons.types)
  const createNewPokemon = (pokemon) => dispatch(createNewPokemonAction(pokemon))

  const submitNewPokemon = (e) => {
    e.preventDefault();
    if(name.trim() === '' || hp === null || attack === null || defense === null || speed === null || height === null || weight === null || types.length ===0){
      setError(true);
      return
    }

    setError(false);
    if(sprite === ''){
      createNewPokemon({
        name,
        hp,
        attack,
        defense,
        speed,
        height,
        weight,
        types
      });

    }else {
      createNewPokemon({
        name,
        hp,
        attack,
        defense,
        speed,
        height,
        weight,
        sprite,
        types
      });

    }
    
    
    
    navigate('/');
  }

  return (
    <Fragment>
      <div className='container mt-5'>
        <div className='row justify-content-center'>
          <div className='col-md-8'>
            <div className='card'>
              <div className='card-body'>
                <h2 className='text-center mb-4 font-weight-bold'>
                  CREATE NEW POKEMON

                </h2>
                {error ? <p>Todos los campos son obligatorios</p> : null}
                <form onSubmit={submitNewPokemon}>
                  <div className='form-group'>
                    <label>Name:</label>
                    <input
                      type='text'
                      className='form-control'
                      placeholder='Nombre Pokemon'
                      name='name'
                      value={name}
                      onChange={(e) => handleChange(e)} 
                    />
                    {errors.name && (
                      <p>{errors.name}</p>
                    )}

                  </div>
                  <div className='form-group'>
                    <label>Hp:</label>
                    <input
                      type='number'
                      className='form-control'
                      placeholder='Puntos de vida'
                      name='hp'
                      value={hp}
                      onChange={(e) => handleChange(e)} 
                    />
                    {errors.hp && (
                      <p>{errors.hp}</p>
                    )}

                  </div>
                  <div className='form-group'>
                    <label>Attack:</label>
                    <input
                      type='number'
                      className='form-control'
                      placeholder='Puntos de Ataque'
                      name='attack'
                      value={attack}
                      onChange={(e) => handleChange(e)} 
                    />
                    {errors.attack && (
                      <p>{errors.attack}</p>
                    )}

                  </div>
                  <div className='form-group'>
                    <label>Defense:</label>
                    <input
                      type='number'
                      className='form-control'
                      placeholder='Puntos de Defensa'
                      name='defense'
                      value={defense}
                      onChange={(e) => handleChange(e)} 
                    />
                    {errors.defense && (
                      <p>{errors.defense}</p>
                    )}

                  </div>
                  <div className='form-group'>
                    <label>Speed:</label>
                    <input
                      type='number'
                      className='form-control'
                      placeholder='Velocidad'
                      name='speed'
                      value={speed}
                      onChange={(e) => handleChange(e)} 
                    />
                    {errors.speed && (
                      <p>{errors.speed}</p>
                    )}

                  </div>
                  <div className='form-group'>
                    <label>Height:</label>
                    <input
                      type='number'
                      className='form-control'
                      placeholder='Altura en cm'
                      name='height'
                      value={height}
                      onChange={(e) => handleChange(e)} 
                    />
                    {errors.height && (
                      <p>{errors.height}</p>
                    )}

                  </div>
                  <div className='form-group'>
                    <label>Weight:</label>
                    <input
                      type='number'
                      className='form-control'
                      placeholder='Peso en kilos'
                      name='weight'
                      value={weight}
                      onChange={(e) => handleChange(e)} 
                    />
                    {errors.weight && (
                      <p>{errors.weight}</p>
                    )}

                  </div>
                  <div className='form-group'>
                    <label>Sprite:</label>
                    <input
                      type='number'
                      className='form-control'
                      placeholder='Imagen del Pokemon'
                      name='sprite'
                      value={sprite}
                      onChange={(e) => handleChange(e)} 
                    />
                    

                  </div>
                  <div className='form-group'>
                    <label>Types:</label>
                    <select
                      className='form-control'
                      name='types'
                      onChange={(e) => setTypes([...types, e.target.value])}
                    >
                      <option value=''>--Seleccione--</option>
                      {typesPokemon.map(type => (
                        <option key={type.id} value={type.name}>{type.name}</option>
                      ))}
                    </select>
                    <button type="submit" className="mt-5 btn btn-primary font-weight-bold text-uppercase d-block w-100">Create</button>

                  </div>

                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default NewPokemon