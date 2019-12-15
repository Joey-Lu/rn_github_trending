export const handleData = (actionType, dispatch, storeName, data, pageSize) => {
  let fixItems = [];
  if (data && data.data) {
    if (Array.isArray(data.data)) {
      fixItems = data.data;
    } else if (Array.isArray(data.data.items)) {
      fixItems = data.data.items;
    }
  }
  dispatch({
    type: actionType,
    items: fixItems,
    projectModes:
      pageSize > fixItems.length ? fixItems : fixItems.slice(0, pageSize),
    pageIndex: 1,
    storeName,
  });
};
