import * as globalMethods from '../globalMethods';

export const validateSerie = (serieObj) => {
    serieObj.backdrop_path = globalMethods.adjustUrlBackdropPath(serieObj.backdrop_path);
    serieObj.credits = globalMethods.checkCastImageProfile(serieObj.credits);
    serieObj.credits.cast = globalMethods.checkCastNameCharacter(serieObj.credits.cast);
    serieObj.description = globalMethods.checkCaractLimit(serieObj.overview, 300);
    return checkParams(serieObj);
}

const checkParams = (obj) => {
    if (globalMethods.checkForNullParams(obj.overview, 'No Overview')) obj.overview = '';
    if (globalMethods.checkForNullParams(obj.tagline, 'No Tagline')) obj.tagline = '';
    if (globalMethods.checkForNullParams(obj.first_air_date)) { 
        obj.first_air_date = '';
    } else {
        obj.first_air_date = globalMethods.formatDate(obj.first_air_date);
    }
    if (!globalMethods.checkForNullParams(obj.number_of_seasons)) {
        obj.number_of_seasons += ' temporadas';
    }
    if (!globalMethods.checkForNullParams(obj.number_of_episodes)) {
        obj.number_of_episodes += ' episódios';
    }
    if (!globalMethods.checkForNullParams(obj.episode_run_time)) {
        obj.episode_run_time = calcAverageEpisodeRuntime(obj.episode_run_time) + ' minutos';
    }
    if (!globalMethods.checkForNullParams(obj.status)) {
        obj.status = checkStatusProduction(obj.status);
    }
    if (globalMethods.checkForNullParams(obj.poster_path)) obj.poster_path = ''; 
    if (globalMethods.checkForNullParams(obj.title)) obj.title = ''; 

    if (obj.poster_path === '' && obj.title === '') {
        obj.valid = 'false';
    }
    return obj;
}

const calcAverageEpisodeRuntime = (arrayRuntime) => {
    let sum = 0;
    arrayRuntime.map(time => sum += time );
    sum = Math.round(sum / arrayRuntime.length);
    return sum;
}

const checkStatusProduction = (status) => {
    switch (status) {
        case 'Ended':
            return 'Completada';
        case 'Returning Series':
            return 'Em andamento';
        case 'Canceled':
            return 'Cancelada';
        default:
            return status;
    }
}