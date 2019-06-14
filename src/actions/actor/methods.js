import * as globalMethods from '../globalMethods';
import * as env from '../../enviroments';
import moment from 'moment';
import { slugify } from 'underscore.string';

const limitOfPosterImages = 14;

export const validateActor = (actorObj) => {
    let backdrop_path = getBackdropPathActor(actorObj);
    actorObj.backdrop_path = globalMethods.adjustUrlBackdropPath(backdrop_path);
    actorObj.description = globalMethods.checkCaractLimit(actorObj.biography, 200);
    actorObj.age = getAgeActor(actorObj.birthday);
    actorObj.tagline = getTaglineActor(actorObj.birthday, actorObj.place_of_birth, actorObj.age);
    actorObj.popularMovies = getPopularActorMovies(actorObj.movie_credits.cast, 4);
    actorObj.images = mountImagesActor(actorObj.images.profiles);

    actorObj.tvCredits = mountActorTvs(actorObj.tv_credits.cast);
    actorObj.tvCredits = orderMediaByDate(actorObj.tvCredits, 'desc');

    actorObj.movieCredits = mountActorMovies(actorObj.movie_credits.cast);
    actorObj.movieCredits = orderMediaByDate(actorObj.movieCredits, 'desc');
    return actorObj;
}

const getAgeActor = (birthday) => `${moment().diff(birthday, 'years')} anos`;

const getTaglineActor = (birthday, place_of_birth, age) => {
    let dateBirthday = getYearInDate(birthday);
    return `Nasceu em ${dateBirthday} em ${place_of_birth} (${age})`;
}

const getBackdropPathActor = actorObj => actorObj.movie_credits.cast[0].backdrop_path;

const getPopularActorMovies = (movies, qt) => {
    let popularMovies = [];
    movies = movies.sort((a, b) => b.popularity - a.popularity);
    movies.forEach(movie => {
        if (movie.vote_count !== 0 && qt !== 0) {
            qt-=1;
            let popMovie = mountPopularMoviesObj(movie);
            popularMovies.push(popMovie);
        }
    })
    return popularMovies;
}

const mountPopularMoviesObj = movie => {
    let movieObj = {};
    movieObj.imageUrl = movie.poster_path;
    movieObj.slug = slugify(movie.original_title);
    movieObj.original_title = movie.title;
    movieObj.title = globalMethods.checkCaractLimit(movie.title, 20);
    movieObj.subtitle = globalMethods.checkCaractLimit(movie.character, 22);
    movieObj.content = moment(movie.release_date).format('YYYY');
    movieObj.popularity = movie.popularity;
    movieObj.id = movie.id;
    return movieObj;
}

const getYearInDate = _date => moment(_date).format('YYYY');

const mountPosterImageUrl = url => {
    if (!url || url === '') {
        return env.defaultIconMovie;
    } else {
        return `${env.urlImageThumb}${url}`;
    }
}

const mountActorTvs = tvs => {
    let tvCredits = [];
    tvs.forEach((tv, index) => {
        if (tv.first_air_date !== '') {
            if (moment().year() >= parseInt(getYearInDate(tv.first_air_date), 10)) {
                let customTv = {};
                customTv.name = globalMethods.checkCaractLimit(tv.original_name, 30);
                customTv.release = getYearInDate(tv.first_air_date);
                customTv.poster = mountPosterImageUrl(tv.poster_path);
                customTv.character = tv.character !== '' ? `${tv.character} ` : tv.character;
                customTv.description = `${customTv.character} (${customTv.release})`;
                customTv.id = tv.id;
                customTv.slug = slugify(tv.original_name);
                tvCredits.push(customTv);
            }
        }
    })
    return tvCredits;
}

const mountActorMovies = movies => {
    let movieCredits = [];
    movies.forEach((movie, index) => {
        if (movie.release_date !== '') {
            if (moment().year() >= parseInt(getYearInDate(movie.release_date), 10)) {
                let customMovie = {};
                customMovie.slug = slugify(movie.original_title);
                customMovie.id = movie.id;
                customMovie.name = globalMethods.checkCaractLimit(movie.original_title, 30);
                customMovie.release = getYearInDate(movie.release_date);
                customMovie.poster = mountPosterImageUrl(movie.poster_path);
                customMovie.character = movie.character !== '' ? `${movie.character} ` : movie.character;
                customMovie.description = `${customMovie.character} (${customMovie.release})`;
                movieCredits.push(customMovie);
            }
        }
    })
    return movieCredits;
}

const orderMediaByDate = (media, order) => {
    let orderedMedia;
    if (order === 'asc') {
        orderedMedia = media.sort((a, b) => moment(a.release) - moment(b.release));
    } 
    else if (order === 'desc') {
        orderedMedia = media.sort((a, b) => moment(b.release) - moment(a.release));
    }
    return orderedMedia;
}

const mountImagesActor = (images) => {
    let imagesActor = [];
    images.forEach((image, index) => {
        if (index <= limitOfPosterImages) {
            image.file_path = adjustUrlFilePath(image.file_path)
            imagesActor.push(image);
        }
    })
    imagesActor = orderImagesByPopular(imagesActor, 'desc');
    return imagesActor;
}

const adjustUrlFilePath = (file_path) => {
    if (file_path !== null) {
        file_path = `${env.urlImageThumb}${file_path}`;
    }
    return file_path;
}

const orderImagesByPopular = (images, order) => {
    if (order === 'desc') {
        return images.sort((a, b) => (b.vote_count * b.vote_average) - (a.vote_count * a.vote_average))
    } 
    else if (order === 'asc') {
        return images.sort((a, b) => (a.vote_count * a.vote_average) - (b.vote_count * b.vote_average))
    }
}