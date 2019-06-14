import Axios from 'axios';
import * as env from '../../enviroments';
import * as constants from './constants';
import * as methods from './methods';
import * as globalMethods from '../globalMethods';

export const getMovie = (id, title) => {
    return (dispatch) => {
        dispatch(constants.movieLoading());
        let url = `${env.urlDetailsMovie}${id}?api_key=${env.apiToken}${env.apiLanguagePtBr}&append_to_response=credits`;
        return Axios.get(url)
            .then(res => {
                if (res.data) {
                    if (globalMethods.validTitleWithUrl(res.data.original_title, title)) {
                        res.data.valid = 'true';
                        let data = methods.validateMovie(res.data);
                        dispatch(constants.getMovieSuccess(data));
                        dispatch(constants.movieLoaded());
                    } else {
                        throw new Error();
                    }
                }
            })
            .catch(err => {
                if (err) {
                    dispatch(constants.movieInvalid());
                }
            })
    }
}

const genresLimit = 3;
let movieGenresList;
let movieGenresRandom;
let movies = [];

export const getMoviesByGenres = () => {
    return async (dispatch) => {
        await getIdGenresMovies(dispatch);
        await getRandomGenres(movieGenresList, genresLimit);
        await getMovieListByGenre(dispatch, movieGenresRandom[0]);
        await getMovieListByGenre(dispatch, movieGenresRandom[1]);
        await getMovieListByGenre(dispatch, movieGenresRandom[2]);
        dispatch(constants.getMoviesByGenreSuccess(movies))
    }
}

const getIdGenresMovies = (dispatch) => {
    let url = env.urlGetGenresMovieList;
    return Axios.get(url)
        .then(res => {
            if (res.data.genres) {
                movieGenresList = res.data.genres;
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
    movieGenresRandom = randomGenres;
}

const getMovieListByGenre = (dispatch, genre) => {
    let voteCount = genre.id === 99 ? 200 : 1000;
    let url = `${env.urlGetMoviesByGenre}${genre.id}${env.voteCount}${voteCount}`;
    return Axios.get(url)
        .then(res => {
            if (res.data.results) {
                let moviesGenres = globalMethods.mountMoviesCardList(res.data.results);
                movies.push({ genre: genre.name, list: moviesGenres });
            } else {
                throw new Error();
            }
        })
        .catch(err => {
            dispatch(constants.getMoviesByGenreError())
        })
}