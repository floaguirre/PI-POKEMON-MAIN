import {
    CREATE_POKEMON,
    CREATE_POKEMON_SUCCESS,
    CREATE_POKEMON_ERROR,

    GET_POKEMONS,
    GET_POKEMONS_SUCCESS,
    GET_POKEMONS_ERROR,

    GET_DETAIL,
    GET_DETAIL_SUCCESS,
    GET_DETAIL_ERROR,

    SEARCH_POKEMON,
    SEARCH_POKEMON_SUCCESS,
    SEARCH_POKEMON_ERROR,

    GET_TYPES,
    GET_TYPES_SUCCESS,
    GET_TYPES_ERROR, 
    
} from '../types';

import clienteAxios from '../config/axios';

//************************************************************************ */
//TRAER POKEMONES
export function getPokemonsAction() {
    return async (dispatch) => {
        dispatch(getPokemons());

        try {
            const respuesta = await clienteAxios.get('/pokemons');
            dispatch(getPokemonsSuccess(respuesta.data))
            
        } catch (error) {
            console.log(`${GET_POKEMONS_ERROR} : ${error}`);
            dispatch(getPokemonsError());
            
        }
    }
}

const getPokemons = () => ({
    type: GET_POKEMONS,
    payload: true
});

const getPokemonsSuccess = (pokemons) => ({
    type: GET_POKEMONS_SUCCESS,
    payload: pokemons
})

const getPokemonsError = () => ({
    type: GET_POKEMONS_ERROR,
    payload: true
})


//************************************************************************************* */
//CREAR UN NUEVO POKEMON

export function createNewPokemonAction(pokemon) {
    return async (dispatch) => {
        dispatch(createPokemon());

        try {
            const respuesta = await clienteAxios.post('/pokemons', pokemon);
            dispatch(createPokemonSuccess(respuesta.data))
            
        } catch (error) {
            console.log(`${CREATE_POKEMON_ERROR} : ${error}`)
            dispatch(createPokemonError());
            
        }
    }
}

const createPokemon = () => ({
    type: CREATE_POKEMON,
    payload: true
})

const createPokemonSuccess = (pokemon) => ({
    type: CREATE_POKEMON_SUCCESS,
    payload: pokemon
})

const createPokemonError = () => ({
    type: CREATE_POKEMON_ERROR,
    payload: true
})

/****************************************************************************** */
//TRAER TIPOS DE POKEMONS
export function getTypesAction() {
    return async (dispatch) => {
        dispatch(getTypes());

        try {
            const respuesta = await clienteAxios.get('/types');
            dispatch(getTypesSuccess(respuesta.data))
            
        } catch (error) {
            console.log(`${GET_TYPES_ERROR} : ${error}`)
            dispatch(getTypesError());
            
        }
    }
}

const getTypes = () => ({
    type: GET_TYPES,
    payload: true
})

const getTypesSuccess = (types) => ({
    type: GET_TYPES_SUCCESS,
    payload: types
})

const getTypesError = () => ({
    type: GET_TYPES_ERROR,
    payload: true
})


/*************************************************************************************** */
//BUSCAR POKEMON POR NOMBRE

export function searchPokemonAction(name) {
    return async (dispatch) => {
        dispatch(searchPokemon());

        try {
            const respuesta = await clienteAxios.get(`/pokemons?name=${name}`);
            dispatch(searchPokemonSuccess(respuesta.data));
            
        } catch (error) {
            console.log(`${SEARCH_POKEMON_ERROR} : ${error}`)
            dispatch(searchPokemonError())
            
        }
    }
}

const searchPokemon = () => ({
    type: SEARCH_POKEMON,
    payload: true
})

const searchPokemonSuccess = (pokemon) => ({
    type: SEARCH_POKEMON_SUCCESS,
    payload: pokemon
})

const searchPokemonError = () => ({
    type: SEARCH_POKEMON_ERROR,
    payload: true
})




/*************************************************************************************************** */
//DETALLE POKEMON

export function getDetailAction(pokemonId) {
    return async (dispatch) => {
        dispatch(getDetail());

        try {
            const respuesta = await clienteAxios.get(`/pokemons/${pokemonId}`);
            dispatch(getDetailSuccess(respuesta.data))
            
        } catch (error) {
            console.log(`${GET_DETAIL_ERROR} : ${error}`)
            dispatch(getDetailError());
            
        }
    }
}

const getDetail = () => ({
    type: GET_DETAIL,
    payload: true
})

const getDetailSuccess = (pokemon) => ({
    type: GET_DETAIL_SUCCESS,
    payload: pokemon
})

const getDetailError = () => ({
    type: GET_DETAIL_ERROR,
    payload: true
})