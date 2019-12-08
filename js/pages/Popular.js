import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import NavigationUtil from '../navigator/NavigationUtil';

const tabNames = [
  'Java',
  'Javascript',
  'React',
  'React Native',
  'Android',
  'iOS',
];

const PopularTab = props => {
  const {tabLabel, navigation} = props;
  return (
    <View>
      <Text>{tabLabel}</Text>
      <Text
        onPress={() => {
          NavigationUtil.toPage(
            {
              navigation,
            },
            'DetailPage',
          );
        }}>
        To Detail
      </Text>
    </View>
  );
};

const Popular = props => {
  const _generateTabs = () => {
    const tabs = {};
    tabNames.forEach((item, index) => {
      tabs[`tab${index}`] = {
        screen: props => <PopularTab {...props} tabLabel={item}/>,
        navigationOptions: {
          title: item,
        },
      };
    });
    return tabs;
  };

  const TopNavigator = createAppContainer(
    createMaterialTopTabNavigator(_generateTabs(), {
      tabBarOptions: {
        tabStyle: styles.tabStyle,
        upperCaseLabel: false,
        scrollEnabled: true,
        style: {
          backgroundColor: '#678',
        },
        indicatorStyle: styles.indicatorStyle,
        labelStyle: styles.labelStyle,
      },
    }),
  );
  return (
    <View style={styles.container}>
      <TopNavigator />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabStyle: {
    minWidth: 50,
  },
  indicatorStyle: {
    height: 2,
    backgroundColor: '#fff',
  },
  labelStyle: {
    fontSize: 13,
    marginTop: 6,
    marginBottom: 6,
  },
});

export default Popular;
