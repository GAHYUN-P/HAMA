import { createReducer, createAction } from '@reduxjs/toolkit';
import { utilAPI } from '../../shared/api';

// initialState
const initialState = {
  list: null,
};

// action
const setBanner = createAction('util/SET_BANNER');
const setPreview = createAction('util/SET_PREVIEW');

// reducer
const util = createReducer(initialState, {
  [setBanner]: (state, action) => {
    state.list = action.payload;
  },
  [setPreview]: (state, { payload }) => {
    state.preview = payload;
  }
});

// middleware actions
const getBanner = () => async (dispatch, getState, { history }) => {
  try {
    const res = await utilAPI.getBannerInfo();
    console.log(res.data);
    dispatch(setBanner(res.data));
  }
  catch (error) {
    console.log(error);
  }
};



// action creator export
export const utilActions = {
  getBanner,
};

export default util;
