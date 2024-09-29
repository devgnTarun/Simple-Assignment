import { combineReducers, applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import { categoryReducer, productReducer } from './reducer';
import { thunk } from 'redux-thunk';

const reducer = combineReducers({
    category: categoryReducer,
    products: productReducer,
});

// let initialState = {};

let middleware = [thunk]
const store = createStore(reducer, composeWithDevTools(applyMiddleware(...middleware)))

export default store;