import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator, BottomTabBar} from 'react-navigation-tabs';
import Favorite from '../pages/Favorite';
import Popular from '../pages/Popular';
import Trend from '../pages/Trend';
import AboutMe from '../pages//AboutMe';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import NavigationUtil from './NavigationUtil';

const TABS = {
  PopularPage: {
    screen: Popular,
    navigationOptions: {
      tabBarLabel: 'Popular',
      tabBarIcon: ({tintColor, focused}) => (
        <MaterialIcons name={'whatshot'} size={26} style={{color: tintColor}} />
      ),
    },
  },
  TrendPage: {
    screen: Trend,
    navigationOptions: {
      tabBarLabel: 'Trending',
      tabBarIcon: ({tintColor, focused}) => (
        <MaterialIcons
          name={'trending-up'}
          size={26}
          style={{color: tintColor}}
        />
      ),
    },
  },

  FavoritePage: {
    screen: Favorite,
    navigationOptions: {
      tabBarLabel: 'My Favorite',
      tabBarIcon: ({tintColor, focused}) => (
        <MaterialIcons name={'favorite'} size={26} style={{color: tintColor}} />
      ),
    },
  },
  AboutMePage: {
    screen: AboutMe,
    navigationOptions: {
      tabBarLabel: 'Me',
      tabBarIcon: ({tintColor, focused}) => (
        <AntDesign name={'user'} size={26} style={{color: tintColor}} />
      ),
    },
  },
};

const TabBarComponent = props => {
  const [theme, setTheme] = useState(
    () => ({
      tintColor: props.activeTintColor,
      updateTime: new Date().getTime(),
    }),
    [props],
  );
  const {routes, index} = props.navigation.state;

  useEffect(() => {
    if (routes[index].params) {
      const {theme: routerTheme} = routes[index].params;
      if (routerTheme && routerTheme.updateTime > theme.updateTime) {
        setTheme(routerTheme);
      }
    }
  }, [routes, index, theme]);

  return (
    <BottomTabBar
      {...props}
      activeTintColor={theme.tintColor || props.activeTintColor}
    />
  );
};

const DynamicTabNavigator = props => {
  const _tabNavigator = () => {
    const {PopularPage, TrendPage, FavoritePage, AboutMePage} = TABS;
    const tabs = {PopularPage, TrendPage, FavoritePage, AboutMePage};
    return createAppContainer(
      createBottomTabNavigator(tabs, {
        tabBarComponent: TabBarComponent,
      }),
    );
  };

  const Tab = _tabNavigator();

  return <Tab />;
};

const styles = StyleSheet.create({});

export default DynamicTabNavigator;
