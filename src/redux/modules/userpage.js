import { createReducer, createAction } from '@reduxjs/toolkit';
import { mypageAPI } from '../../shared/api';

// initialState
const initialState = {
  list: {
    nickname: '',
    email: '',
    hippoName:'일반 하마',
    point: 0,
    hippolv: 1,
    category: "",
    expert: [],
    imgUrl:"",
  },
  achievement : [
      0,0,0,0,0,0,0,0
  ],
  mypost: [{
    requestId: null,
    title : "요청글이 없습니다.",
    modifiedAt: "",
    nickname: '',
    imgUrl: 'https://t1.daumcdn.net/thumb/R720x0/?fname=http://t1.daumcdn.net/brunch/service/user/5xq2/image/0lp8RLaJ2IgctTWVl2nEa-JRCSc.jpg',
    category: '',
    likes: null,
    contents: '',
  }],
  myanswer: [{
    answerId: null,
    title : "답변글이 없습니다.",
    modifiedAt: "",
    nickname: '',
    imgUrl: 'http://san.chosun.com/site/data/img_dir/2019/04/24/2019042401956_0.jpg',
    category: '',
    likes: null,
    contents: '',
  }],
  category: '',
  is_what: '',
  userinfo: {
      nickname: '',
      hippoName: '',
      hippoImage:'',
      postCount: null,
      answerCount: null,
  }
};

// action
const setBanner = createAction('mypage/SET_BANNER');
const setAchievement = createAction('mypage/SET_ACHIEVEMENT');
const setMypost = createAction('mypage/SET_MYPOST');
const setMyanswer = createAction('mypage/SET_MYANSWER');
const setCategory = createAction('mypage/SET_CATEGORY');
const setDetail = createAction('mypage/SET_DETAIL');
const setUserInfo = createAction('mypage/SET_USERINFO');


// reducer
const userpage = createReducer(initialState, {
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
  [setDetail] : (state, action) => {
    state.is_what = action.payload;
  },
  [setUserInfo] : (state, action) => {
    state.userinfo = action.payload;
  },
});

// middleware actions

const getBanner = () => async (dispatch, getState, { history }) => {
  try {
    const res = await mypageAPI.getBannerInfo();
    console.log(res.data);
    dispatch(setBanner(res.data));
  }
  catch (error) {
    console.log(error);
  }
};

const getAchievement = () => async (dispatch, getState, { history }) => {
  try {
    const res = await mypageAPI.getAchievement();
    console.log(res.data.achievement);
    dispatch(setAchievement(res.data.achievement));
  }
  catch (error) {
    console.log(error);
  }
};

const getMypost = () => async (dispatch, getState, { history }) => {
  try {
    const res = await mypageAPI.getMypostList();
    console.log(res.data);
    dispatch(setMypost(res.data));
  }
  catch (error) {
    console.log(error);
  }
};

const getMyanswer = () => async (dispatch, getState, { history }) => {
  try {
    const res = await mypageAPI.getMyanswerList();
    console.log(res.data);
    dispatch(setMyanswer(res.data));
  }
  catch (error) {
    console.log(error);
  }
};

const getUserInfo = () => async (dispatch, getState, { history }) => {
    try {
      const res = await mypageAPI.getMypageUserInfo();
      console.log(res.data);
      dispatch(setUserInfo(res.data));
    }
    catch (error) {
      console.log(error);
    }
  };


// action creator export
export const userpageActions = {
  getBanner,
  getAchievement,
  getMypost,
  getMyanswer,
  setCategory,
  setDetail,
  getUserInfo,
};

export default userpage;
