import { createAction, handleActions } from 'redux-actions';

const INITIAL_STATE = {
  vkName: ''
};

export const setVkName = createAction('AUTH/SET_VK_NAME', vkName => ({ vkName }));

const reducer = handleActions(
  {
    [setVkName]: (state, action) => {
      state.vkName = action.payload.vkName;
      return state;
    },
  },
  INITIAL_STATE
);

export default reducer;
