import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, compose, applyMiddleware} from 'redux';
import { reactReduxFirebase} from 'react-redux-firebase';
import initialState from './store/initialState';
import {BrowserRouter} from 'react-router-dom';
import App from './components/App';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {loadNotes} from './actions/editorActions';
import firebase from 'firebase';
import rootReducer from './reducers';

import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';

const reactRouterMiddleware = routerMiddleware(history);

const firebaseConfig = {
  apiKey: "AIzaSyDUBK8o_niDhRCKrHXW30FY6acxciXVZgc",
  authDomain: "notes-e6a1a.firebaseapp.com",
  databaseURL: "https://notes-e6a1a.firebaseio.com",
  projectId: "notes-e6a1a",
  storageBucket: "notes-e6a1a.appspot.com",
  messagingSenderId: "746200975198"
};

const rrfConfig = {
  userProfile: 'users'
};

const middlewares = [
  // Add other middleware on this line...

  // Redux middleware that spits an error on you when you try to mutate your state either inside a dispatch or between dispatches.
  reduxImmutableStateInvariant(),

  // thunk middleware can also accept an extra argument to be passed to each thunk action
  // https://github.com/gaearon/redux-thunk#injecting-a-custom-argument
  thunk,
  reactRouterMiddleware,
];

firebase.initializeApp(firebaseConfig);

const createStoreWithFirebase = compose(reactReduxFirebase(firebase, rrfConfig))(createStore);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // add support for Redux dev tools
const store = createStoreWithFirebase(rootReducer, initialState, composeEnhancers(
  applyMiddleware(...middlewares)
));

// store.dispatch(loadNotes());

render (
  <Provider store={store}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </Provider>,
  document.getElementById('app')
);