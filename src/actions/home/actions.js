import Axios from 'axios';
import * as env from '../../enviroments';
import * as constants from './constants';
import * as methods from './methods';

export const getMediaHome = () => {
    return async (dispatch) => {
        await getLastReleasedMovies(dispatch);
        await getPopularActors(dispatch);
        await getPopularSeries(dispatch);
    }
}

export const getLastReleasedMovies = (dispatch) => {
    const url = `${env.urlLastReleasedMovies}${env.apiToken}${env.paramsLastReleasedMovies}`;
    return Axios.get(url)
        .then(res => {
            if (res.data.results.length > 0) {
                let movies = methods.mountCardList(res.data.results, 'movies');
                dispatch(constants.getLastReleasedMoviesSuccess(movies));
            } else {
                throw new Error();
            }
        })
        .catch(err => {
            dispatch(constants.getLastReleasedMoviesError());
        })
}

export const getPopularSeries = (dispatch) => {
    const url = `${env.urlPopularSeries}${env.apiToken}${env.paramsPopularSeries}`;
    return Axios.get(url)
        .then(res => {
            if (res.data.results.length > 0) {
                let series = methods.mountCardList(res.data.results, 'series');
                dispatch(constants.getPopularSeriesSuccess(series));
            } else {
                throw new Error();
            }
        })
        .catch(err => {
            dispatch(constants.getPopularSeriesError());
        })
}

export const getPopularActors = (dispatch) => {
    const url = `${env.urlPopularActors}${env.apiToken}${env.paramsPopularActors}`;
    return Axios.get(url)
        .then(res => {
            if (res.data.results.length > 0) {
                let actors = methods.mountCardList(res.data.results, 'actors');
                dispatch(constants.getPopularActorsSuccess(actors));
            } else {
                throw new Error();
            }
        })
        .catch(err => {
            dispatch(constants.getPopularActorsError());
        })
}