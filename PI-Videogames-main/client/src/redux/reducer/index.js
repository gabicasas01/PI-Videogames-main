import { GET_ALL_GAMES, ERROR } from '../actions';

const initialState = {
    error: {},
    videogames: []
}

function RootReducer (state= initialState, action) {
    switch(action.type) {
        case GET_ALL_GAMES:
            return {
                ...state,
                videogames: action.payload
            }
        case ERROR:
            return {
                ...state,
                error: action.type
            }
        default: return {...state};
    }
}

export default RootReducer;