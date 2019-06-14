import * as actionTypes from '../actions/home/actionTypes';

export const lastMoviesReducer = (state = [], action) => {
    switch (action.type) {
        case actionTypes.GET_LAST_RELEASED_MOVIES_SUCCESS:
            return action.movies;
        case actionTypes.GET_LAST_RELEASED_MOVIES_ERROR:
            return action.movies;
        default:
            return state;
    }
}

export const popularSeriesReducer = (state = [], action) => {
    switch (action.type) {
        case actionTypes.GET_POPULAR_SERIES_SUCCESS:
            return action.series;
        case actionTypes.GET_POPULAR_SERIES_ERROR:
            return action.series;
        default:
            return state;
    }
}

export const popularActorsReducer = (state = [], action) => {
    switch (action.type) {
        case actionTypes.GET_POPULAR_ACTORS_SUCCESS:
            return action.actors;
        case actionTypes.GET_POPULAR_ACTORS_ERROR:
            return action.actors;
        default:
            return state;
    }
}