import { createReducer, createAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { deleteCookie, setCookie } from '../../shared/cookie';
import { shortsAPI } from '../../shared/api';

export const initialState = {
    shortsList: '',
    shorts: {
        videoUrl: "",
        title: "",
        nickname: "",
        profileUrl: "",
        answerId: null,
    },
};


const setShortsList = createAction('shorts/SETSHORTSLIST');
const addOneShort = createAction('shorts/ADDONESHORT');

const shorts = createReducer(initialState, {
    [setShortsList] : (state, action) => {
        console.log(action.payload);
        state.shortsList = [...action.payload];
      },
    [addOneShort] : (state, action) => {
        console.log(action.payload);
        state.shortsList.push(action.payload);
      },
});

// thunk


const getShort = () => async (dispatch, getState, { history }) => {
    try {
      const res1 = await shortsAPI.getShorts();
      const res2 = await shortsAPI.getShorts();
      const res3 = await shortsAPI.getShorts();
      dispatch(setShortsList([res1.data, res2.data, res3.data]));
    }
    catch (error) {
      console.log(error);
    }
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
};

export default shorts;