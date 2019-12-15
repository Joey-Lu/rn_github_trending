import React, {useState} from 'react';
import {
  View,
  Text,
  DeviceInfo,
  StatusBar,
  StyleSheet,
  Platform,
} from 'react-native';

const NAV_BAR_HEIGHT_IOS = 44;
const NAV_BAR_HEIGHT_ANDROID = 50;
const STATUS_BAR_HEIGHT = DeviceInfo.isIPhoneX_deprecated ? 0 : 20;

const getButtonElement = data => {
  return <View style={styles.navBarButton}>{data ? data : null}</View>;
};

const NavigationBar = props => {
  const [defaultProps, setDefaultProps] = useState({
    statusBar: {
      barStyle: 'light-content',
      hidden: false,
    },
  });

  const statusBar = !defaultProps.statusBar.hidden ? (
    <View style={styles.statusBar}>
      <StatusBar {...defaultProps.statusBar} />
    </View>
  ) : null;

  const titleView = props.titleView ? (
    props.titleView
  ) : (
    <Text ellipsizeMode="head" numberOfLines={1} style={styles.title}>
      {props.title}
    </Text>
  );

  const content = props.hide ? null : (
    <View style={styles.navBar}>
      {getButtonElement(props.leftButton)}
      <View style={[styles.navBarTitleContainer, props.titleLayoutStyle]}>
        {titleView}
      </View>
      {getButtonElement(props.rightButton)}
    </View>
  );

  return (
    <View style={[styles.container, props.style]}>
      {statusBar}
      {content}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2196f3',
  },
  navBarButton: {
    alignItems: 'center',
  },
  navBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: Platform.OS === 'ios' ? NAV_BAR_HEIGHT_IOS : NAV_BAR_HEIGHT_ANDROID,
  },
  navBarTitleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: 40,
    right: 40,
    top: 0,
    bottom: 0,
  },
  title: {
    fontSize: 20,
    color: 'white',
  },
  statusBar: {
    height: Platform.OS === 'ios' ? STATUS_BAR_HEIGHT : 0,
  },
});

export default NavigationBar;
