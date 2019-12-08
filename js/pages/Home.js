import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import Favorite from './Favorite';
import Popular from './Popular';
import Trend from './Trend';
import AboutMe from './AboutMe';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import NavigationUtil from '../navigator/NavigationUtil';
import DynamicTabNavigator from '../navigator/DynamicTabNavigator';

const Home = props => {
  NavigationUtil.navigation = props.navigation;

  return <DynamicTabNavigator />;
};

const styles = StyleSheet.create({});

export default Home;
