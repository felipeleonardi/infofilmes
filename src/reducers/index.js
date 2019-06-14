import { combineReducers } from 'redux';
import { movieReducer, movieStatus, moviesByGenre } from './movieReducers';
import { serieReducer, serieStatus, seriesByGenre } from './serieReducers';
import { actorReducer, actorStatus, popularActors } from './actorReducers';
import { castReducer, castLoadReducer } from './castReducers';
import { optionReducer, optionSelectedReducer } from './optionReducers';
import { searchReducer, searchMediaReducer } from './searchReducers';
import { lastMoviesReducer, popularSeriesReducer, popularActorsReducer } from './homeReducers';
import { appReducer, mediaReducer } from './appReducers';

const movieR = {
    movie: movieReducer,
    statusMovie: movieStatus,
    moviesByGenre
}

const serieR = {
    serie: serieReducer,
    statusSerie: serieStatus,
    seriesByGenre
}

const actorR = {
    actor: actorReducer,
    statusActor: actorStatus,
    popularActors
}

const castR = {
    cast: castReducer,
    castLoad: castLoadReducer
}

const optionR = {
    options: optionReducer,
    option: optionSelectedReducer
}

const searchR = {
    searchObj: searchReducer,
    media: searchMediaReducer
}

const appR = {
    backdrop_path: appReducer,
    hideMedia: mediaReducer
}

const homeR = {
    lastMovies: lastMoviesReducer,
    popularSeries: popularSeriesReducer,
    popularActors: popularActorsReducer
}

export default combineReducers(
    Object.assign({}, 
        movieR, 
        castR,
        optionR,
        searchR,
        appR,
        serieR,
        actorR,
        homeR
    )
);