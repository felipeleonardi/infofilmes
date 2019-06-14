export const apiToken = '3e739a8ca7c3de0588aeffafcfc71915';

const urlImage = 'https://image.tmdb.org/t/p/';
export const defaultIconMovie = '/images/movie-default-icon.png';
export const defaultIconCast = '/images/icon_cast.png';

export const urlImageCard = `${urlImage}w185`;
export const urlImageThumb = `${urlImage}w500`;
export const urlImageBackground = `${urlImage}original`;
export const apiLanguagePtBr = '&language=pt-BR';

const url = 'https://api.themoviedb.org/3/';

//Movies
export const urlSearchMovies = `${url}search/movie?api_key=`;
export const urlDetailsMovie = `${url}movie/`;

//Series
export const urlSearchSeries = `${url}search/tv?api_key=`;
export const urlDetailsSerie = `${url}tv/`;

//Actors
export const urlSearchActors = `${url}search/person?api_key=`;
export const urlDetailsActors = `${url}person/`;

//Cards
export const urlLastReleasedMovies = `${url}discover/movie?api_key=`;
export const paramsLastReleasedMovies = `&language=pt-Br&include_adult=false&page=1&sort_by=popularity.desc&primary_release_year=2017&vote_count.gte=1000`;

export const urlPopularSeries = `${url}discover/tv?api_key=`;
export const paramsPopularSeries = `&language=pt-Br&page=1&sort_by=popularity.desc&vote_count.gte=250&first_air_date.gte=2010`;

export const urlPopularActors = `${url}person/popular?api_key=`;
export const paramsPopularActors = `&language=pt-BR&page=1`;

//Genres
export const urlGetGenresMovieList = `${url}genre/movie/list?api_key=${apiToken}${apiLanguagePtBr}`;

export const urlGetGenresTvList = `${url}genre/tv/list?api_key=${apiToken}${apiLanguagePtBr}`;

export const urlGetMoviesByGenre = `${url}discover/movie?api_key=${apiToken}${apiLanguagePtBr}&sort_by=popularity.desc&include_adult=false&page=1&with_genres=`;

export const urlGetTvsByGenre = `${url}discover/tv?api_key=${apiToken}${apiLanguagePtBr}&sort_by=popularity.desc&include_adult=false&page=1&with_genres=`;

export const voteCount = '&vote_count.gte=';