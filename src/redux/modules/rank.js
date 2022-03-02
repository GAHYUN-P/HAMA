import { createReducer, createAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { deleteCookie, setCookie } from '../../shared/cookie';
import { utilAPI } from '../../shared/api';

export const initialState = {
    data: [],
};


const setRank = createAction('rank/UPDATERANK')

const rank = createReducer(initialState, {
    [setRank] : (state, action) => {
        state.data = action.payload;
      }
});

// thunk
// 랭크 조회
const getRankList = () => async (dispatch, getState, { history }) => {
    try {
      const res = await utilAPI.getRank();
      console.log(res.data);
      dispatch(setRank(res.data));
    }
    catch (error) {
      console.log(error);
    }
  };

export const rankActions = {
    setRank,
    getRankList,
};

export default rank;