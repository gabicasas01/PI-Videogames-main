import { GET_ALL_GAMES, ERROR, GET_ALL_GENRES, FILTER_BY_GENRE, FILTER_BY_CREATED, ORDER_BY_NAME, ORDER_BY_RATING , GET_VIDEOGAMES_BY_NAME, POST_VIDEOGAME, GET_DETAIL_VIDEOGAME, RESET_ERROR, RESET_GAME_DETAIL} from '../actions';

const initialState = {
    error: [],
    videogames: [],
    allVideogames: [],
    genres: [],
    detail: {}
}

function RootReducer (state= initialState, action) {
    switch(action.type) {
        case GET_ALL_GAMES:
            return {
                ...state,
                videogames: action.payload,
                allVideogames: action.payload
            }
        case GET_ALL_GENRES:
            return {
                ...state,
                genres: action.payload
            }

        case GET_VIDEOGAMES_BY_NAME:
            return {
                ...state,
                videogames: action.payload
            }

        case FILTER_BY_GENRE:
            let genreFilter
            if (action.payload === "Todos") {
                genreFilter = [...state.allVideogames];
            }
            else {
                const vGames = [...state.allVideogames];
                vGames.forEach(el => {
                    if (typeof el.genres[0] !== "string") {
                        el.genres = el.genres.map((e) => e.name);
                    }
                    });

                    genreFilter = vGames.filter(el =>
                        el.genres.includes(action.payload)
                    );
                }
            
            if(!genreFilter.length) {
                return {
                    ...state,
                    error: 'ERROR'
                }
            }
            else {
                return {
                    ...state,
                    videogames: [...genreFilter]
                }
            }
                // if (!genreFilter.length) genreFilter.push("Error");

                // return {
                //      ...state,
                //      videogames: [...genreFilter],
                // };

        case FILTER_BY_CREATED:
            const allGames = state.allVideogames
            const createdFilter = action.payload === 'Creados' ? allGames.filter(el => el.createdInDb) : state.allVideogames.filter( el => !el.createdInDb)

            return {
                ...state,
                videogames: action.payload === 'Default' ? state.allVideogames : createdFilter
            }

        case ORDER_BY_NAME:
            let orderByName;
                if (action.payload === 'Default') {
                    orderByName = [...state.allVideogames];
                }
                else {
                    orderByName =
                        action.payload === 'name_asc' ? [...state.videogames].sort((a, b) => {
                            if (a.name > b.name) return 1;
                            if (b.name > a.name) return -1;
                            return 0;
                        }) : [...state.videogames].sort((a, b) => {
                                if (a.name > b.name) return -1;
                                if (b.name > a.name) return 1;
                                return 0;
                            });
                }
    
                return {
                    ...state,
                    videogames: [...orderByName],
                };

        case ORDER_BY_RATING:  
                let orderByRating;
                if (action.payload === 'Default') {
                    orderByRating = [...state.allVideogames];
                }
                else {
                    orderByRating =
                        action.payload === 'rating_asc' ? [...state.videogames].sort((a, b) => {
                            if (a.rating > b.rating) return 1;
                            if (b.rating > a.rating) return -1;
                            return 0;
                        }) : [...state.videogames].sort((a, b) => {
                                if (a.rating > b.rating) return -1;
                                if (b.rating > a.rating) return 1;
                                return 0;
                            });
                }

                return {
                    ...state,
                    videogames: [...orderByRating],
                };
                
        case POST_VIDEOGAME:
            return {
                ...state,
            };

        case GET_DETAIL_VIDEOGAME:
            return {
                ...state,
                detail: action.payload
            }

        case RESET_ERROR:
            return {
                ...state,
                error: ''
            }

        case RESET_GAME_DETAIL:
            return {
                ...state,
                detail: ''
            }

        case ERROR:
            return {
                ...state,
                error: action.payload
            }
        default: return {...state};
    }
}

export default RootReducer;