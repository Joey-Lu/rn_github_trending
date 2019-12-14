import {applyMiddleware, createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import reducers from '../reducer/reducer';
import {middleware} from '../navigator/AppNavigator';

const middlewares = [middleware, thunk];

export default createStore(
  reducers,
  composeWithDevTools(applyMiddleware(...middlewares)),
);
