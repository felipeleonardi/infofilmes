import * as actionTypes from '../actions/common/actionTypes';
import { defaultOptions } from '../actions/common/methods';

const options = defaultOptions();

export const optionReducer = (state = [], action) => {
    switch (action.type) {
        case actionTypes.GET_DEFAULT_OPTIONS:
            return action.options.map(v => v);
        case actionTypes.ON_CHANGE_OPTION:
            return action.options.map(v => v);
        default:
            return state;
    }
}

export const optionSelectedReducer = (state = options[0], action) => {
    switch (action.type) {
        case actionTypes.SET_OPTION_SELECTED:
            return Object.assign({}, action.option);
        default:
            return state;
    }
}