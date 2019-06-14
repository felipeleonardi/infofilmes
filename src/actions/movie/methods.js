import * as globalMethods from '../globalMethods';

export const validateMovie = (movieObj) => {
    movieObj.backdrop_path = globalMethods.adjustUrlBackdropPath(movieObj.backdrop_path);
    movieObj.credits = globalMethods.checkCastImageProfile(movieObj.credits);
    movieObj.credits.cast = globalMethods.checkCastNameCharacter(movieObj.credits.cast);
    movieObj.description = globalMethods.checkCaractLimit(movieObj.overview, 300);
    return checkParams(movieObj);
}

const checkParams = (obj) => {
    if (globalMethods.checkForNullParams(obj.overview, 'No Overview')) obj.overview = '';
    if (globalMethods.checkForNullParams(obj.tagline, 'No Tagline')) obj.tagline = '';
    if (globalMethods.checkForNullParams(obj.runtime, 0)) {
        obj.runtime = '';
    } else {
        obj.runtime = globalMethods.formatDuration(obj.runtime);
    }
    if (globalMethods.checkForNullParams(obj.release_date)) { 
        obj.release_date = '';
    } else {
        obj.release_date = globalMethods.formatDate(obj.release_date);
    }
    if (globalMethods.checkForNullParams(obj.revenue, 0)) {
        obj.revenue = '';
    } else {
        obj.revenue = globalMethods.formatMoney(obj.revenue);
    }
    if (globalMethods.checkForNullParams(obj.vote_average)) obj.vote_average = '';
    if (globalMethods.checkForNullParams(obj.poster_path)) obj.poster_path = ''; 
    if (globalMethods.checkForNullParams(obj.title)) obj.title = ''; 

    if (obj.poster_path === '' && obj.title === '') {
        obj.valid = 'false';
    }
    return obj;
}
