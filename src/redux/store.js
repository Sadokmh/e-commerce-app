import { createStore, applyMiddleware } from 'redux';

import logger from 'redux-logger';

import rootReducer from './root-reducer';

const middlewares = [logger];

//const store = createStore(rootReducer, applyMiddleware(logger)); we put it in array, beacause in the future we might want add some other middlewares.
const store = createStore(rootReducer, applyMiddleware(...middlewares));

export default store;