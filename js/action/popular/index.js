import actionTypes from '../actionTypes';
import DataStore from '../../expand/dao/DataStore';

const handleData = (dispatch, storeName, data, pageSize) => {
  let fixItems = [];
  if (data && data.data && data.data.items) {
    fixItems = data.data.items;
  }
  dispatch({
    type: actionTypes.POPULAR_REFRESH_SUCCESS,
    items: fixItems,
    projectModes:
      pageSize > fixItems.length ? fixItems : fixItems.slice(0, pageSize),
    pageIndex: 1,
    storeName,
  });
};

export const onLoadMorePopular = (
  storeName,
  pageIndex,
  pageSize,
  dataArray = [],
  callback,
) => {
  return dispatch => {
    setTimeout(() => {
      if ((pageIndex - 1) * pageSize >= dataArray.length) {
        if (typeof callback === 'function') {
          callback('no more data');
        }
        dispatch({
          type: actionTypes.POPULAR_LOAD_MORE_FAIL,
          error: 'no more data',
          storeName,
          pageIndex: --pageIndex,
        });
      } else {
        let max =
          pageSize * pageIndex > dataArray.length
            ? dataArray.length
            : pageSize * pageIndex;
        dispatch({
          type: actionTypes.POPULAR_LOAD_MORE_SUCCESS,
          storeName,
          pageIndex,
          projectModes: dataArray.slice(0, max),
        });
      }
    }, 500);
  };
};

export const onLoadPopularData = (storeName, url, pageSize) => {
  return dispatch => {
    dispatch({
      type: actionTypes.POPULAR_REFRESH,
      storeName,
    });
    let dataStore = new DataStore();
    dataStore
      .fetchData(url) //async call
      .then(data => {
        handleData(dispatch, storeName, data, pageSize);
      })
      .catch(err => {
        console.log(err);
        dispatch({
          type: actionTypes.POPULAR_REFRESH_FAIL,
          storeName,
          err,
        });
      });
  };
};
