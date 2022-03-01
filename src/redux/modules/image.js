import { createReducer, createAction } from '@reduxjs/toolkit';

export const initialState = {
  preview: [],
  files: [],
};

const uploading = createAction('image/UPLOADING');
const setPreview = createAction('image/SET_PREVIEW');
const setFiles = createAction('image/SET_FILES');

const image = createReducer(initialState,{
  [setPreview]: (state,action) => {
    state.preview = [...state.preview, action.payload];
  },
  [setFiles]: (state, action) => {
    state.files = [...state.files, action.payload];
  },
})

export const imgActions = {
  setPreview,
  setFiles,
}

export default image;