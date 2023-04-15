import { combineReducers, applyMiddleware, createStore } from 'redux';
import searchResultsReducer from './searchResultsReducer';
import thunkMiddleware from 'redux-thunk';
import paginationReducer from './paginationReducer.js';

// Combine reducers
const rootReducer = combineReducers({
  searchResults: searchResultsReducer,
  pagination: paginationReducer,
});

// Create Redux store
const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export default store;
