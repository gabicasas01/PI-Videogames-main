import axios from 'axios';

export const GET_ALL_GAMES = "GET_ALL_GAMES";
export const ERROR = 'ERROR'


export const getAllGames = () => {
    return async function(dispatch){
        try {
            const response = await axios.get('http://localhost:3001/videogames');
            const videogames = response.data
    
            dispatch({
                type: GET_ALL_GAMES,
                payload: videogames
            })
        } catch (error) {
            dispatch({
                type: ERROR,
                payload: error
            })
        }

    }
}