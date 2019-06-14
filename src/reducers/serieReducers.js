import * as actionTypes from '../actions/serie/actionTypes';

export const serieReducer = (state = [], action) => {
    switch (action.type) {
        case actionTypes.GET_SERIE_SUCCESS:
            return action.serie;
        default:
            return state;
    }
}

export const serieStatus = (state = '', action) => {
    switch (action.type) {
        case actionTypes.SERIE_LOADING:
            return 'loading';
        case actionTypes.SERIE_LOADED:
            return 'loaded';
        case actionTypes.SERIE_INVALID:
            return 'invalid';
        default:
            return state;
    }
}

export const seriesByGenre = (state = [], action) => {
    switch (action.type) {
        case actionTypes.GET_SERIES_BY_GENRE_SUCCESS:
            return action.series;
        case actionTypes.GET_SERIES_BY_GENRE_ERROR:
            return state;
        default:
            return state;
    }
}