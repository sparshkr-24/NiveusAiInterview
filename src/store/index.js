import {
  applyMiddleware, combineReducers, compose, createStore,
} from 'redux';
import { thunk } from 'redux-thunk'

import chatMessage from './chatMessage'
import report from './report'
import interview from './interview'
import session from './session'

const middleware = [
  thunk,
];

const reducers = combineReducers({
  chatMessage,
  report,
  interview,
  session
});

const composeEnhancers = typeof window === 'object'
    && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
  }) : compose;

const enhancer = composeEnhancers(
  applyMiddleware(...middleware),
  // other store enhancers if any
);

const store = createStore(reducers, enhancer);

export default store;
