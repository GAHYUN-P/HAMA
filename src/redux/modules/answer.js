import { createReducer, createAction } from '@reduxjs/toolkit';
import { getUserId } from '../../shared/cookie';

import { answerAPI, imgAPI } from '../../shared/api';

export const initialState = {
    answer: '',
    comments: [],
    childComment: [],
    answerLoading: false
}

//actions 
const setAnswer = createAction('answer/setAnswer');
const resetAnswer = createAction('answer/resetAnswer');
const deleteComment = createAction('answer/deleteComment');
const pushLike = createAction('answer/pushLike');
const addComment = createAction('answer/addComment');
const editComment = createAction('answer/editComment');
const delComment = createAction('answer/delComment');
const rateStar = createAction('answer/rateStar');
const setLoading = createAction('answer/setLoading');

// reducer
const answer = createReducer(initialState,{
    [setAnswer]: (state,action) => {
        state.answer = action.payload.answer;
        state.comments = action.payload.comment;
    },
    [setLoading]: (state,action) => {
        state.answerLoading = !state.answerLoading;
    },
    [deleteComment]: (state,action) => {
        state.answer = action.payload.answer;
        state.comments = action.payload.comment;
    },
    [pushLike]: (state,action) => {
        if(state.answer.likeUserList.includes(action.payload)){
            state.answer.likeUserList = state.answer.likeUserList.filter(l => {return l !== action.payload})
        }else{
            state.answer.likeUserList = [...state.answer.likeUserList,action.payload];
        }
    },
    [addComment]: (state,action) => {
        state.comments = [...state.comments,action.payload];
        state.answer.commentCount = state.answer.commentCount + 1; 
    },
    [editComment]: (state,action) => {
        const {comment,timestamp} = action.payload
        state.comments = state.comments.map((c)=>{
            if(c.commentId === action.payload.commentId){
                return c ={...c,content: comment,timestamp: timestamp}
            }
            return c
        })
    },
    [delComment]: (state,action) => {
        state.comments = state.comments.filter(c=>{
            return c.commentId !== action.payload.commentId
        })
        state.answer.commentCount = state.answer.commentCount - action.payload.cnt;
    },
    [rateStar]: (state,action) => {
        state.answer.star = Number(action.payload.star);
    },
    [resetAnswer]: (state,action) => {
        state.answer = '';
    },
})

// middlewares
const answeringDB = (data,postId) => async (dispatch, getState, { history }) =>{
    try{
        dispatch(setLoading());
        const formdata = new FormData();

        const image = getState().image.files;
        const video = getState().image.videoFile;

        image ? (image.map(i=>{return formdata.append('file',i)})) : formdata.append('file',null)
        video ? formdata.append('video',video) : formdata.append('video',null)
        
        const urls = await imgAPI.fileUpload(formdata);
        data = {
            ...data,
            file:urls.data.file,
            video:urls.data.video
        }

        const res = await answerAPI.answering(data,postId);
        dispatch(setLoading());
        history.replace(history.replace(`/answerdetail/${res.data}`)); 
    }catch(error){
        console.log('error',error);
    }
}

const answeringDB2 = (data,postId) => async (dispatch, getState, { history }) => {
    const formdata = new FormData();
    const image = getState().image.files;
    const video = getState().image.videoFile;
    image ? (image.map(i=>{return formdata.append('file',i)})) : formdata.append('file',null);
    video ? formdata.append('video',video) : formdata.append('video',null);

    formdata.append('answer',new Blob([JSON.stringify(data)],{'type':'application/json'}));

    try{
        const peanutBurger = answerAPI.answering2(formdata,postId);
        window.alert('?????? ????????? ?????? ????????? ????????? ???????????? ??? ????????????. ??? ???????????? ???????????? ???????????? ???????????? ??? ?????????!')
        history.replace(`/requestdetail/${postId}`);
    }catch(error){
        console.log(error);
    }
}

const editAnswerDB = (data,answerId) => async (dispatch, getState, { history }) => {
    try{
        const file = getState().image.files
        const video = getState().image.videoFile
        data = {
            ...data,
            file: file,
            video: video
        }
        console.log(data);
        const _edit = answerAPI.editAnswer(data,answerId);
        history.replace(`/answerdetail/${answerId}`);
    }catch(error){
        console.log('error',error);
    }
}

const deleteAnswerDB = (answerId) => async (dispatch, getState, { history }) => {
    answerAPI.deleteAnswer(answerId)
    .then(()=>{
        window.alert('????????????');
        history.replace('/');
    })
    .catch(err=>{
        console.log('error',err);
    })
}

const getOneAnswer = (answerId) => async (dispatch, getState, { history }) => {
    try{
        const oneAnswer = await answerAPI.getAnswer(answerId);
        const comment = await answerAPI.getComment(answerId);
        const data = {
            answer: oneAnswer.data,
            comment: comment.data
        }
        dispatch(setAnswer(data))
    }catch(error){
        console.log(error);
    }
};

const addCommentDB = (data) => async (dispatch, getState, { history }) => {
    try{
        const res = await answerAPI.addComment(data);
        console.log('?????? ?????? ??????!');
        dispatch(addComment(res.data));
    }catch(error){
        console.log('error',error);
    }
};

const deleteCommentDB = (data) => async (dispatch, getState, {history}) => {
    try{
        const _delete = await answerAPI.removeComment(data.commentId);
        console.log('?????? ?????? ??????!');
        dispatch(delComment(data));
    }catch(error){
        console.log('error',error);
    }
}

const editCommentDB = (data) => async (dispatch, getState, {history}) => {
    try{
        const _edit = await answerAPI.editComment(data);
        console.log('?????? ?????? ??????!');
        dispatch(editComment(data));
    }catch(error){
        console.log('error',error);
    }
}

const pushLikeDB = (data) => async (dispatch, getState, {history}) => {
    try{
        const _like = answerAPI.pushLike(data.answerId);
        dispatch(pushLike(data.userId));
    }catch(error){
        console.log('error',error);
    }
}

const starDB = (data) => async (dispatch, getState, {history}) => {
    try{
        const _star = answerAPI.rating(data);
        dispatch(rateStar(data));
    }catch(error){
        console.log('error',error);
    }
}

export const answerActions = {
    answeringDB,
    answeringDB2,
    editAnswerDB,
    deleteAnswerDB,
    getOneAnswer,
    addCommentDB,
    deleteCommentDB,
    editCommentDB,
    pushLikeDB,
    starDB,
    resetAnswer
}

export default answer;