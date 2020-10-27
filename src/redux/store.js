import {createStore, applyMiddleware} from 'redux';
import allReducers from './reducers';
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk';

const initialState = {};
const middleware = [thunk];



const odavoltStore = createStore(
        allReducers,
        initialState,
        composeWithDevTools(applyMiddleware(...middleware))
        );

export default odavoltStore;