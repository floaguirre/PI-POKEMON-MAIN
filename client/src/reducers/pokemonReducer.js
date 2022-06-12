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

    LOAD_BACKUP,
    LOAD_BACKUP_SUCCESS,
    LOAD_BACKUP_ERROR,

    SWITCH_LANDING
} from '../types';

const initialState = {
    backUp : [],
    pokemons : [],
    types : [],
    detail : [],
    loadBackUp: false,
    loadedTypes : false,
    landingPage : null,
    error: false,
    loading: false
}

export default function pokemonReducer(state = initialState, action){
    switch(action.type) {
        case CREATE_POKEMON:
        case GET_DETAIL:
        case SEARCH_POKEMON:
        case GET_TYPES:
        case LOAD_BACKUP:
            return {
                ...state,
                loading: action.payload
            }

        case CREATE_POKEMON_ERROR:
        case GET_DETAIL_ERROR:
        case SEARCH_POKEMON_ERROR:
        case GET_TYPES_ERROR:
        case LOAD_BACKUP_ERROR:
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
                backUp : [action.payload, ...state.pokemons],
                pokemons: [action.payload, ...state.pokemons]
            }
        case LOAD_BACKUP_SUCCESS:
            return {
                ...state,
                loading: false,
                error: false,
                loadBackUp: true,
                backUp: action.payload,
                pokemons: action.payload
            }
        case GET_POKEMONS:
            return {
                ...state,
                loading: false,
                error: null,
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
                pokemons : [action.payload]
            }
        case GET_TYPES_SUCCESS:
            return {
                ...state,
                loading: false,
                error : false,
                loadedTypes : true,
                types : action.payload
            }
        case SWITCH_LANDING:
            return {
                ...state,
                landingPage: action.payload

            }


        default:
            return state;
    }
}