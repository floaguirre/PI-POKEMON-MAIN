const {Router} = require('express');

const {Pokemon, Type} = require('../db')

const axios = require('axios');
const e = require('express');


const router = Router();


// [ ] GET /pokemons:
// Obtener un listado de los pokemons desde pokeapi.
// Debe devolver solo los datos necesarios para la ruta principal



router.get('/', async (req, res, next) => {
    try {
        const {name} = req.query;
        if(name) {
            next();
            return;
        }

        const namesPokemons = [];
        const apiPokemons = [];
        let count = 0;
        let url = 'https://pokeapi.co/api/v2/pokemon';
        let urls = [];
        do {
            let axiosPokemon = await axios.get(url);            
            let pokemon = axiosPokemon.data.results.map((e) => {    
                urls.push(e.url);
                ++count;
                
                return {
                    
                    name : e.name,
                    }
            })

            
            namesPokemons.push(...pokemon);
            url = axiosPokemon.data.next;


        }while (count < 40)

        
            let i = 0;
            for(let url of urls) {
                let axiosPokemon = await axios.get(url);
                let e = axiosPokemon.data;
            
                console.log(i);
                apiPokemons.push({
                    id: e.id,
                    name: namesPokemons[i].name,
                    sprite: e.sprites.other.dream_world.front_default,
                    types: e.types.map(t => t.type.name)
                })
                i++;

            }

            //pokemons db
            const dbPokemons = await Pokemon.findAll({
                include : {model: Type}
            })
            const filterDbPokemons = dbPokemons.map( pokemon => {
                return {
                    id: pokemon.id,
                    name : pokemon.name,
                    sprite : pokemon.sprite,
                    types: pokemon.types
                }
            })

            const totalInfoPokemons = [...apiPokemons, ...filterDbPokemons];

            res.send(totalInfoPokemons);

        
        
        
    } catch (error) {
        next(error);
        
    }
})
//[ ] GET /pokemons?name="...":
// Obtener el pokemon que coincida exactamente con el nombre pasado como query parameter 
//(Puede ser de pokeapi o creado por nosotros)
// Si no existe ningún pokemon mostrar un mensaje adecuado

router.get('/',  async (req, res, next) => {
    const {name} = req.query;
    if (name) {
        
        const dbPokemon = await Pokemon.findOne({where: {name : name}, include: Type});

       

        if(dbPokemon === null) {
            
            axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
                .then(e => {
                    const pokemon = {
                        id : e.data.id,
                        name: e.data.name,
                        sprite: e.data.sprites.other.dream_world.front_default,
                        types: e.data.types.map(t => t.type.name)
                    }

                    res.send(pokemon)

                })
                .catch( e => {
                    res.send('Not Found Pokemon')
                })





        }else {
            const pokemon = {
                id : dbPokemon.id,
                name : dbPokemon.name,
                sprite : dbPokemon.sprite,
                types: dbPokemon.types.map( t => t.name)
                
            }

            res.send(pokemon)


        }

    }

        

})

// [ ] GET /pokemons/{idPokemon}:
// Obtener el detalle de un pokemon en particular
// Debe traer solo los datos pedidos en la ruta de detalle de pokemon
// Tener en cuenta que tiene que funcionar tanto para un id de un pokemon existente en pokeapi o uno creado por ustedes

router.get('/:idPokemon', async (req, res, next) => {
    try {
        const {idPokemon} = req.params;
        let pokemon;
        if(typeof idPokemon === 'string' && idPokemon.length > 8) {
            const e = await Pokemon.findByPk(idPokemon, {include: Type})
            const pokemon = {
                id : e.id,
                name: e.name,
                hp : e.hp,
                attack: e.attack,
                defense: e.defense,
                speed: e.speed,
                height: e.height,
                weight: e.weight,
                sprite: e.sprite,
                createdInDb : e.createdInDb,
                types: e.types.map( t => t.name)

            }
            res.send(pokemon)

        }else {
            const axiosPokemon = await axios.get(`https://pokeapi.co/api/v2/pokemon/${idPokemon}`);
            const e = axiosPokemon.data
            pokemon = {
                id : e.id,
                name: e.name,
                hp : e.stats[0].base_stat,
                attack: e.stats[1].base_stat,
                defense: e.stats[2].base_stat,
                speed: e.stats[5].base_stat,
                height: e.height,
                weight: e.weight,
                sprite: e.sprites.other.dream_world.front_default,
                createdInDb : false,
                types: e.types.map(t => t.type.name)

            }

            res.send(pokemon);

        }
        
    } catch (error) {
        next(error)
        
    }
})

// [ ] POST /pokemons:
// Recibe los datos recolectados desde el formulario controlado de la ruta de creación de pokemons por body
// Crea un pokemon en la base de datos relacionado con sus tipos.

router.post('/', async  (req, res, next) => {

    try {
        const {name, hp,attack, defense, speed, height, weight, sprite, types} = req.body;

        const newPokemon = await Pokemon.create({
            name,
            hp,
            attack,
            defense,
            speed,
            height,
            weight,
            sprite,
        })

        const typeDb = await Type.findAll({where : {name : types}})

        await newPokemon.addType(typeDb);

        const e = await Pokemon.findByPk(newPokemon.id, {include: Type} )

        const pokemon = {
            id : e.id,
            name: e.name,
            hp : e.hp,
            attack: e.attack,
            defense: e.defense,
            speed: e.speed,
            height: e.height,
            weight: e.weight,
            sprite: e.sprite,
            createdInDb : e.createdInDb,
            types: e.types.map( t => t.name)

        }

        res.status(201).send(pokemon)

        
    } catch (error) {
        next(error)
        
    }

    

})




module.exports = router;