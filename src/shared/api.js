import axios from 'axios';
import { getToken } from './cookie';

//axios.defaults.withCredentials = true;

// 민기님 서버
axios.defaults.baseURL = 'http://3.36.53.246';

// 규진님 서버
// axios.defaults.baseURL = 'http://dean900404.shop/';

// 재균님 서버
// axios.defaults.baseURL = 'http://13.124.171.147';



const token = document.cookie.split('=')[1];

const config = {
  headers:{
      'token':getToken(),
  }
}

const uploadconfig = {
  headers:{
    'token': getToken(),
    'Content-Type': 'multipart/form-data'
  }
}

/* const openApi = axios.create();
openApi.defaults.withCredentials=false;
const token = `KakaoAK 08f47c215f89ea20492b07610fc231dc`
 */
export const userAPI = {
  login: function (data) {
    return axios.post('/api/user/login', data);
  },
  loginByKakao: function (data) {
    return axios.post('/api/user/kakaoLogin', data);
  },
  logout: function () {
    return axios.post('/user/logout');
  },
  signup: function (data) {
    return axios.post(`/api/user/signup`, data);
  },
  emailCheck: function (data) {
    return axios.post(`/api/user/idcheck`, data);
  },
  findPassword: function (data) {
    return axios.post('/api/user/findPassword', data);
  },
  updatePassword: function (data) {
    return axios.put('/api/user/changePassword', data);
  },
  getUserProfile: function () {
    return axios.get('/api/user/profile', config);
  },
  updateUserProfile: function (userId, data) {
    return axios.put(`/api/user/profile/${userId}`, data);
  },
  getAllUserList: function (data) {
    return axios.get(`/api/user`);
  },
};

export const chatAPI = {
  createRoom: function (data) {
    return axios.post(`/api/chat/rooms`, data);
  },
  outRoom: function (roomId) {
    return axios.delete(`/api/chat/rooms/${roomId}`);
  },
  inviteRoom: function (data) {
    return axios.post(`/api/chat/invite`, data);
  },
  getChatList: function () {
    return axios.get(`/api/chat/rooms`, config);
  },
  getChatMessages: function (roomId) {
    return axios.get(`/api/chat/rooms/${roomId}/messages`, config);
  },
  selectCategory: function (category) {
    return axios.get(`/api/chat/rooms/search/${category}`);
  },
  connectChat: function (roomId) {
    return axios.post(`/api/chat/rooms/${roomId}`, config);
  },
};

export const postAPI = {
  getPostList: function () {
    return axios.get(`/api/post`);
  },
  selectPostCategory: function (category) {
    return axios.get(`/api/post/category/${category}`);
  },
  selectPostSort: function (tag, sort) {
    return axios.get(`/api/post/category/${tag}/${sort}`);
  },
};

export const requestAPI = {
  makeRequest: function(data) {
    return axios.post('/api/post',data,config)
  },
  getOneRequestDB: function(postId){
    return axios.get(`/api/post/${postId}`)
  },
  getRequestAnswers: function(postId){
    return axios.get(`/api/answer/${postId}`)
  },
  pushLike: function(postId){
    return axios.post(`/api/post/like/${postId}`)
  }
}

export const answerAPI = {
  answering: function(data,postId) {
    return axios.post(`/api/answer/${postId}`,data,config)
  },
  getAnswer: function (answerId) {
    return axios.get(`/api/answer/detail/${answerId}`)
  },
  getComment: function (answerId) {
    return axios.get(`/api/comment/${answerId}`)
  },
  addComment: function(data) {
    return axios.post(`/api/comment/${data.answerId}`,{
      comment: data.comment,
      parentCommentId: data.parentCommentId
    },config)
  },
  editComment: function(commentId,comment) {
    return axios.put(`/api/comment/${commentId}`,{content: comment},config)
  },
  removeComment: function(commentId) {
    return axios.delete(`/api/comment/${commentId}`,config)
  },
  pushLike: function(answerId) {
    return axios.post(`/api/answer/like/${answerId}`,config)
  },
  rating: function(data) {
    return axios.post(`/api/star/${data.answerId}`,{star:data.star})
  }
}

export const imgAPI = {
  fileUpload: function (data) {
    return axios.post('/api/upload',data,uploadconfig);
  }
}

export const utilAPI = {
  getRank: function () {
    return axios.get(`/api/rank`);
  },
  submitSurvey: function (data) {
    return axios.post(`/api/survey`, data, config);
  },
  getSurveyResult: function () {
    return axios.get(`/api/survey`, config);
  },
  getAchievement: function () {
    return axios.get(`/api/achievement`, config);
  },
  getBannerInfo: function () {
    return axios.get(`/api/mybanner`, config);
  },
  getMypostList: function () {
    return axios.get(`/api/mypost`, config);
  },
  getMyanswerList: function () {
    return axios.get(`/api/myanswer`, config);
  },
};
