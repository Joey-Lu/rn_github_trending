import actionTypes from '../actionTypes';
import DataStore, {FLAG_STORAGE} from '../../expand/dao/DataStore';
import {handleData} from '../ActionUtil';

export const onLoadMoreTrending = (
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
          type: actionTypes.TRENDING_LOAD_MORE_FAIL,
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
          type: actionTypes.TRENDING_LOAD_MORE_SUCCESS,
          storeName,
          pageIndex,
          projectModes: dataArray.slice(0, max),
        });
      }
    }, 500);
  };
};

export const onLoadTrendingData = (storeName, url, pageSize) => {
  return dispatch => {
    dispatch({
      type: actionTypes.TRENDING_REFRESH,
      storeName,
    });
    let dataStore = new DataStore();
    dataStore
      .fetchData(url, FLAG_STORAGE.flag_trend) //async call
      .then(data => {
        handleData(
          actionTypes.TRENDING_REFRESH_SUCCESS,
          dispatch,
          storeName,
          data,
          pageSize,
        );
      })
      .catch(err => {
        console.log(err);
        dispatch({
          type: actionTypes.TRENDING_REFRESH_FAIL,
          storeName,
          err,
        });
      });
  };
};
