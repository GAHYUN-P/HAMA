import { createReducer, createAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { deleteCookie, setCookie } from '../../shared/cookie';
import { postAPI } from '../../shared/api';

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


export const postActions = {
    setList,
    // getPostList,
};

export default post;