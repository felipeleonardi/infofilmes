import * as actionTypes from './actionTypes';

export const getSerieSuccess = (serie) => {
    return {
        type: actionTypes.GET_SERIE_SUCCESS,
        serie
    }
}

export const serieLoading = () => {
    return {
        type: actionTypes.SERIE_LOADING
    }
}

export const serieLoaded = () => {
    return {
        type: actionTypes.SERIE_LOADED
    }
}

export const serieInvalid = () => {
    return {
        type: actionTypes.SERIE_INVALID
    }
}

export const getGenresError = () => {
    return {
        type: actionTypes.GET_GENRES_ERROR
    }
}

export const getSeriesByGenreSuccess = (series) => {
    return {
        type: actionTypes.GET_SERIES_BY_GENRE_SUCCESS,
        series
    }
}

export const getSeriesByGenreError = () => {
    return {
        type: actionTypes.GET_SERIES_BY_GENRE_ERROR,
    }
}