import { createReducer, createAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { deleteCookie, setCookie } from '../../shared/cookie';
import { shortsAPI } from '../../shared/api';
import { StompSocketState } from '@stomp/stompjs';

export const initialState = {
    shortsList: [],
    shorts: {
        videoUrl: "",
        title: "",
        nickname: "",
        profileUrl: "",
        answerId: null,
    },
    idx: 0,
    is_loading: false,
};


const setShortsList = createAction('shorts/SETSHORTSLIST');
const addOneShort = createAction('shorts/ADDONESHORT');
const setIdx = createAction('shorts/SETIDX');
const isLoading = createAction('shorts/SETISLOADING');

const shorts = createReducer(initialState, {
    [setShortsList] : (state, action) => {
        console.log(action.payload);
        state.shortsList = [...action.payload];
      },
    [addOneShort] : (state, action) => {
        console.log(action.payload);
        state.shortsList.push(action.payload);
      },
    [setIdx] : (state, action) => {
        console.log(action.payload);
        state.idx = action.payload;
      },
    [isLoading] : (state, action) => {
        console.log(action.payload);
        state.is_loading = action.payload;
      },
});

// thunk


const getShort = () => async (dispatch, getState, { history }) => {
    try {
      dispatch(isLoading(true));
      const res1 = await shortsAPI.getShorts();
      const res2 = await shortsAPI.getShorts();
      const res3 = await shortsAPI.getShorts();
      dispatch(setShortsList([res1.data, res2.data, res3.data]));
      console.log(getState().shorts.shortsList);
    }
    catch (error) {
      console.log(error);
    }
    dispatch(isLoading(false));
  };

const addShort = () => async (dispatch, getState, { history }) => {
    try {
      const res = await shortsAPI.getShorts();
      dispatch(addOneShort(res.data));
    }
    catch (error) {
      console.log(error);
    }
  };

export const shortsActions = {
    getShort,
    addShort,
    setIdx,
    isLoading,
};

export default shorts;