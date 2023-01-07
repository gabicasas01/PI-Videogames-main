import axios from 'axios';

export const ERROR = 'ERROR'
export const GET_ALL_GAMES = "GET_ALL_GAMES";
export const GET_ALL_GENRES = "GET_ALL_GENRES";
export const FILTER_BY_GENRE = "FILTER_BY_GENRE";
export const FILTER_BY_CREATED = 'FILTER_BY_CREATED';
export const ORDER_BY_NAME = 'ORDER_BY_NAME';
export const ORDER_BY_RATING = 'ORDER_BY_RATING';
export const GET_VIDEOGAMES_BY_NAME = 'GET_VIDEOGAMES_BY_NAME';
export const POST_VIDEOGAME = 'POST_VIDEOGAME';
export const GET_DETAIL_VIDEOGAME = 'GET_DETAIL_VIDEOGAME';
export const RESET_ERROR = 'RESET_ERROR';
export const RESET_GAME_DETAIL = 'RESET_GAME_DETAIL';

export const getAllGames = () => {
    return async function(dispatch){
        try {
            const response = await axios.get('/videogames');
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

export const getAllGenres = () => {
    return async function (dispatch) {
        try {
            const response = await axios.get('/genres');
            const genres = response.data

            dispatch({
                type: GET_ALL_GENRES,
                payload: genres
            })

        } catch (error) {
            dispatch({
                type: ERROR,
                payload: error
            })            
        }
    }
}

export const filterByGenre = (payload) => {
    return {
        type: FILTER_BY_GENRE,
        payload
    }
}

export const filterCreated = (payload) => {
    return {
        type: FILTER_BY_CREATED,
        payload
    }
}

export const orderByName = (payload) => {
    return {
        type: ORDER_BY_NAME,
        payload
    }
}

export const orderByRating = (payload) => {
    return {
        type: ORDER_BY_RATING,
        payload
    }
}

export const getVideosByName = (payload) => {
    return async function (dispatch) {
        try {
            const response = await axios.get (`/videogames/?name=${payload}`)
            return dispatch({
                type: GET_VIDEOGAMES_BY_NAME,
                payload: response.data
            })
        } catch (error) {
            dispatch({
                type: ERROR,
                payload: error.message
            })      
        }
    }
}

export const postVideogame = (payload) => {
    return async function (dispatch) {
        try {
            const response = await axios.post('/videogames', payload)
    
            return response
        } catch (error) {
            dispatch({
                type: ERROR,
                payload: error
            })     
        }
    }
}

export function getDetailVideogame(id) {
    return async function (dispatch) {
        try {
            const response = await axios.get(`/videogame/${id}`)
            dispatch({
              type: GET_DETAIL_VIDEOGAME,
              payload: response.data
            })
        } catch (error) {
            dispatch({
                type: ERROR,
                payload: error
            })               
        }
    }
  }

  export const resetError = () => ({ type: RESET_ERROR });
  export const resetGameDetail = () => ({ type: RESET_GAME_DETAIL});

