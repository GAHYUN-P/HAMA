import { createReducer, createAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { deleteCookie, setCookie } from '../../shared/cookie';
import { postAPI, requestAPI, imgAPI } from '../../shared/api';
import { getUserId } from '../../shared/cookie';

export const initialState = {
    list: [],
    request:{
        postId: 0,
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
    },],
    tag: "all",
    sort: "latest",
};

const setList = createAction('post/SETLIST');
const setRequest = createAction('post/setRequest');
const setAnswer = createAction('post/setAnswer');
const setLike = createAction('post/setLike');
const pushLike = createAction('post/pushLike');
const setTag = createAction('post/TAG');
const setSort = createAction('post/SORT');

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
    [setTag] : (state, action) => {
        state.tag = action.payload;
    },
    [setSort] : (state, action) => {
        state.sort = action.payload;
    },

});

// thunk

const makeRequest = (data) => async (dispatch, getState, {history}) => {
    try{
        let file = [];
        const files = getState().image.files;
        const formdata = new FormData();
        // files.length > 0 ? (files.map(f=>{return formdata.append('file',f)})) : formdata.append('file',null);
        if(files.length > 0){
            files.map(f => {
                formdata.append('file',f)
                return f
            })
            formdata.append('video',null);
            const ires = await imgAPI.fileUpload(formdata);
            file = [...ires.data.file];
        }

        data = {...data,file:file };
        console.log(data);
        const res = await requestAPI.makeRequest(data);
        
    } catch (error) {
        console.log(error);
        alert(error.response.data.errorMessage);
    }
}

const editRequestDB = (postId,content) => async (dispatch, getState, {history}) => {
    try{

        const file = getState().image.files;
        const data = {file:file,content:content};
        console.log(data);
        const res = await requestAPI.editRequest(postId,data);

    }catch(error){
        console.log('error',error);
    }
}

const getOneRequest = (postId) => async (dispatch, getState, {history}) => {
    try{
        const request = await requestAPI.getOneRequestDB(postId);
        const answers = await requestAPI.getRequestAnswers(postId);
        console.log(request.data);
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

const getSortList = (tag, sort) => async (dispatch, getState, {history}) => {
    try{
        const sortList = await postAPI.selectPostSort(tag, sort);
        dispatch(setSort(sort));
    }catch(error){

    }
}

export const postActions = {
    setList,
    getPostList,
    makeRequest,
    getOneRequest,
    pushLikeDB,
    editRequestDB,
    setTag,

};

export default post;