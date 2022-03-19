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
const deleteRecentWord = createAction('search/deleteRecentWord');
const deleteRecentAll = createAction('search/deleteRecentAll');

// reducer
const search = createReducer(initialState,{
    [setRequest]:(state,action) => {
        state.requestResult = action.payload.searchRequest;
        state.answerCount = action.payload.answerCount;
        state.answerResult = '';
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
        state.recentWord = [...action.payload];
    },
    [deleteRecentWord]:(state,action) => {
        state.recentWord = state.recentWord.filter((r)=>{
            return r.id !== action.payload;
        })
    },
    [deleteRecentAll]:(state,action) => {
        state.recentWord = '';
    }
});


// middlewares
const getRequestResultDB = (word) => async (dispatch,getState,{history}) => {
    searchAPI.getResultPost(word)
    .then(res => {
        dispatch(setRequest(res.data));
    })
    .catch(err => {
        console.log('error',err);
    })
}

const getAnswerResultDB = (word) => async (dispatch,getState,{history}) => {
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
        const res = await searchAPI.getRecentWord();
        dispatch(setRecentWord(res.data));
    }catch(error){
        console.log('error',error);
    }
}

const deleteOneRecentWordDB = (wordId) => async (dispatch,getState,{history}) => {
    searchAPI.deleteRecentWord(wordId)
    .then(()=>{
        console.log('삭제되었습니다.');
        dispatch(deleteRecentWord(wordId));
    })
    .catch(error=>{
        console.log('error',error);
    })
}

const deleteAllRecentWordDB = () => async (dispatch,getState,{history}) => {
    searchAPI.deleteAll()
    .then(()=>{
        console.log('전부 삭제 완료');
        dispatch(deleteRecentAll());
    })
    .catch(error=>{
        console.log('error',error);
    })
}

export const searchActions = {
    getRequestResultDB,
    getAnswerResultDB,
    setRecentWordDB,
    deleteOneRecentWordDB,
    deleteAllRecentWordDB,
    initResult
};

export default search;