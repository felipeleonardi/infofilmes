import * as actionTypes from '../actions/actor/actionTypes';

export const actorReducer = (state = [], action) => {
    switch (action.type) {
        case actionTypes.GET_ACTOR_SUCCESS:
            return action.actor;
        default:
            return state;
    }
}

export const actorStatus = (state = '', action) => {
    switch (action.type) {
        case actionTypes.ACTOR_LOADING:
            return 'loading';
        case actionTypes.ACTOR_LOADED:
            return 'loaded';
        case actionTypes.ACTOR_INVALID:
            return 'invalid';
        default:
            return state;
    }
}

export const popularActors = (state = [], action) => {
    switch (action.type) {
        case actionTypes.GET_POPULAR_ACTORS_SUCCESS:
            return action.actors;
        case actionTypes.GET_POPULAR_ACTORS_ERROR:
            return action.actors;
        default:
            return state;
    }
}