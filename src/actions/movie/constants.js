import * as actionTypes from './actionTypes';

export const getMovieSuccess = (movie) => {
    return {
        type: actionTypes.GET_MOVIE_SUCCESS,
        movie
    }
}

export const movieLoading = () => {
    return {
        type: actionTypes.MOVIE_LOADING
    }
}

export const movieLoaded = () => {
    return {
        type: actionTypes.MOVIE_LOADED
    }
}

export const movieInvalid = () => {
    return {
        type: actionTypes.MOVIE_INVALID
    }
}

export const getGenresError = () => {
    return {
        type: actionTypes.GET_GENRES_ERROR
    }
}

export const getMoviesByGenreSuccess = (movies) => {
    return {
        type: actionTypes.GET_MOVIES_BY_GENRE_SUCCESS,
        movies
    }
}

export const getMoviesByGenreError = () => {
    return {
        type: actionTypes.GET_MOVIES_BY_GENRE_ERROR,
    }
}