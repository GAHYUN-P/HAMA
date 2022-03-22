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
const setAlarm = createAction('alam/setAlam');
const deleteAlarm = createAction('alam/deleteAlam');
const deleteAll = createAction('alam/deleteAll');
const readingCheck = createAction('alam/readingCheck');
const getNewAlarm = createAction('alam/getNewAlam');
const setNotReadCount = createAction('alam/setNotReadCount');
const addNotReadCount = createAction('alam/addNotReadCount')

// reducer
const alarm = createReducer(initialState,{
    [setAlarm]:(state,action) => {
        state.alams = action.payload;
    },
    [getNewAlarm]:(state,action) => {
        state.alams = [action.payload,...state.alams];
    },
    [deleteAlarm]:(state,action) => {
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

const getAlarmsDB = () => async (dispatch,getState,{history}) => {
    alamAPI.getAlams()
    .then(res => {
        console.log(res.data)
        dispatch(setAlarm(res.data));
    })
    .catch(err=>{
        console.log('error',err)
    })
};

const deleteAlarmDB = (alamId) => async (dispatch,getState,{history}) => {
    alamAPI.deleteOneAlam(alamId)
    .then(()=>{
        console.log(alamId);
        dispatch(deleteAlarm(alamId));
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

const checkAlarmDB = () => async (dispatch,getState,{history}) => {
    alamAPI.checkAlam()
    .then(()=>{
       dispatch(setNotReadCount(0))
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

export const alarmActions = {
    getAlarmsDB,
    deleteAlarmDB,
    deleteAllDB,
    checkAlarmDB,
    getNotReadCountDB,
    getNewAlarm,
    addNotReadCount,
}

export default alarm;