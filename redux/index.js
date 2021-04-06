// redux/index.js
import { createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import reducer from './reducers';

let composer =
  process.env.NODE_ENV === 'production' ? compose : composeWithDevTools;

export const makeStore = (initialState, options) => {
  return createStore(reducer, initialState, composer(applyMiddleware(thunk)));
};
