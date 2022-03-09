import { createReducer, createAction } from '@reduxjs/toolkit';
import { getUserId } from '../../shared/cookie';

import { answerAPI, imgAPI } from '../../shared/api';

export const initialState = {
    answer: {
        answerId: 0,
        requestWriterId: 0,
        answerWriterId: 0,
        title:'라면 무따 아이가',
        content:'시원하고 얼큰하네예',
        modifiedAt: '2020-10-10T11:27:39',
        star: 0,
        category:'먹방/음식',
        commentCount: 0,
        likeUserList: [],
        answerLikeCount: 0,
        answerWriter:'라면무쨔',
        fileList:['https://miro.medium.com/max/1200/1*a2ykUZa-Ge5cMoNLea7Bbg.png'],
        video:'',
    },
    comments: [
        {
        answerId : 0,
        commentId : 0,
        commentWriterId : 0,
        commentWriter : '라면 무따',
        content : '개마싯게네요',
        modifiedAt : '2020-10-10T11:27:39',
    },],
    childComment: []
}

//actions 
const setAnswer = createAction('answer/setAnswer');
const deleteComment = createAction('answer/deleteComment');
const pushLike = createAction('answer/pushLike');
const addComment = createAction('answer/addComment');
const editComment = createAction('answer/editComment');
const delComment = createAction('answer/delComment');
const rateStar = createAction('answer/rateStar');

// reducer
const answer = createReducer(initialState,{
    [setAnswer]: (state,action) => {
        state.answer = action.payload.answer
        state.comments = action.payload.comment
    },
    [deleteComment]: (state,action) => {
        state.answer = action.payload.answer
        state.comments = action.payload.comment
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
    },
    [editComment]: (state,action) => {
        state.comments = state.comments.map((c)=>{
            console.log(c)
            if(c.commentId === action.payload.commentId){
                return c ={...c,content:action.payload.comment}
            }
            return c
        })
    },
    [delComment]: (state,action) => {
        state.comments = state.comments.filter(c=>{
            return c.commentId !== action.payload.commentId
        })
    },
    [rateStar]: (state,action) => {
        state.answer.star = Number(action.payload.star);
    },
})

// middlewares
const answeringDB = (data,postId) => async (dispatch, getState, { history }) =>{
    try{
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
        
    }catch(error){
        console.log('error',error);
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
    }catch(error){
        console.log('error',error);
    }
}

const deleteAnswerDB = (answerId) => async (dispatch, getState, { history }) => {
    answerAPI.deleteAnswer(answerId)
    .then(()=>{
        window.alert('삭제완료');
        history.replace('/home');
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
        console.log('댓글 작성 완료!');
        dispatch(addComment(res.data));
    }catch(error){
        console.log('error',error);
    }
};

const deleteCommentDB = (data) => async (dispatch, getState, {history}) => {
    try{
        const _delete = await answerAPI.removeComment(data.commentId);
        console.log('댓글 삭제 완료!');
        dispatch(delComment(data));
    }catch(error){
        console.log('error',error);
    }
}

const editCommentDB = (data) => async (dispatch, getState, {history}) => {
    try{
        const _edit = await answerAPI.editComment(data.commentId,data.comment);
        console.log('댓글 수정 완료!');
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
    editAnswerDB,
    deleteAnswerDB,
    getOneAnswer,
    addCommentDB,
    deleteCommentDB,
    editCommentDB,
    pushLikeDB,
    starDB
}

export default answer;