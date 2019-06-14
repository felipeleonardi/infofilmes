import * as actionTypes from '../actions/common/actionTypes';

export const castLoadReducer = (state = false, action) => {
    switch (action.type) {
        case actionTypes.MORE_CAST_LOADING:
            return true;
        case actionTypes.MORE_CAST_LOADED:
            return false;
        default:
            return state;
    }
}

export const castReducer = (state = [], action) => {
    switch (action.type) {
        case actionTypes.GET_MORE_CAST:
            return action.cast;
        default:
            return state;
    }
}