import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducer/reducer';
import {middleware} from '../navigator/AppNavigator';

const middlewares = [middleware];

export default createStore(reducers, applyMiddleware(...middlewares));
