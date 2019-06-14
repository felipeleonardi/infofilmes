import * as constants from './constants';
import * as methods from './methods';
import * as env from '../../enviroments';
import Axios from 'axios';

//CastComponent
export const getMoreCast = (cast, page, perPage) => {
    return (dispatch) => {
        dispatch(constants.moreCastLoading());
        let newCast = cast.filter((value, index) => index < page * perPage && index < cast.length ? value : null )
        dispatch(constants.getMoreCast(newCast));
        dispatch(constants.moreCastLoaded());
    }
}

//OptionsComponent
export const getDefaultOptions = (index = 0) => {
    return (dispatch) => {
        let options = methods.defaultOptions();
        dispatch(constants.getDefaultoptions(options))
        dispatch(constants.setOptionSelected(options[index]))
    }
}

export const onChangeOption = (label) => {
    return (dispatch) => {
        let options = methods.defaultOptions();
        options.forEach((v, i) => {
            if (v.label === label) {
                options[i].selected = true;
                dispatch(constants.setOptionSelected(v))
            } else {
                options[i].selected = false;
            }
        })
        dispatch(constants.onChangeOption(options))
    }
}

//SearchComponent
export const getDefaultSearchObject = (value = '') => {
    return (dispatch) => {
        let searchObj = methods.getSearchObject(value);
        document.getElementById("search-input").value = value;
        document.getElementById("search-input").focus();
        dispatch(constants.setSearchObject(searchObj));
    }
}

export const onResult = (title) => {
    return (dispatch) => {
        let searchObj = methods.getSearchObject(title);
        dispatch(constants.setSearchObject(searchObj));
    }
}

export const onSearchValue = (value, option) => {
    return (dispatch) => {
        let searchObj = methods.getSearchObject(value);
        if (value.length < 1) {
            searchObj.showNoResults = false;
            searchObj.open = false;
            dispatch(constants.setSearchObject(searchObj))
        } else {
            searchObj = methods.onSearchingValue(searchObj);
            dispatch(constants.setSearchObject(searchObj))
            let searchValue = methods.adjustSearchValue(value), 
                propsFoundObj = { mediaFound: [], searchObj };
            switch (option.id) {
                case 'filmes':
                    propsFoundObj.url = `${env.urlSearchMovies}${env.apiToken}&query=${searchValue}${env.apiLanguagePtBr}`;
                    return searchMedia(propsFoundObj, 'title', 'original_title', 'movie').then(res => {
                        dispatch(constants.setSearchObject(res.searchObj));
                        dispatch(constants.fetchMoviesSuccess(res.mediaFound));
                    })
                case 'series':
                    propsFoundObj.url = `${env.urlSearchSeries}${env.apiToken}&query=${searchValue}${env.apiLanguagePtBr}`;
                    return searchMedia(propsFoundObj, 'name', 'original_name', 'serie').then(res => {
                        dispatch(constants.setSearchObject(res.searchObj));
                        dispatch(constants.fetchSeriesSuccess(res.mediaFound));
                    })
                case 'atores':
                    propsFoundObj.url = `${env.urlSearchActors}${env.apiToken}&query=${searchValue}${env.apiLanguagePtBr}`;
                    return searchMedia(propsFoundObj, 'name', 'name', 'actor').then(res => {
                        dispatch(constants.setSearchObject(res.searchObj));
                        dispatch(constants.fetchActorsSuccess(res.mediaFound));
                    })
                default:
                    return false;
            }
        }
    }
}

const searchMedia = (propsFoundObj, title, titleUrl, option = '') => {
    return Axios.get(propsFoundObj.url)
        .then(res => {
            if (res.data.results.length > 0) {
                propsFoundObj.mediaFound = methods.mountMediaObject(res, title, titleUrl, option);
                propsFoundObj.searchObj = methods.onSearchFound(propsFoundObj.searchObj);
            } else {
                propsFoundObj.searchObj = methods.onSearchNotFound(propsFoundObj.searchObj);
            }
            return propsFoundObj;
        })
}

export const hideMediaDetails = (hideMedia = true) => {
    return (dispatch) => {
        dispatch(constants.hideMediaDetails(hideMedia));
    }
}

const defaultBackdropPath = '';

export const setBackdropPath = (backdrop_path = '') => {
    return (dispatch) => {
        if (backdrop_path === '') {
            backdrop_path = defaultBackdropPath;
        }
        dispatch(constants.setBackdropPath(backdrop_path));
    }
}