import * as globalMethods from '../globalMethods';

export const mountCardList = (list, type) => {
    let listCard;
    switch (type) {
        case 'movies':
            listCard = globalMethods.mountMoviesCardList(list);
            break;
        case 'series':
            listCard = globalMethods.mountSeriesCardList(list);
            break;
        case 'actors':
            listCard = globalMethods.mountActorsCardList(list);
            break;
        default:
            return listCard;
    }
    return listCard;
}