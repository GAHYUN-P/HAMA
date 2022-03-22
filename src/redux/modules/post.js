import { createReducer, createAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { deleteCookie, setCookie } from '../../shared/cookie';
import { postAPI, requestAPI, imgAPI } from '../../shared/api';
import { getUserId } from '../../shared/cookie';

export const initialState = {
    list: [],
    HMlist: [],
    request:'',
    likeUserIdList:[],
    answers: [],
    basic:[{
        answerId: 0,
        answerWritter: 'responser',
        title:'responsetitle',
        modifiedAt:'2020-02-03T20:20:20',
        answerLikeCount: 1,
        commentCount: 1,
    },],
    tag: "all",
    sort: "",
};

const setList = createAction('post/SETLIST');
const setHMList = createAction('post/SETHMLIST');
const setRequest = createAction('post/setRequest');
const setAnswer = createAction('post/setAnswer');
const pushLike = createAction('post/pushLike');
const setTag = createAction('post/TAG');
const setSort = createAction('post/SORT');
const concluseRequest = createAction('post/concluseRequest');
const sortAnswer = createAction('post/sortAnswer');
const reset = createAction('post/reset');

const post = createReducer(initialState, {
    [setList] : (state, action) => {
        state.list = action.payload;
    },
    [setHMList] : (state, action) => {
        state.HMlist = action.payload;
    },
    [setRequest] : (state, action) => {
        state.request = action.payload.request;
        state.likeUserIdList = action.payload.like;
        state.answers = action.payload.answer;
        state.basic = action.payload.answer;
    },
    [setAnswer] : (state, action) => {
        state.answers = action.payload;
    },
    [pushLike] : (state, action) => {
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
    [concluseRequest] : (state, action) => {
        state.request.status = 'false';
        state.request.timeSet = '마감된 요청입니다.';
    },
    [sortAnswer] : (state, action) => {
        if(action.payload === '댓글순'){
            state.answers = state.answers.sort((a,b)=>{
                return b.commentCount - a.commentCount;
            })
            return
        }
        if(action.payload === '좋아요순'){
            state.answers = state.answers.sort((a,b)=>{
                return b.answerLikeCount - a.answerLikeCount;
            })
            return
        }
        if(action.payload === '최신순'){
            state.answers = state.basic
            return
        }
    },
    [reset] : (state, action) => {
        state.request = '';
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
        
        const res = await requestAPI.makeRequest(data);
        console.log(res.data)
        history.replace(`/requestdetail/${res.data}`);
        
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
        history.replace(`/requestdetail/${postId}`);
    }catch(error){
        console.log('error',error);
    }
}

const concluseRequestDB = (postId) => async (dispatch, getState, {history}) => {
    requestAPI.concluseRequest(postId)
    .then(()=>{
        dispatch(concluseRequest());
    })
    .catch(err=>{
        console.log('error',err);
    })
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

const getHMPostList = () => async (dispatch, getState, { history }) => {
    try {
      const res = await postAPI.getHMPostList();
      dispatch(setHMList(res.data));
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
    concluseRequestDB,
    setTag,
    getSortList,
    setSort,
    concluseRequest,
    sortAnswer,
    reset,
    getHMPostList,
};

export default post;