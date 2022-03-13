import { createReducer, createAction } from '@reduxjs/toolkit';

import { alamAPI } from '../../shared/api';

export const initialState = {
    alams:'',
}

// actions
const setAlam = createAction('alam/setAlam');
const deleteAlam = createAction('alam/deleteAlam');
const deleteAll = createAction('alam/deleteAlam');
const readingCheck = createAction('alam/readingCheck');
const getNewAlam = createAction('alam/getNewAlam');

// reducer
const alam = createReducer(initialState,{
    [setAlam]:(state,action) => {
        state.alams = action.payload;
    },
    [getNewAlam]:(state,action) => {
        state.alams = [...state.alams,action.payload];
    },
    [deleteAlam]:(state,action) => {
       state.alams = state.alams.filter(a=>{return a.id !== action.payload })
    },
    [deleteAll]:(state,action) => {
        state.alams = [];
    },
    [readingCheck]:(state,action) => {
        state.alams = state.alams.map((a)=>{
            if(a.id === action.payload){
                return {...a, reading:'Y'}
            }
            return a
        })
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

const checkAlamDB = (alamId) => async (dispatch,getState,{history}) => {
    alamAPI.checkAlam(alamId)
    .then(()=>{
        dispatch(readingCheck(alamId));
        console.log('읽었습니다.');
    })
    .catch(err=>{
        console.log(err => {
            console.log('error',err);
        })
    })
}


export const alamActions = {
    getAlamsDB,
    deleteAlamDB,
    deleteAllDB,
    checkAlamDB,
    getNewAlam,
}

export default alam