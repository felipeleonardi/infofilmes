import * as env from '../enviroments';
import { slugify, truncate } from 'underscore.string';

const defaultIconCast = '/images/icon_cast.png';

export const formatDate = (stringDate) => {
    if (stringDate.indexOf('-') !== -1) {
        let date = new Date(stringDate);
        let day = ("0" + date.getDay()).slice(-2);
        let month = ("0" + date.getMonth()).slice(-2);
        let formatedDate = null;
        if (day !== '00' && month !== '00') {
            formatedDate = `${day}/${month}/${date.getFullYear()}`;
        }
        else if (day === '00') {
            formatedDate = `${month}/${date.getFullYear()}`;
        }
        else if (month === '00') {
            formatedDate = `${date.getFullYear()}`;
        }
        return formatedDate;
    }
    return stringDate;
}

export const formatMoney = (money) => {
    if (typeof money === 'number') {
        let formatQt;
        let formatedMoney = money.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
        if (money >= 1000 && money < 1000000) {
            formatQt = "k";
            let cutMoney = formatedMoney.split(",");
            return `$ ${cutMoney[0]} ${formatQt}`;
        }
        if (money >= 1000000 && money < 1000000000) {
            formatQt = "milhões";
            let cutMoney = formatedMoney.split(",");
            return `$ ${cutMoney[0]} ${formatQt}`;
        }
        else if (money >= 1000000000) {
            formatQt = "bilhões";
            let cutMoney = formatedMoney.split(",");
            return `$ ${cutMoney[0]} ${formatQt}`;
        }
    }
    return money;
}

export const formatDuration = (time) => time += ' min';

export const checkCastImageProfile = (credits) => {
    credits.cast.forEach((value, index) => {
        if (value.profile_path) {
            credits.cast[index].profile_path = `${env.urlImageBackground}${value.profile_path}`
         } else {
            credits.cast[index].profile_path = defaultIconCast;
         }
    })
        return credits;
}

export const checkMaximumCaracters = (value, maxCaracters) => {
    if (value.length > maxCaracters) {
        value = value.substring(0, maxCaracters - 3);
        value = `${value}...`;
    }
    return value;
}

export const validTitleWithUrl = (newtitle, oldtitle) => {
    let titleUrl = slugify(newtitle);
    if (titleUrl === oldtitle) {
        return true;
    }
    return false;
}

export const adjustUrlBackdropPath = (backdrop_path) => {
    if (backdrop_path !== null) {
        backdrop_path = `${env.urlImageBackground}/${backdrop_path}`;
    }
    return backdrop_path;
}

const maxCaracterCast = 25;

export const checkCastNameCharacter = (cast) => {
    return cast.map((v, i) => {
        v.slug = slugify(v.name);
        v.name = checkMaximumCaracters(v.name, maxCaracterCast);
        v.character = checkMaximumCaracters(v.character, maxCaracterCast);
        return v;
    })
    return cast;
}

export const checkForNullParams = (param, custom = null) => {
    if (param === '' || param === null || param === undefined) return true;
    if (custom !== null) {
        if (param === custom) return true;
    }
    return false;
}

export const checkCaractLimit = (value, limit) => {
    if (value.length > limit) {
        value = value.slice(0, limit - 3) + "..."
    }
    return value;
}

export const validPosterImage = (path) => {
    if (path !== null) {
        return `${env.urlImageCard}${path}`;
    } else {
        return '/images/movie-default-icon.png';
    }
}


//cards
export const mountMoviesCardList = (movies) => movies.map((movie, index) => mountCard(movie, 'id', 'title', 'poster_path', 'movie', 'overview', 'original_title'))

export const mountSeriesCardList = (series) => series.map((serie, index) => mountCard(serie, 'id', 'original_name', 'poster_path', 'serie', 'overview'))

export const mountActorsCardList = (actors) => {
    actors = filterActorsByLanguage(actors);
    return actors.map((actor, index) => mountCard(actor, 'id', 'name', 'profile_path', 'actor'))
}

const mountCard = (obj, id, title, image, type, description = null, titleUrl = null) => {
    let card = {};
    card.id = obj[id];
    card.title = obj[title];
    card.image = validPosterImage(obj[image]);
    card.type = type;
    card.description = description ? obj[description] : '';
    if (card.description.length > 60) {
        card.description = truncate(card.description, 60);
    }
    if (titleUrl) {
        card.titleUrl = slugify(obj[titleUrl]); 
    } else {
        card.titleUrl = slugify(obj[title]);
    }
    return card;
}

const filterActorsByLanguage = (actors, languages) => {
    let actorsFiltered = [];
    actors.forEach(actor => {
        if (checkMoviesLanguage(actor.known_for, ['ko', 'ja'])) {
            actorsFiltered.push(actor);
        }
    })
    return actorsFiltered;
}

const checkMoviesLanguage = (movies, languages) => {
    let valid = true;
    movies.forEach(movie => {
        if (!validLanguages(movie, languages)) {
            valid = false
        }
    })
    return valid
}

const validLanguages = (movie, languages) => {
    let valid = true
    languages.forEach(language => {
        if (movie.original_language === language) {
            valid = false;
        }
    })
    return valid;
}
//cards