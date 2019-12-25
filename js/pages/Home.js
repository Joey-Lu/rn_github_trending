import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {BackHandler} from 'react-native';
import {NavigationActions} from 'react-navigation';
import NavigationUtil from '../navigator/NavigationUtil';
import DynamicTabNavigator from '../navigator/DynamicTabNavigator';
import {connect} from 'react-redux';
import BackPress from '../common/BackPress';

const Home = props => {
  NavigationUtil.navigation = props.navigation;

  const backPress = new BackPress({backPress: onBackPress});

  const onBackPress = () => {
    const {dispatch, nav} = props;
    if (nav.routes[1].index === 0) {
      return false;
    }
    dispatch(NavigationActions.back());
    return true;
  };

  useEffect(() => {
    backPress.componentDidMount();
    return () => {
      backPress.componentWillUnmount();
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
