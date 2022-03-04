import { createReducer, createAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { deleteCookie, setCookie } from '../../shared/cookie';
import { postAPI, requestAPI } from '../../shared/api';
import { getUserId } from '../../shared/cookie';

export const initialState = {
    list: [],
    request:{
        requestWriter: 'requester',
        title : '이러쿵 저러쿵 해주시라예',
        content : '죠로쿵 요로콤 해주심 됨더',
        modifiedAt : '2020-02-03T10:10:10',
        answerCount : 0,
        userId : 0,
        answerLikeCount: 0,
        level: '중',
        category: '기타',
        fileList: [],
    },
    likeUserIdList:[1,2,3,4,5],
    answers: [{
        answerId: 0,
        answerWritter: 'responser',
        title:'responsetitle',
        modifiedAt:'2020-02-03T20:20:20',
        answerLikeCount: 1,
        commentCount: 1,
    },]
};

const setList = createAction('post/SETLIST');
const setRequest = createAction('post/setRequest');
const setAnswer = createAction('post/setAnswer');
const setLike = createAction('post/setLike');
const pushLike = createAction('post/pushLike');

// const tag = createAction('post/TAG');

const post = createReducer(initialState, {
    [setList] : (state, action) => {
        state.list = action.payload;
    },
    [setRequest] : (state, action) => {
        state.request = action.payload.request;
        state.likeUserIdList = action.payload.like;
        state.answers = action.payload.answer;
    },
    [setAnswer] : (state, action) => {
        state.answers = action.payload;
    },
    [setLike] : (state, action) => {
        state.likeUserIdList = action.payload;
    },
    [pushLike] : (state, action) => {
        console.log(state.likeUserIdList.includes(Number(action.payload)))
        if(state.likeUserIdList.includes(Number(action.payload))){
            state.likeUserIdList = state.likeUserIdList.filter(s => Number(s) !== Number(action.payload));
        }else{
            state.likeUserIdList = [...state.likeUserIdList,Number(action.payload)];
        }
    },
});

// thunk

const makeRequest = (data) => async (dispatch, getState, {history}) => {
    try{
        const res = await requestAPI.makeRequest(data);
        
    } catch (error) {
        console.log(error);
        alert(error.response.data.errorMessage);
    }
}

const getOneRequest = (postId) => async (dispatch, getState, {history}) => {
    try{
        const request = await requestAPI.getOneRequestDB(postId);
        const answers = await requestAPI.getRequestAnswers(postId);

        const data = {
            request: request.data,
            like: request.data.likeUserIdList,
            answer: answers.data
        }
        
        dispatch(setRequest(data));
    }catch(error){
        window.alert('오류가 발생했습니다. 콘솔의 네트워크를 확인해주세요.')
    }
}

const getPostList = () => async (dispatch, getState, { history }) => {
    try {
      const res = await postAPI.getPostList();
    //   console.log(res.data);
      dispatch(setList(res.data));
    }
    catch (error) {
      console.log(error);
    }
  };

const pushLikeDB = (postId) => async (dispatch, getState, {history}) => {
    try{
        const _like = await requestAPI.pushLike(postId);
        const userId = getUserId();
        dispatch(pushLike(userId));
    }catch(error){

    }
}

export const postActions = {
    setList,
    getPostList,
    makeRequest,
    getOneRequest,
    pushLikeDB
};

export default post;