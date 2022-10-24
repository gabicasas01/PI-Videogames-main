
 function validate(input) {
    let errors = {}
    if (!input.name) {
        errors.name = 'Name is required' 
    } 
    else if(!input.img){
        errors.img = 'Image is required'
    }
    else if (!input.rating || input.rating<0 || input.rating >5) {
        errors.rating = 'Rating must be a nummber between 0-5'
    }
    else if (input.platforms.length===0) {
        errors.platforms = 'Platform is required'
    }
    else if (input.genres.length === 0){
        errors.genres = 'Genre is required'
    }
    else if (!input.description){
        errors.description = 'Description is required'
    }
    return errors 
}

export default validate