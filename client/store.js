import thunkMiddleware from 'redux-thunk';
import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import { member } from './reducers/MemberReducer';
import { bugBash } from './reducers/BugBashReducer';

const rootReducer = combineReducers({
  member,
  bugBash
});

export const rootStore = compose(
  applyMiddleware(thunkMiddleware)
)(createStore)(rootReducer);
