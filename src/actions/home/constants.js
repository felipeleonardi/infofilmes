import * as actionTypes from './actionTypes';

export const getLastReleasedMoviesSuccess = (movies) => {
    return {
        type: actionTypes.GET_LAST_RELEASED_MOVIES_SUCCESS,
        movies
    }
}

export const getLastReleasedMoviesError = () => {
    return {
        type: actionTypes.GET_LAST_RELEASED_MOVIES_ERROR,
        movies: []
    }
}

export const getPopularSeriesSuccess = (series) => {
    return {
        type: actionTypes.GET_POPULAR_SERIES_SUCCESS,
        series
    }
}

export const getPopularSeriesError = () => {
    return {
        type: actionTypes.GET_POPULAR_SERIES_ERROR,
        series: []
    }
}

export const getPopularActorsSuccess = (actors) => {
    return {
        type: actionTypes.GET_POPULAR_ACTORS_SUCCESS,
        actors
    }
}

export const getPopularActorsError = () => {
    return {
        type: actionTypes.GET_POPULAR_ACTORS_ERROR,
        actors: []
    }
}