import { createReducer, createAction } from '@reduxjs/toolkit';
import { searchAPI } from '../../shared/api';



export const initialState = {
    requestResult:'',
    answerResult:'',
    requestCount: 0,
    answerCount: 0,
    recentWord:'',
}

// actions
const setRequest = createAction('search/setRequest');
const setAnswer = createAction('search/setAnswer');
const initResult = createAction('search/initResult');
const setRecentWord = createAction('search/setRecentWord');

// reducer
const search = createReducer(initialState,{
    [setRequest]:(state,action) => {
        state.requestResult = action.payload.searchRequest;
        state.answerCount = action.payload.answerCount;
    },
    [setAnswer]:(state,action) => {
        state.answerResult = action.payload.searchRequest;
        state.requestCount = action.payload.postCount;
    },
    [initResult]:(state,action) => {
        state.requestResult = '';
        state.answerResult = '';
        state.requestCount = 0;
        state.answerCount = 0;
    },
    [setRecentWord]:(state,action) => {
        state.recentWord = action.payload;
    },
});


// middlewares
const getRequestResultDB = (word) => async (dispatch,getState,{history}) => {
    console.log('리퀘스트 가져옴');
    searchAPI.getResultPost(word)
    .then(res => {
        console.log(res.data);
        dispatch(setRequest(res.data));
    })
    .catch(err => {
        console.log('error',err);
    })
}

const getAnswerResultDB = (word) => async (dispatch,getState,{history}) => {
    console.log('응답글 가져옴');
    searchAPI.getResultAnswer(word)
    .then(res => {
        console.log(res.data);
        dispatch(setAnswer(res.data));
    }).catch(err => {
        console.log('error',err);
    })
};

const setRecentWordDB = () => async (dispatch,getState,{history}) => {
    try{
        console.log('최근검색어 가져옴!!');
        dispatch(setRecentWord([1,2,3]));
    }catch(error){
        console.log('error',error);
    }
}

export const searchActions = {
    getRequestResultDB,
    getAnswerResultDB,
    setRecentWordDB,
    initResult
};

export default search;