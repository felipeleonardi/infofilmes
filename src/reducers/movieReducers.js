import * as actionTypes from '../actions/movie/actionTypes';

export const movieReducer = (state = [], action) => {
    switch (action.type) {
        case actionTypes.GET_MOVIE_SUCCESS:
            return action.movie;
        default:
            return state;
    }
}

export const movieStatus = (state = '', action) => {
    switch (action.type) {
        case actionTypes.MOVIE_LOADING:
            return 'loading';
        case actionTypes.MOVIE_LOADED:
            return 'loaded';
        case actionTypes.MOVIE_INVALID:
            return 'invalid';
        default:
            return state;
    }
}

export const moviesByGenre = (state = [], action) => {
    switch (action.type) {
        case actionTypes.GET_MOVIES_BY_GENRE_SUCCESS:
            return action.movies;
        case actionTypes.GET_MOVIES_BY_GENRE_ERROR:
            return state;
        default:
            return state;
    }
}