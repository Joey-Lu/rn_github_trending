import React, {useState, useEffect, useCallback, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import {createAppContainer} from 'react-navigation';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import Toast from 'react-native-easy-toast';
import actions from '../action';
import TrendingItem from '../common/TrendingItem';
import NavigationBar from '../common/NavigationBar';
import TrendingDialog, {timeSpans} from '../common/TrendingDialog';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import NavigationUtil from '../navigator/NavigationUtil';
import FavoriteUtil from '../util/FavoriteUtil';
import FavoriteDao from '../expand/FavoriteDao';
import {FLAG_STORAGE} from '../expand/dao/DataStore';

const URL = 'https://github.com/trending/';
const THEME_COLOR = '#678';
const favoriteDao = new FavoriteDao(FLAG_STORAGE.flag_trend);
const tabNames = ['All', 'C', 'C#', 'Javascript', 'PHP'];

const TrendingTab = props => {
  const {
    timeSpan,
    tabLabel,
    onLoadTrendingData,
    onLoadMoreTrending,
    trending,
  } = props;
  const [pageSize, setPageSize] = useState(10);
  const [canLoadMore, setCanLoadMore] = useState(true);
  const [storeName, setStoreName] = useState(tabLabel);
  const toastRef = useRef();

  const [store, setStore] = useState({
    items: [],
    isLoading: false,
    projectModes: [],
    hideLoadingMore: true,
  });
  useEffect(() => {
    setStore(trending[storeName]);
  }, [trending, storeName]);

  const genFetchUrl = key => {
    return key === 'All'
      ? `https://github.com/trending/`
      : URL + key + '?' + timeSpan.searchText;
  };

  const genIndicator = () => {
    return store && store.hideLoadingMore ? null : (
      <View style={styles.indicatorContainer}>
        <ActivityIndicator style={styles.indicator} />
        <Text>Load more</Text>
      </View>
    );
  };

  const fetchData = loadMore => {
    const url = genFetchUrl(storeName);
    if (loadMore) {
      onLoadMoreTrending(
        storeName,
        ++store.pageIndex,
        pageSize,
        store.items,
        favoriteDao,
        () => {
          toastRef.current.show('No more data');
        },
      );
    } else {
      onLoadTrendingData(storeName, url, pageSize, favoriteDao);
    }
  };

  useEffect(() => {
    const url = genFetchUrl(storeName);
    onLoadTrendingData(storeName, url, pageSize, favoriteDao);
  }, [onLoadTrendingData, pageSize, storeName]);

  const renderItem = data => {
    const item = data.item;
    return (
      <TrendingItem
        projectModes={item}
        onSelect={() => {
          NavigationUtil.toPage({projectModes: item}, 'DetailPage');
        }}
        onFavorite={(item, isFavorite) => {
          FavoriteUtil.onFavorite(
            favoriteDao,
            item,
            isFavorite,
            FLAG_STORAGE.flag_trend,
          );
        }}
      />
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={store && store.projectModes}
        renderItem={data => renderItem(data)}
        keyExtractor={item => '' + item.item.fullName}
        refreshControl={
          <RefreshControl
            title="Loading..."
            titleColor={THEME_COLOR}
            colors={[THEME_COLOR]}
            refreshing={store && store.isLoading}
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

const Trending = props => {
  const [timeSpan, setTimeSpan] = useState(timeSpans[0]);
  const [visible, setVisible] = useState(false);

  const _generateTabs = () => {
    const tabs = {};
    tabNames.forEach((item, index) => {
      tabs[`tab${index}`] = {
        screen: props => (
          <TrendingTabPage timeSpan={timeSpan} {...props} tabLabel={item} />
        ),
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

  const createTitleView = () => {
    return (
      <View>
        <TouchableOpacity underlayColor="transparent" onPress={() => show()}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={styles.title}>Trending {timeSpan.showText}</Text>
            <MaterialIcons
              name={'arrow-drop-down'}
              size={22}
              style={{color: 'white'}}
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const show = () => {
    setVisible(true);
  };

  const dismiss = () => {
    setVisible(false);
  };

  const onSelectTimeSpan = tab => {
    dismiss();
    setTimeSpan(tab);
  };

  const createTrendingDialog = () => {
    return (
      <TrendingDialog
        visible={visible}
        onDismiss={dismiss}
        onShow={show}
        onSelect={tab => onSelectTimeSpan(tab)}
      />
    );
  };

  return (
    <View style={styles.container}>
      <NavigationBar
        title="Trending"
        titleView={createTitleView()}
        statusBar={{
          backgroundColor: THEME_COLOR,
          barStyle: 'light-content',
        }}
        style={{backgroundColor: THEME_COLOR}}
      />
      <TopNavigator />
      {createTrendingDialog()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '400',
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
  trending: state.trending,
});

const mapDispatchToProps = dispatch => ({
  onLoadTrendingData: (storeName, url, pageSize, favoriteDao) =>
    dispatch(actions.onLoadTrendingData(storeName, url, pageSize, favoriteDao)),
  onLoadMoreTrending: (
    storeName,
    pageIndex,
    pageSize,
    items,
    favoriteDao,
    callback,
  ) =>
    dispatch(
      actions.onLoadMoreTrending(
        storeName,
        pageIndex,
        pageSize,
        items,
        favoriteDao,
        callback,
      ),
    ),
});

const TrendingTabPage = connect(
  mapStateToProps,
  mapDispatchToProps,
)(TrendingTab);

export default Trending;
