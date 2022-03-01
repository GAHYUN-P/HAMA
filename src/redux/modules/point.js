import { createReducer, createAction } from '@reduxjs/toolkit';
import axios from 'axios';

export const initialState = {
    point: 1,
};

const gainpoint = createAction('point/GAINPOINT')

const point = createReducer(initialState, {
  [gainpoint] : (state, action) => {
    state.point = action.payload;
  }
});

// thunk


export const pointActions = {
    gainpoint,
};

export default point;