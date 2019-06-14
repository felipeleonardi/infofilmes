import Axios from 'axios';
import * as env from '../../enviroments';
import * as constants from './constants';
import * as methods from './methods';
import * as globalMethods from '../globalMethods';

export const getActor = (id, title) => {
    return (dispatch) => {
        dispatch(constants.actorLoading());
        let url = `${env.urlDetailsActors}${id}?api_key=${env.apiToken}${env.apiLanguagePtBr}&append_to_response=images,movie_credits,tv_credits`;
        return Axios.get(url)
            .then(res => {
                if (res.data) {
                    if (globalMethods.validTitleWithUrl(res.data.name, title)) {
                        res.data.valid = 'true';
                        let data = methods.validateActor(res.data);
                        dispatch(constants.getActorSuccess(data));
                        dispatch(constants.actorLoaded());
                    } else {
                        throw new Error();
                    }
                }
            })
            .catch(err => {
                if (err) {
                    dispatch(constants.actorInvalid());
                }
            })
    }
}

export const getPopularActors = () => {
    return (dispatch) => {
        const url = `${env.urlPopularActors}${env.apiToken}${env.paramsPopularActors}`;
        return Axios.get(url)
            .then(res => {
                if (res.data.results.length > 0) {
                    let actors = globalMethods.mountActorsCardList(res.data.results);
                    dispatch(constants.getPopularActorsSuccess(actors));
                } else {
                    throw new Error();
                }
            })
            .catch(err => {
                dispatch(constants.getPopularActorsError());
            })
        }
}