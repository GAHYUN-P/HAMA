import { createReducer, createAction } from '@reduxjs/toolkit';
import { imgAPI } from '../../shared/api';

export const initialState = {
  preview:[],
  files:[],
  videoPreview:'',
  videoFile:'',
};

// actions
const uploading = createAction('image/UPLOADING');
const setImage = createAction('image/SET_IMAGE');
const setVideo = createAction('image/SET_VIDEO');

// reducer
const image = createReducer(initialState,{
  [setImage]: (state,action) => {
    state.preview = [...state.preview,action.payload.preview];
    state.files = [...state.files,action.payload.file];
  },
  [setVideo]: (state,action) => {
    state.videoPreview = action.payload.prevideo;
    state.videoFile = action.payload.file;
  },
});

// middlewares
const uploadToDB = (file) => async (dispatch,getState,{history}) => {

}

export const imgActions = {
  uploadToDB,
  setImage,
  setVideo,
}

export default image;