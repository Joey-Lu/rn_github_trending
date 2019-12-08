import Welcome from '../pages/Welcome';
import Home from '../pages/Home';
import Detail from '../pages/Detail';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

const InitNavigator = createStackNavigator({
  WelcomePage: {
    screen: Welcome,
    navigationOptions: {
      header: null,
    },
  },
});

const MainNavigator = createStackNavigator({
  HomePage: {
    screen: Home,
    navigationOptions: {
      header: null,
    },
  },
  DetailPage: {
    screen: Detail,
    navigationOptions: {
      header: null,
    },
  },
});
const AppContainer = createAppContainer(
  createSwitchNavigator(
    {
      Init: InitNavigator,
      Main: MainNavigator,
    },
    {
      navigationOptions: {
        header: null,
      },
    },
  ),
);

export default AppContainer;
