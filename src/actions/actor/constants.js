import * as actionTypes from './actionTypes';

export const getActorSuccess = (actor) => {
    return {
        type: actionTypes.GET_ACTOR_SUCCESS,
        actor
    }
}

export const actorLoading = () => {
    return {
        type: actionTypes.ACTOR_LOADING
    }
}

export const actorLoaded = () => {
    return {
        type: actionTypes.ACTOR_LOADED
    }
}

export const actorInvalid = () => {
    return {
        type: actionTypes.ACTOR_INVALID
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