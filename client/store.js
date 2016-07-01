import thunkMiddleware from 'redux-thunk';
import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import { person } from './reducers/PersonReducer';
import { bugBash } from './reducers/BugBashReducer';

const rootReducer = combineReducers({
  person,
  bugBash
});

export const rootStore = compose(
  applyMiddleware(thunkMiddleware)
)(createStore)(rootReducer);
