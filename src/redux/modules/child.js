import { createReducer, createAction } from '@reduxjs/toolkit';

import { childAPI, answerAPI } from '../../shared/api';

export const initialState = {
    parentComment:{
        answerId : 0,
        commentId : 0,
        commentWriterId : 0,
        commentWriter : '부모작성자',
        content : '부모댓글 내용',
        modifiedAt : '2020-10-10T11:27:39',
        timeStamp: '',
    },
    childComments :[
        {
            commentId: 0,
            parentId: 0,
            commentWriterId: 0,
            commentWriter:'자식작성자',
            content:'자식댓글 내용',
            modifiedAt:'2020-10-10T11:27:39'
        },
    ]
}

// actions
const setComment = createAction('child/setComment');
const addComment = createAction('child/addComment');
const editComment = createAction('child/editComment');
const delComment = createAction('child/delComment');
const test = createAction('child/test')

// reducer
const child = createReducer(initialState,{
    [setComment]:(state,action) => {
        state.parentComment = action.payload.parentComment;
        state.childComments = action.payload.childComments; 
    },
    [addComment]:(state,action) => {
        state.childComments = [...state.childComments,action.payload];
    },
    [editComment]:(state,action) => {
        state.childComments = state.childComments.map((c)=>{
            if(c.commentId === action.payload.commentId){
                return {...c,content:action.payload.comment};
            }
            return c
        })
    },
    [delComment]:(state,action) => {
        state.childComments = state.childComments.filter((c)=>{
            return c.commentId !== action.payload;
        })
    },
    [test]:(state,action) => {
        console.log('실험성공');
    },
})

// middlewares
const getChildsDB = (commentId) => async (dispatch,getState,{history}) => {
    childAPI.getChilds(commentId)
    .then(res=>{
        const data = {
            parentComment: res.data.parentComment,
            childComments: res.data.childComments
        }
        dispatch(setComment(data));
    })
    .catch(err=>{
        console.log('error',err);
    })
};

const addChildDB = (data) => async (dispatch,getState,{history}) => {
    answerAPI.addComment(data)
    .then(res=>{
        dispatch(addComment(res.data));
    })
    .catch(err=>{
        console.log('error',err)
    })
};

const editChildDB = (data) => async (dispatch,getState,{history}) => {
    answerAPI.editComment(data)
    .then(()=>{
        console.log('수정성공');
        dispatch(editComment(data));
    })
    .catch(err=>{
        console.log('error',err);
    })
};

const delChildDB = (commentId) => async (dispatch,getState,{history}) => {
    answerAPI.removeComment(commentId)
    .then(()=>{
        console.log('삭제완료!!');
        dispatch(delComment(commentId));
    })
    .catch(err=>{
        console.log('error',err);
    })
}

export const childActions = {
    test,
    getChildsDB,
    addChildDB,
    editChildDB,
    delChildDB,
};

export default child;