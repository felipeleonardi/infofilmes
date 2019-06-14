import * as env from '../../enviroments';
import { slugify } from 'underscore.string';
import { validPosterImage } from '../globalMethods';

export const defaultOptions = () => 
[
    { 
        title: 'Filmes', 
        placeholder: 'Busque seu filme...', 
        selected: false, 
        id: 'filmes',
        url: env.urlSearchMovies,
        label: 'movie'
    },
    { 
        title: 'Atores', 
        placeholder: 'Busque seu ator ou atriz...', 
        selected: false, 
        id: 'atores',
        url: env.urlSearchActors,
        label: 'actor'
    },
    { 
        title: 'Séries', 
        placeholder: 'Busque sua série...', 
        selected: false, 
        id: 'series',
        url: env.urlSearchSeries, 
        label: 'serie'
    }
];

export const getSearchObject = (value = '') => 
(
    {
        isLoading: false,
        isSearching: false,
        value, 
        showNoResults: false,
        open: false, 
        noResultsMessage: 'Nenhum filme encontrado.'
    }
)

export const onSearchingValue = (searchObj) => {
    searchObj.isLoading = true;
    searchObj.showNoResults = false;
    searchObj.open = false;
    searchObj.isSearching = true;
    return searchObj;
}

export const onSearchFound = (searchObj) => {
    searchObj.isLoading = false;
    searchObj.showNoResults = false;
    searchObj.open = true;
    return searchObj;
}

export const onSearchNotFound = (searchObj) => {
    searchObj.isLoading = false;
    searchObj.showNoResults = true;
    searchObj.open = true;
    searchObj.isSearching = false;
    return searchObj;
}

export const adjustSearchValue = (searchValue) => {
    if (searchValue.indexOf(' ') !== -1) {
        searchValue = searchValue.replace(' ', '+');
    }
    return searchValue;
}

export const mountMediaObject = (res, title, titleUrl, option) => {
    let mediaFound = [];
    res.data.results.forEach((result, index) => {
        if (checkMediaConditions(result, option)) {
            let mediaObj = {};
            mediaObj.title = result[title];
            mediaObj.id = result.id;
            mediaObj.titleUrl = slugify(result[titleUrl]);
            mediaObj.type = option;
            if (option !== 'actor') {
                mediaObj.description = checkDescription(result.overview);
                mediaObj.popularVotes = calcPopularVotes(result);
                mediaObj.image = validPosterImage(result.poster_path);
            } else {
                mediaObj.description = mountActorDescription(result.known_for);
                mediaObj.image = validPosterImage(result.profile_path);
            }
            mediaFound.push(mediaObj);
        }
    });
    mediaFound = orderMediaByPopularity(mediaFound);
    return mediaFound;
}

const orderMediaByPopularity = (media) => media.sort((a, b) => b.popularVotes - a.popularVotes);

const calcPopularVotes = (media) => {
    let vote = media.vote_average * media.vote_count * media.popularity;
    return vote;
};

const mountActorDescription = (known_for) => {
    if (known_for.length > 0) {
        let title;
        if (known_for[0].original_title) {
            title = known_for[0].original_title;
        } else if (known_for[0].original_name) {
            title = known_for[0].original_name;
        }
        let year;
        if (known_for[0].release_date) {
            year = getYearOfActorMovie(known_for[0].release_date);
        } else {
            year = getYearOfActorMovie(known_for[0].first_air_date);
        }
        return `${title} (${year})`;
    } else {
        return '';
    }
}

const getYearOfActorMovie = (release_date) => release_date.split('-')[0];

const limitCaractDescription = 55;

const checkDescription = (value) => {
    if (value.length > limitCaractDescription) {
        value = value.slice(0, limitCaractDescription - 3) + "..."
    }
    if (value === 'No Overview') {
        value = '';
    }
    return value;
}

const checkMediaConditions = (result, option) => {
    if (!option) {
        const { backdrop_path, vote_average, vote_count, adult } = result;
        if (backdrop_path === null || (vote_average === 0 && vote_count === 0) || adult === true
        ) {
            return false;
        } else {
            return true;
        }
    } else {
        const { name, profile_path, adult } = result;
        if (name === null || profile_path === null || adult === true) {
            return false;
        } else {
            return true;
        }
    }
}