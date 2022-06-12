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

import clienteAxios from '../config/axios';



/*************************************************************** */
//CARGAR BACKUP
export function loadBackUpAction() {
    return async (dispatch) => {
        dispatch(loadBackUp());

        try {
            
            const firstRequest = await clienteAxios.get('/pokemons');
            const subRequest = firstRequest.data.map( pokemon => clienteAxios.get(`/pokemons/${pokemon.id}`))
            const result = await Promise.all(subRequest);
            const backup = result.map( e => e.data)
            
            
            dispatch(loadBackUpSuccess(backup))
            


            
            
        } catch (error) {
            console.log(`${LOAD_BACKUP_ERROR} : ${error}`)
            dispatch(loadBackUpError());
            
        }
    }
}

const loadBackUp = () => ({
    type: LOAD_BACKUP,
    payload: true
})

const loadBackUpSuccess = (backup) => ({
    type: LOAD_BACKUP_SUCCESS,
    payload: backup
})

const loadBackUpError = () => ({
    type: LOAD_BACKUP_ERROR,
    payload: true
})


//************************************************************************ */
//TRAER POKEMONES
export function getPokemonsAction(backUp) {
    return async (dispatch) => {
        dispatch(getPokemons(backUp));

        
    }
}

const getPokemons = (backUp) => ({
    type: GET_POKEMONS,
    payload: backUp
    
});




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

export function searchPokemonAction(name, backUp) {
    return async (dispatch) => {
        dispatch(searchPokemon());

        try {
            const response = backUp.filter( e => e.name === name)
            if(response.length === 0) {
                const respuesta = await clienteAxios.get(`/pokemons?name=${name}`);
                dispatch(searchPokemonSuccess(respuesta.data));

            }else{
                dispatch(searchPokemonSuccess(response))
            }
            
            
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

export function getDetailAction(pokemonId, pokemons) {
    return async (dispatch) => {
        dispatch(getDetail());

        try {
            const response = pokemons.filter( e => e.id === pokemonId)
            
            dispatch(getDetailSuccess(response))
            
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


/****************************************************************** */
//LANDING PAGE
export function switchLandingAction(state) {
    return async (dispatch) => {
        dispatch(switchLanding(state))

    }
}

const switchLanding = (state) => ({
    type: SWITCH_LANDING,
    payload: state
})

/****************************************************************************************************** */
//CARGAR DETALLES POKEMONS



// export function loadDetailsPokemonsAction(pokemonsIds) {
//     return async (dispatch) => {
//         dispatch(loadDetailsPokemons());

//         try {
//             const response = [];
//             for(let pokemonId of pokemonsIds) {
//                 let e = await clienteAxios.get(`/pokemons/${pokemonId}`)
//                 const pokemon = e.data;
//                 response.push(pokemon)

//             }
//             dispatch(loadDetailsPokemonSuccess(response))
            
//         } catch (error) {
//             console.log(`${LOAD_DETAILS_ERROR} : ${error}`)
//             dispatch(loadDetailsPokemonsError())
            
//         }
//     }
// }

// const loadDetailsPokemons = () => ({
//     type: LOAD_DETAILS,
//     payload: true

// })

// const loadDetailsPokemonSuccess = (pokemonsDetails) => ({
//     type: LOAD_DETAILS_SUCCESS,
//     payload: pokemonsDetails
// })

// const loadDetailsPokemonsError = () => ({
//     type: LOAD_DETAILS_ERROR,
//     payload: true
// })

