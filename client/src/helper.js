
export const controlForm = (input) => {
    let errors = {}
    if(!input.name) errors.name = 'Ingrese un nombre'
    if(!input.hp) errors.hp = 'Ingrese un numero entero'
    if(!input.attack) errors.attack = 'Ingrese un numero entero'
    if(!input.defense) errors.defense = 'Ingrese un numero entero'
    if(!input.speed) errors.speed = 'Ingrese un numero entero'
    if(!input.height) errors.height = 'Ingrese un numero entero'
    if(!input.weight) errors.weight = 'Ingrese un numero entero'
    
    return errors

}