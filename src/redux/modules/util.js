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
  },
  recommend : [],
  mypost: [{
    requestId: null,
    title : "요청초기값",
    modifiedAt: "",
    likeCount: null,
  }],
  myanswer: [{
    answerId: null,
    title : "답변초기값",
    modifiedAt: "",
    likeCount: null,
  }],
  category: '',
  popupOpen: true,
};

// action
const setBanner = createAction('util/SET_BANNER');
const setAchievement = createAction('util/SET_ACHIEVEMENT');
const setSurveyResult = createAction('util/SET_SURVEY_RESULT');
const setMypost = createAction('util/SET_MYPOST');
const setMyanswer = createAction('util/SET_MYANSWER');
const setCategory = createAction('util/SET_CATEGORY');
const setRecommend = createAction('util/SET_RECOMMEND');
const setPopupOpen = createAction('util/POPUP_OPEN');

// reducer
const util = createReducer(initialState, {
  [setSurveyResult]: (state, action) => {
    state.result = action.payload;
  },
  [setRecommend]: (state, action) => {
    state.recommend = action.payload;
  },
  [setBanner]: (state, action) => {
    state.list = action.payload;
  },
  [setAchievement]: (state, action) => {
    state.achievement = action.payload;
  },
  [setMypost] : (state, action) => {
    state.mypost = action.payload;
  },
  [setMyanswer] : (state, action) => {
    state.myanswer = action.payload;
  },
  [setCategory] : (state, action) => {
    state.category = action.payload;
  },
  [setPopupOpen] : (state, action) => {
    state.popupOpen = action.payload;
  },
});

// middleware actions
const getSurveyResult = () => async (dispatch, getState, { history }) => {
  try {
    const res = await utilAPI.getSurveyResult();    
    const _res = await utilAPI.getRecommend(res.data.hippoName);
    
    dispatch(setSurveyResult(res.data));
    dispatch(setRecommend(_res.data));
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

const getMypost = () => async (dispatch, getState, { history }) => {
  try {
    const res = await utilAPI.getMypostList();
    console.log(res.data);
    dispatch(setMypost(res.data));
  }
  catch (error) {
    console.log(error);
  }
};

const getMyanswer = () => async (dispatch, getState, { history }) => {
  try {
    const res = await utilAPI.getMyanswerList();
    console.log(res.data);
    dispatch(setMyanswer(res.data));
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
  getMypost,
  getMyanswer,
  setCategory,
  setPopupOpen,
};

export default util;
