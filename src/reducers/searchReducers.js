import * as actionTypes from '../actions/common/actionTypes';
import { getSearchObject } from '../actions/common/methods';

const searchObj = getSearchObject();

export const searchReducer = (state = searchObj, action) => {
    switch (action.type) {
        case actionTypes.SET_SEARCH_OBJECT:
            return Object.assign({}, action.searchObj);
        default:
            return state;
    }
}

export const searchMediaReducer = (state = [], action) => {
    switch (action.type) {
        case actionTypes.FETCH_MOVIES_SUCCESS:
            return action.movies.map(v => v);
        case actionTypes.FETCH_SERIES_SUCCESS:
            return action.series.map(v => v);
        case actionTypes.FETCH_ACTORS_SUCCESS:
            return action.actors.map(v => v);
        default:
            return state;
    }
}