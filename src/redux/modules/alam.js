import { createReducer, createAction } from '@reduxjs/toolkit';
import { alamAPI } from '../../shared/api';

export const initialState = {
    today:[1],
    lastday:[],
    notCheck:'',
}

// actions
const setAlam = createAction('alam/setAlam');
const deleteAlam = createAction('alam/deleteAlam');
const deleteAll = createAction('alam/deleteAlam');
const setNotCheck = createAction('alam/setNotCheck')

// reducer
const alam = createReducer(initialState,{
    [setAlam]:(state,action) => {
        const {today,lastday} = action.payload;
        state.today = today;
        state.lastday = lastday;
    },
    [deleteAlam]:(state,action) => {
        const {type,alamId} = action.payload;
        if(type){
            state.today = state.today.filter((t)=>{return t.id !== alamId });
        }
        if(!type){
            state.today = state.today.filter((t)=>{return t.id !== alamId });
        }
    },
    [deleteAll]:(state,action) => {
        state.today = [];
        state.lastday = [];
    },
    [setNotCheck]:(state,action) => {
        state.notCheck = action.payload;
    },
})

const getAlamsDB = () => async (dispatch,getState,{history}) => {
    // 알람페이지 들어갈 시 받는 서버요청
};

const deleteAlamDB = () => async (dispatch,getState,{history}) => {
    // 알람페이지에서 하나 삭제 버튼 누를 시 박는 요청
};

const deleteAllDB = () => async (dispatch,getState,{history}) => {
    
};



export const alamActions = {
    getAlamsDB,
    deleteAlamDB,
    deleteAllDB,
}

export default alam