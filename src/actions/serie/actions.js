import Axios from 'axios';
import * as env from '../../enviroments';
import * as constants from './constants';
import * as methods from './methods';
import * as globalMethods from '../globalMethods';

export const getSerie = (id, title) => {
    return (dispatch) => {
        dispatch(constants.serieLoading());
        let url = `${env.urlDetailsSerie}${id}?api_key=${env.apiToken}${env.apiLanguagePtBr}&append_to_response=credits`;
        return Axios.get(url)
            .then(res => {
                if (res.data) {
                    if (globalMethods.validTitleWithUrl(res.data.original_name, title)) {
                        res.data.valid = 'true';
                        let data = methods.validateSerie(res.data);
                        dispatch(constants.getSerieSuccess(data));
                        dispatch(constants.serieLoaded());
                    } else {
                        throw new Error();
                    }
                }
            })
            .catch(err => {
                if (err) {
                    dispatch(constants.serieInvalid());
                }
            })
    }
}


const genresLimit = 3;
let serieGenresList;
let serieGenresRandom;
let series = [];

export const getSeriesByGenres = () => {
    return async (dispatch) => {
        await getIdGenresSeries(dispatch);
        await getRandomGenres(serieGenresList, genresLimit);
        await getSerieListByGenre(dispatch, serieGenresRandom[0]);
        await getSerieListByGenre(dispatch, serieGenresRandom[1]);
        await getSerieListByGenre(dispatch, serieGenresRandom[2]);
        dispatch(constants.getSeriesByGenreSuccess(series))
    }
}

const getIdGenresSeries = (dispatch) => {
    let url = env.urlGetGenresTvList;
    return Axios.get(url)
        .then(res => {
            if (res.data.genres) {
                serieGenresList = res.data.genres;
            } else {
                throw new Error();
            }
        })
        .catch(err => {
            dispatch(constants.getGenresError());
        })
}

const getRandomGenres = (genres, limit) => {
    let randomGenres = [];
    let randomIndexes = [];
    while (randomGenres.length < limit) {
        let randomIndex = Math.floor((Math.random() * genres.length - 1) + 1);
        if (randomIndexes.indexOf(randomIndex) === -1) {
            randomIndexes.push(randomIndex);
            randomGenres.push(genres[randomIndex])
        }
    }
    serieGenresRandom = randomGenres;
}

const getSerieListByGenre = (dispatch, genre) => {
    let url = `${env.urlGetTvsByGenre}${genre.id}`;
    return Axios.get(url)
        .then(res => {
            if (res.data.results) {
                let seriesGenres = globalMethods.mountSeriesCardList(res.data.results);
                series.push({ genre: genre.name, list: seriesGenres });
            } else {
                throw new Error();
            }
        })
        .catch(err => {
            dispatch(constants.getSeriesByGenreError())
        })
}