//This file merely configures the store for hot reloading.
//This boilerplate file is likely to be the same for each project that uses Redux.
//With Redux, the actual stores are in /reducers.

import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import rootReducer from '../reducers';
import thunk from "redux-thunk";
import logger from "redux-logger"
import { apiMiddleware } from 'redux-utils';

export default function configureStore(initialState) {
  let store;
  const loggerMiddleware = logger();
  if (window.devToolsExtension) { //Enable Redux devtools if the extension is installed in developer's browser
    store = window.devToolsExtension()(createStore)(
      rootReducer,
      initialState,
      applyMiddleware(thunk, loggerMiddleware, apiMiddleware));
  } else {
    store = createStore(
      rootReducer,
      initialState,
      applyMiddleware(thunk, loggerMiddleware, apiMiddleware));
  }

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers');
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}