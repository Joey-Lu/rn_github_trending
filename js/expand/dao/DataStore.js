import AsyncStorage from '@react-native-community/async-storage';
import GitHubTrending from 'GitHubTrending';
export const FLAG_STORAGE = {flag_popular: 'popular', flag_trend: 'trending'};

export default class DataStore {
  saveData(url, data, callback) {
    if (!data || !url) {
      return;
    }
    AsyncStorage.setItem(url, JSON.stringify(this._wrapData(data)), callback);
  }

  _wrapData(data) {
    return {
      data,
      timeStamp: new Date().getTime(),
    };
  }

  fetchData(url, flag) {
    return new Promise((resolve, reject) => {
      this.fetchLocalData(url)
        .then(wrapData => {
          if (wrapData && DataStore.checkTimestampValid(wrapData.timestamp)) {
            resolve(wrapData);
          } else {
            this.fetchRemoteData(url, flag)
              .then(data => {
                resolve(this._wrapData(data));
              })
              .catch(error => {
                reject(error);
              });
          }
        })
        .catch(error => {
          this.fetchRemoteData(url, flag)
            .then(data => {
              resolve(this._wrapData(data));
            })
            .catch(error => {
              reject(error);
            });
        });
    });
  }

  fetchLocalData(url) {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem(url, (error, result) => {
        if (!error) {
          try {
            resolve(JSON.parse(result));
          } catch (e) {
            reject(e);
            console.error(e);
          }
        } else {
          reject(error);
          console.error(error);
        }
      });
    });
  }

  fetchRemoteData(url, flag) {
    return new Promise((resolve, reject) => {
      if (flag !== FLAG_STORAGE.flag_trend) {
        fetch(url)
          .then(response => {
            if (response.ok) {
              return response.json();
            }
            throw new Error('Network response was not ok.');
          })
          .then(responseData => {
            this.saveData(url, responseData);
            resolve(responseData);
          })
          .catch(error => {
            reject(error);
          });
      } else {
        new GitHubTrending()
          .fetchTrending(url)
          .then(items => {
            if (!items) {
              throw new Error('responseData is null');
            }
            this.saveData(url, items);
            resolve(items);
          })
          .catch(error => {
            reject(error);
          });
      }
    });
  }

  static checkTimestampValid(timestamp) {
    const currentDate = new Date();
    const targetDate = new Date();
    targetDate.setTime(timestamp);
    if (currentDate.getMonth() !== targetDate.getMonth()) {
      return false;
    }
    if (currentDate.getDate() !== targetDate.getDate()) {
      return false;
    }
    if (currentDate.getHours() - targetDate.getHours() > 4) {
      return false;
    }
    // if (currentDate.getMinutes() - targetDate.getMinutes() > 1)return false;
    return true;
  }
}
