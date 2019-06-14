import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';

import registerServiceWorker from './registerServiceWorker';

import routes from './routes';

import './index.css';

import configureStore from './store/configureStore';


const store = configureStore();

ReactDOM.render(
  <Provider store={ store }>
    <Router routes={ routes } history={ browserHistory } />
  </Provider>, 
  document.querySelector('#app')
);

registerServiceWorker();