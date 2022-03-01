import { createReducer, createAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { deleteCookie, setCookie } from '../../shared/cookie';
import { userAPI } from '../../shared/api';

export const initialState = {
    rank: 1,
    nickname: "hyun",
    status: "up",
    is_changed: true,
};

const setRank = createAction('rank/UPDATERANK')

const rank = createReducer(initialState, {
    [setRank] : (state, action) => {
        state.rank = action.payload;
      }
});

// thunk

export const rankActions = {
    setRank,
};

export default rank;