import Utils from '../util/Utils';
import ProjectModel from '../model/ProjectModel';

export const handleData = (
  actionType,
  dispatch,
  storeName,
  data,
  pageSize,
  favoriteDao,
) => {
  let fixItems = [];
  if (data && data.data) {
    if (Array.isArray(data.data)) {
      fixItems = data.data;
    } else if (Array.isArray(data.data.items)) {
      fixItems = data.data.items;
    }
  }
  let showItems =
    pageSize > fixItems.length ? fixItems : fixItems.slice(0, pageSize);
  _projectModels(showItems, favoriteDao, projectModels => {
    dispatch({
      type: actionType,
      items: fixItems,
      projectModes: projectModels,
      pageIndex: 1,
      storeName,
    });
  });
};

export const _projectModels = async (showItems, favoriteDao, callback) => {
  let keys = [];
  try {
    keys = await favoriteDao.getFavoriteKeys();
  } catch (err) {
    console.log(err);
  }
  let projectModels = [];
  for (let i = 0, len = showItems.length; i < len; i++) {
    projectModels.push(
      new ProjectModel(showItems[i], Utils.checkFavorite(showItems[i], keys)),
    );
  }
  if (typeof callback === 'function') {
    callback(projectModels);
  }
};
