import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';
import MovieContainer from './components/movie/MovieContainer';
import SerieContainer from './components/serie/SerieContainer';
import ActorContainer from './components/actor/ActorContainer';
import SearchContainer from './components/common/SearchContainer';
import HomeContainer from './components/home/HomeContainer';

export default (
    <Route path="/" component={ App }>
        <IndexRoute component={ HomeContainer } />
        <Route path="/:option/search/:query" component={ SearchContainer } />
        <Route path="/movie" component={ MovieContainer } />
        <Route path="/serie" component={ SerieContainer } />
        <Route path="/actor" component={ ActorContainer } />
        <Route path="movie/:id/:title" component={ MovieContainer } />
        <Route path="serie/:id/:title" component={ SerieContainer } />
        <Route path="actor/:id/:title" component={ ActorContainer } />
    </Route>
)