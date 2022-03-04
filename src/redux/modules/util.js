import { createReducer, createAction } from '@reduxjs/toolkit';
import { utilAPI } from '../../shared/api';

// initialState
const initialState = {
  list: {
    nickname: '',
    email: '',
    hippoName:'일반 하마',
    point: 0,
    hippolv: 1,
  },
  achievement : [],
  result: {
    hippoName: "",
  }
};

// action
const setBanner = createAction('util/SET_BANNER');
const setAchievement = createAction('util/SET_ACHIEVEMENT');
const setSurveyResult = createAction('util/SET_SURVEY_RESULT');

// reducer
const util = createReducer(initialState, {
  [setSurveyResult]: (state, action) => {
    state.result = action.payload;
  },
  [setBanner]: (state, action) => {
    state.list = action.payload;
  },
  [setAchievement]: (state, action) => {
    state.achievement = action.payload;
  }
});

// middleware actions
const getSurveyResult = () => async (dispatch, getState, { history }) => {
  try {
    const res = await utilAPI.getSurveyResult();
    console.log(res.data);
    dispatch(setSurveyResult(res.data));
  }
  catch (error) {
    console.log(error);
  }
};

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

const getAchievement = () => async (dispatch, getState, { history }) => {
  try {
    const res = await utilAPI.getAchievement();
    console.log(res.data);
    dispatch(setAchievement(res.data));
  }
  catch (error) {
    console.log(error);
  }
};

// action creator export
export const utilActions = {
  getBanner,
  getAchievement,
  getSurveyResult,
};

export default util;
