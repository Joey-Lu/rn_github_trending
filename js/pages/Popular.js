import React, {useState, useEffect, useCallback, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import {connect} from 'react-redux';
import {createAppContainer, ThemeColors} from 'react-navigation';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import Toast from 'react-native-easy-toast';
import actions from '../action';
import PopularItem from '../common/PopularItem';
import NavigationBar from '../common/NavigationBar';

const URL = 'http://api.github.com/search/repositories?q=';
const QUERY_KEY = '&sort=stars';
const THEME_COLOR = '#678';

const tabNames = [
  'Java',
  'Javascript',
  'React',
  'React Native',
  'Android',
  'iOS',
];

const PopularTab = props => {
  const {
    tabLabel: storeName,
    onLoadPopularData,
    onLoadMorePopular,
    popular,
  } = props;
  const [pageSize, setPageSize] = useState(10);
  const [canLoadMore, setCanLoadMore] = useState(true);
  const toastRef = useRef();

  const _store = () => {
    let store = popular[storeName];
    if (!store) {
      store = {
        items: [],
        isLoading: false,
        projectModels: [],
        hideLoadingMore: true,
      };
    }
    return store;
  };

  const genFetchUrl = key => {
    return URL + key + QUERY_KEY;
  };

  const genIndicator = () => {
    return _store().hideLoadingMore ? null : (
      <View style={styles.indicatorContainer}>
        <ActivityIndicator style={styles.indicator} />
        <Text>Load more</Text>
      </View>
    );
  };

  const fetchData = loadMore => {
    const store = _store();
    const url = genFetchUrl(storeName);
    if (loadMore) {
      onLoadMorePopular(
        storeName,
        ++_store().pageIndex,
        pageSize,
        _store().items,
        () => {
          toastRef.current.show('No more data');
        },
      );
    } else {
      onLoadPopularData(storeName, url, pageSize);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderItem = data => {
    const item = data.item;
    return <PopularItem item={item} onSelect={() => {}} />;
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={_store().projectModes}
        renderItem={data => renderItem(data)}
        keyExtractor={item => '' + item.id}
        refreshControl={
          <RefreshControl
            title="Loading..."
            titleColor={THEME_COLOR}
            colors={[THEME_COLOR]}
            refreshing={_store().isLoading}
            onRefresh={() => fetchData()}
            tintColor={THEME_COLOR}
          />
        }
        ListFooterComponent={() => genIndicator()}
        onEndReached={() => {
          setTimeout(() => {
            if (canLoadMore) {
              fetchData(true);
              setCanLoadMore(false);
            }
          }, 100);
        }}
        onEndReachedThreshold={0.5}
        onMomentumScrollBegin={() => setCanLoadMore(true)}
      />
      <Toast ref={toastRef} position={'center'} />
    </View>
  );
};

const Popular = props => {
  const _generateTabs = () => {
    const tabs = {};
    tabNames.forEach((item, index) => {
      tabs[`tab${index}`] = {
        screen: props => <PopularTabPage {...props} tabLabel={item} />,
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
      <NavigationBar
        title="Most popular"
        statusBar={{
          backgroundColor: THEME_COLOR,
          barStyle: 'light-content',
        }}
        style={{backgroundColor: THEME_COLOR}}
      />
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
    backgroundColor: 'white',
  },
  labelStyle: {
    fontSize: 13,
    margin: 0,
  },
  indicatorContainer: {
    alignItems: 'center',
  },
  indicator: {
    color: 'red',
    margin: 10,
  },
});

const mapStateToProps = state => ({
  popular: state.popular,
});

const mapDispatchToProps = dispatch => ({
  onLoadPopularData: (storeName, url, pageSize) =>
    dispatch(actions.onLoadPopularData(storeName, url, pageSize)),
  onLoadMorePopular: (storeName, pageIndex, pageSize, items, callback) =>
    dispatch(
      actions.onLoadMorePopular(
        storeName,
        pageIndex,
        pageSize,
        items,
        callback,
      ),
    ),
});

const PopularTabPage = connect(mapStateToProps, mapDispatchToProps)(PopularTab);

export default Popular;
