import * as actionTypes from './actionTypes';

export const moreCastLoading = () => {
    return {
        type: actionTypes.MORE_CAST_LOADING,
    }
}

export const moreCastLoaded = () => {
    return {
        type: actionTypes.MORE_CAST_LOADED,
    }
}

export const getMoreCast = (cast) => {
    return {
        type: actionTypes.GET_MORE_CAST,
        cast
    }
}

export const getDefaultoptions = (options) => {
    return {
        type: actionTypes.GET_DEFAULT_OPTIONS,
        options
    }
}

export const onChangeOption = (options) => {
    return {
        type: actionTypes.ON_CHANGE_OPTION,
        options
    }
}

export const setOptionSelected = (option) => {
    return {
        type: actionTypes.SET_OPTION_SELECTED,
        option
    }
}

export const setSearchObject = (searchObj) => {
    return {
        type: actionTypes.SET_SEARCH_OBJECT,
        searchObj
    }
}


export const fetchMoviesSuccess = (movies) => {
    return {
        type: actionTypes.FETCH_MOVIES_SUCCESS,
        movies
    }
}

export const fetchSeriesSuccess = (series) => {
    return {
        type: actionTypes.FETCH_SERIES_SUCCESS,
        series
    }
}

export const fetchActorsSuccess = (actors) => {
    return {
        type: actionTypes.FETCH_ACTORS_SUCCESS,
        actors
    }
}

export const setBackdropPath = (backdrop_path) => {
    return {
        type: actionTypes.SET_BACKDROP_PATH,
        backdrop_path
    }
}

export const hideMediaDetails = (hideMedia) => {
    return {
        type: actionTypes.HIDE_MEDIA_DETAILS,
        hideMedia
    }
}