const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const pokemonsRouter = require('./pokemons')
const typesRouter = require('./types')


const router = Router();


router.use('/pokemons', pokemonsRouter);
router.use('/types', typesRouter)
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
