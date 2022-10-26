
 function validate(input) {
    let errors = {}
    if (!input.name) {
        errors.name = 'El campo nombre es requerido' 
    } 
    else if(!input.img){
        errors.img = 'El campo imagen es requerido'
    }
    else if (!input.rating || input.rating<0 || input.rating >5) {
        errors.rating = 'Rating debe ser un entero entre 0-5'
    }
    else if (input.platforms.length === 0) {
        errors.platforms = 'El campo plataformas es requerido'
    }
    else if (input.genres.length === 0){
        errors.genres = 'El campo géneros es requerido'
    }
    else if (!input.description){
        errors.description = 'El campo descripción es requerido'
    }
    return errors 
}

export default validate