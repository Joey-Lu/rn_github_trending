import {combineReducers} from 'redux';
import {rootCom, AppContainer} from '../navigator/AppNavigator';
import theme from './theme';
import popular from "./popular";

const navState = AppContainer.router.getStateForAction(
  AppContainer.router.getActionForPathAndParams(rootCom),
);

const navReducer = (state = navState, action) => {
  const nextState = AppContainer.router.getStateForAction(action, state);
  return nextState || state;
};

const reducer = combineReducers({
  nav: navReducer,
  theme,
  popular,
});

export default reducer;
