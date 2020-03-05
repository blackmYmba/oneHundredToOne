import { createStore, compose } from 'redux';
import authReducer from './reducers/auth';
import { combineReducers } from 'redux-immer';
import produce from 'immer';
import questionsReducer from './reducers/questions';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers(produce, {
  authReducer,
  questionsReducer
});

const configureStore = (initialState) => {
  return createStore(
    rootReducer,
    initialState,
    composeEnhancers()
  );
};

export default configureStore;
