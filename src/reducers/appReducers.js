import * as actionTypes from '../actions/common/actionTypes';

export const appReducer = (state = '', action) => {
    switch (action.type) {
        case actionTypes.SET_BACKDROP_PATH:
            return action.backdrop_path;
        default:
            return state;
    }
}

export const mediaReducer = (state = false, action) => {
    switch (action.type) {
        case actionTypes.HIDE_MEDIA_DETAILS:
            return action.hideMedia;
        default:
            return state;
    }
}