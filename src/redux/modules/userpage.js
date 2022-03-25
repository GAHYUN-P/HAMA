import { createReducer, createAction } from '@reduxjs/toolkit';
import { mypageAPI, userpageAPI } from '../../shared/api';

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
  },
  comments: [],
  userId: 0,
};

// action
const setBanner = createAction('mypage/SET_BANNER');
const setAchievement = createAction('mypage/SET_ACHIEVEMENT');
const setMypost = createAction('mypage/SET_MYPOST');
const setMyanswer = createAction('mypage/SET_MYANSWER');
const setCategory = createAction('mypage/SET_CATEGORY');
const setDetail = createAction('mypage/SET_DETAIL');
const setUserInfo = createAction('mypage/SET_USERINFO');
const setComments = createAction('userpage/setComments');
const addComment = createAction('userpage/addComment');
const addChild = createAction('userpage/addChild');
const editComment = createAction('userpage/editComment');
const editChild = createAction('userpage/editChild');
const delComment = createAction('userpage/delComment');
const delChild = createAction('userpage/delChild');


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
  [setComments] : (state, action) => {
    state.comments = action.payload;
  },
  [addComment] : (state, action) => {
    state.comments = [action.payload,...state.comments];
  },
  [editComment] : (state, action) => {
    state.comments = state.comments.map((c)=>{
      if(c.id === action.payload.commnetId){
        return {...c,content: action.payload.content}
      }
      return c
    })
  },
  [addChild] : (state, action) => {
    const index = state.comments.indexOf(state.action.parentId);
    state.comments[index] = [action.payload.child,...state.comments[index]];
  },
  [editChild] : (state, action) => {
    const index = state.comments.indexOf(state.action.parentId);
    state.comments[index] = state.comments[index].map((c)=>{
      if(c.id === action.payload.commnetId){
        return {...c, content: action.payload.content}
      }
      return c
    });
  },
  [delComment] : (state, action) => {
    state.comments = state.comments.filter((c)=>{return c.id !== action.payload.commnetId})
  },
  [delChild] : (state, action) => {
    const index = state.comments.indexOf(state.action.parentId);
    state.comments[index] = state.comments[index].filter((c)=>{return c.id !== action.payload.commnetId});
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

const getCommentsDB = (userId) => async (dispatch, getState, {history}) => {
  userpageAPI.getComments(userId)
  .then(res=>{dispatch(setComments(res.data))})
  .catch(err=>{console.log(err)})
};

const addCommentsDB = (data) => async (dispatch, getState, {history}) => {
  userpageAPI.addComments(data)
  .then(()=>{
    if(!data.parentId){dispatch(addComment(data))};
    if(data.parentId){dispatch(addChild(data))};
  })
  .catch(err=>{console.log(err)})
};

const editCommentsDB = (data) => async (dispatch, getState, {history}) => {
  userpageAPI.editComments(data)
  .then(()=>{
    if(!data.parentId){dispatch(editComment(data))};
    if(data.parentId){dispatch(editChild(data))};
  })
  .catch(err=>{console.log(err)});
};

const delCommentsDB = (data) => async (dispatch, getState, {history}) => {
  userpageAPI.delComments(data.commnetId)
  .then(()=>{
    if(!data.parentId){dispatch(delComment(data))};
    if(data.parentId){dispatch(delChild(data))};
  })
  .catch(err=>{console.log(err)})
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
  getCommentsDB,
  addCommentsDB,
  editCommentsDB,
  delCommentsDB
};

export default userpage;