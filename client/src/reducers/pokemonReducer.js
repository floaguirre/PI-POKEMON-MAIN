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
    GET_TYPES_ERROR 
} from '../types';

const initialState = {
    pokemons : [],
    types : [],
    search : [],
    detail : [],
    loadPokemons : false,
    loadedTypes : false,
    error: false,
    loading: false
}

export default function pokemonReducer(state = initialState, action){
    switch(action.type) {
        case CREATE_POKEMON:
        case GET_POKEMONS:
        case GET_DETAIL:
        case SEARCH_POKEMON:
        case GET_TYPES:
            return {
                ...state,
                loading: action.payload
            }

        case CREATE_POKEMON_ERROR:
        case GET_POKEMONS_ERROR:
        case GET_DETAIL_ERROR:
        case SEARCH_POKEMON_ERROR:
        case GET_TYPES_ERROR:
            return {
                ...state,
                loading: false,
                error : action.payload
            }

        case CREATE_POKEMON_SUCCESS:
            return {
                ...state,
                loading: false,
                error: false,
                pokemons: [action.payload, ...state.pokemons]
            }
        case GET_POKEMONS_SUCCESS:
            return {
                ...state,
                loading: false,
                error: false,
                loadPokemons: true,
                pokemons : action.payload
            }
        case GET_DETAIL_SUCCESS:
            return {
                ...state,
                loading: false,
                error: false,
                detail : action.payload

            }
        case SEARCH_POKEMON_SUCCESS:
            return {
                ...state,
                loading : false,
                error : false,
                search : action.payload
            }
        case GET_TYPES_SUCCESS:
            return {
                ...state,
                loading: false,
                error : false,
                loadedTypes : true,
                types : action.payload
            } 



        default:
            return state;
    }
}