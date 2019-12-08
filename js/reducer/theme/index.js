import actionTypes from '../../action/actionTypes';

const defaultState = {
  theme: 'blue',
};

const onAction = (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.THEME_CHANGE:
      return {
        ...state,
        theme: action.theme,
      };
    default:
      return state;
  }
};

export default onAction;
