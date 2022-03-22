import { createReducer, createAction } from '@reduxjs/toolkit';
import { imgAPI } from '../../shared/api';

export const initialState = {
  preview:[],
  files:[],
  videoPreview:'',
  videoFile:'',
  uploading: false,
  videouploading: true,
  idx: 0,
};

// actions
const uploading = createAction('image/UPLOADING');
const videoUploading = createAction('image/videoUploading');
const setImage = createAction('image/SET_IMAGE');
const setEdit = createAction('image/SET_EDIT');
const setVideo = createAction('image/SET_VIDEO');
const delImage = createAction('image/DEL_IMAGE');
const editAnswer = createAction('image/EDIT_ANSWER');
const reset = createAction('image/reset');
const setIdx = createAction('image/SET_IDX');

// reducer
const image = createReducer(initialState,{
  [setImage]: (state,action) => {
    state.preview = [...state.preview,action.payload.preview];
    state.files = [...state.files,action.payload.file];
    if(state.preview.length === 5){
      state.uploading = true;
    }
  },
  [delImage]: (state,action) => {
    state.preview = state.preview.filter((p,i) => { return i !== action.payload})
    state.files = state.files.filter((p,i) => { return i !== action.payload})
    if(state.uploading){
      state.uploading = false;
    }
  },
  [setVideo]: (state,action) => {
    state.videoPreview = action.payload.prevideo;
    state.videoFile = action.payload.file;
    state.videouploading = true;
  },
  [setEdit]: (state,action) => {
    state.preview = action.payload;
    state.files = action.payload;
    console.log(action.payload);
    if(action.payload.length === 5){
      state.uploading = true;
    }
  },
  [editAnswer]: (state,action) => {
    state.preview = action.payload.file;
    state.files = action.payload.file;
    state.videoPreview = action.payload.video;
    state.videoFile = action.payload.video;
    if(action.payload.length === 5){
      state.uploading = true;
    }
  },
  [uploading]: (state,action) => {
    state.uploading = !state.uploading;
  },
  [videoUploading]: (state,action) => {
    state.videouploading = !state.videouploading;
  },
  [reset]: (state,action) => {
    state.preview = [];
    state.files = [];
    state.videoPreview = '';
    state.videoFile = '';
    state.uploading = false;
  },
  [setIdx]: (state,action) => {
    console.log(action.payload);
    state.idx = action.payload;
  },
});

// middlewares
const uploadToDB = (data) => async (dispatch,getState,{history}) => {
  try{
    const url = await imgAPI.fileUpload(data);
    console.log(url.data);
    const _data = {
      preview: url.data.file[0],
      file: url.data.file[0]
    }
    dispatch(setImage(_data));
  }catch(error){

  }
}

const uploadToVideo = (data) => async (dispatch,getState,{history}) => {
  try{
    dispatch(videoUploading());
    const url = await imgAPI.fileUpload(data);
    console.log(url.data.video);
    const _data = {
      prevideo: url.data.video,
      file: url.data.video
    }
    dispatch(setVideo(_data));
  }catch(error){

  }
}

export const imgActions = {
  uploadToDB,
  uploadToVideo,
  setImage,
  setVideo,
  delImage,
  setEdit,
  editAnswer,
  reset,
  setIdx,
}

export default image;