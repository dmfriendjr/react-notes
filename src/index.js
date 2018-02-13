import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import configureStore from './store/configureStore';
import initialState from './store/initialState';
import {BrowserRouter} from 'react-router-dom';
import App from './components/App';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {loadNotes} from './actions/editorActions';

const store = configureStore(initialState);
store.dispatch(loadNotes());

render (
  <Provider store={store}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </Provider>,
  document.getElementById('app')
);