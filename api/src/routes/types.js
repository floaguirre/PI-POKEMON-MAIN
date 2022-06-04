const {Router} = require('express');

const {Pokemon, Type} = require('../db')

const axios = require('axios');


const router = Router();

// [ ] GET /types:
// Obtener todos los tipos de pokemons posibles
// En una primera instancia deberán traerlos desde pokeapi y guardarlos en su propia base de datos y
//  luego ya utilizarlos desde allí

router.get('/', async (req, res, next) => {
    try {
        const axiosPokemon = await axios.get('https://pokeapi.co/api/v2/type');
        const typesPokemon = axiosPokemon.data.results.map(type => type.name);

        typesPokemon.forEach( e => {
            Type.findOrCreate({
                where : {name : e}
            })
        });

        const types = await Type.findAll();

        res.send(types)
    } catch (error) {
        next(error)
        
    }
})

module.exports = router;