import { createReducer, createAction } from '@reduxjs/toolkit';

import { alamAPI } from '../../shared/api';
// alarmId ,id, senderNickName, type, title, modifiedAt, readingStatus
export const initialState = {
    alams:[{
        alarmId: 0,
        id: 0,
        senderNickName:'mango',
        type: 'answer',
        title:'춘식이가 고구마 먹어주세요!!',
        modifiedAt:'47분전',
        readingStatus:'Y',
    }],
    notReadCount: 0,
}

// actions
const setAlam = createAction('alam/setAlam');
const deleteAlam = createAction('alam/deleteAlam');
const deleteAll = createAction('alam/deleteAll');
const readingCheck = createAction('alam/readingCheck');
const getNewAlam = createAction('alam/getNewAlam');
const setNotReadCount = createAction('alam/setNotReadCount');
const addNotReadCount = createAction('alam/addNotReadCount')

// reducer
const alam = createReducer(initialState,{
    [setAlam]:(state,action) => {
        state.alams = action.payload;
    },
    [getNewAlam]:(state,action) => {
        state.alams = [action.payload,...state.alams];
    },
    [deleteAlam]:(state,action) => {
        console.log(action.payload);
       state.alams = state.alams.filter(a => {return a.alarmId !== action.payload })
    },
    [deleteAll]:(state,action) => {
        state.alams = [];
    },
    [readingCheck]:(state,action) => {
        state.alams = state.alams.map((a)=>{
            if(a.reading === 'N'){
                return {...a, reading:'Y'}
            }
            return a
        })
    },
    [setNotReadCount]:(state,action) => {
        state.notReadCount = action.payload;
    },
    [addNotReadCount]:(state,action) => {
        state.notReadCount = state.notReadCount + 1;
    },
})

const getAlamsDB = () => async (dispatch,getState,{history}) => {
    alamAPI.getAlams()
    .then(res => {
        console.log(res.data)
        dispatch(setAlam(res.data));
    })
    .catch(err=>{
        console.log('error',err)
    })
};

const deleteAlamDB = (alamId) => async (dispatch,getState,{history}) => {
    alamAPI.deleteOneAlam(alamId)
    .then(()=>{
        console.log(alamId);
        dispatch(deleteAlam(alamId));
        console.log('삭제완료');
    })
    .catch(err=>{
        console.log('error',err);
    })
};

const deleteAllDB = () => async (dispatch,getState,{history}) => {
    alamAPI.deleteAllAlam()
    .then(()=>{
        dispatch(deleteAll());
    })
    .catch(err => {
        console.log('error',err);
    })
};

const checkAlamDB = () => async (dispatch,getState,{history}) => {
    alamAPI.checkAlam()
    .then(()=>{
        console.log('읽었습니다.');
    })
    .catch(err=>{
        console.log(err => {
            console.log('error',err);
        })
    })
}

const getNotReadCountDB = () => async (dispatch,getState,{history}) => {
    alamAPI.notReadCount()
    .then(res=>{
        dispatch(setNotReadCount(res.data.alarmCount));
    })
    .catch(err=>{
        console.log('error',err);
    })
}

export const alamActions = {
    getAlamsDB,
    deleteAlamDB,
    deleteAllDB,
    checkAlamDB,
    getNotReadCountDB,
    getNewAlam,
    addNotReadCount,
}

export default alam