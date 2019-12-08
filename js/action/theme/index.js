import actionTypes from '../actionTypes';

export const onThemeChange = theme => {
  return {
    type: actionTypes.THEME_CHANGE,
    theme,
  };
};
