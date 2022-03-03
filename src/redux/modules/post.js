import { createReducer, createAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { deleteCookie, setCookie } from '../../shared/cookie';
import { postAPI, requestAPI } from '../../shared/api';


export const initialState = {
    list: [],
};

const setList = createAction('post/SETLIST');
// const tag = createAction('post/TAG');

const post = createReducer(initialState, {
    [setList] : (state, action) => {
        state.list = action.payload;
    },
});

// thunk

const makeRequest = (title,content,category,level) => async (dispatch, getState, {history}) => {
    try{
        const data = {title:title, content: content, category: category, level:level}
        const res = await requestAPI.makeRequest(data);
        // window.alert('요청작성 완료!')
    } catch (error) {
        console.log(error);
        alert(error.response.data.errorMessage);
    }
}

const getPostList = () => async (dispatch, getState, { history }) => {
    try {
      const res = await postAPI.getPostList();
      console.log(res.data);
      dispatch(setList(res.data));
    }
    catch (error) {
      console.log(error);
    }
  };



export const postActions = {
    setList,
    getPostList,
    makeRequest,
};

export default post;