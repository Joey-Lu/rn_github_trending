import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {BackHandler} from 'react-native';
import {NavigationActions} from 'react-navigation';
import NavigationUtil from '../navigator/NavigationUtil';
import DynamicTabNavigator from '../navigator/DynamicTabNavigator';
import {connect} from 'react-redux';

const Home = props => {
  NavigationUtil.navigation = props.navigation;

  const onBackPress = () => {
    const {dispatch, nav} = props;
    if (nav.routes[1].index === 0) {
      return false;
    }
    dispatch(NavigationActions.back());
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', onBackPress);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    };
  });

  return <DynamicTabNavigator />;
};

const mapStateToProps = state => ({
  nav: state.nav,
});

const mapDispatchToProps = dispatch => ({
  dispatch,
});

const styles = StyleSheet.create({});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
