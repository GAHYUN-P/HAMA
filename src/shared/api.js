import axios from 'axios';
import { getToken } from './cookie';

//axios.defaults.withCredentials = true;

// 민기님 서버
axios.defaults.baseURL = 'http://15.164.219.84';

// 규진님 서버
// axios.defaults.baseURL = 'http://dean900404.shop/';


const token = document.cookie.split('=')[1];

const config = {
  headers:{
      'token':getToken(),
  }
}

const postingconfig = {
  headers:{
    'token': getToken(),
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
  getUserProfile: function (data) {
    return axios.get('/api/user/profile');
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
    return axios.get(`/api/chat/rooms`);
  },
  getChatMessages: function (roomId) {
    return axios.get(`/api/chat/rooms/${roomId}/messages`);
  },
  selectCategory: function (category) {
    return axios.get(`/api/chat/rooms/search/${category}`);
  }
};

export const postAPI = {
  getPostList: function () {
    return axios.get(`/api/post`);
  },
  selectPostCategory: function (category) {
    return axios.get(`/api/post/category/${category}`);
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
  getAnswer: function (answerId) {
    return axios.get(`/api/answer/detail/${answerId}`)
  },
  getComment: function (answerId) {
    return axios.get(`/api/answer/${answerId}`)
  },
  addComment: function(answerId,comment) {
    return axios.post(`/api/comment/${answerId}`,{comment: comment},config)
  },
  editComment: function(commentId,comment) {
    return axios.put(`/api/comment/${commentId}`,{comment: comment},config)
  },
  removeComment: function(commentId) {
    return axios.delete(`/api/comment/${commentId}`,config)
  },
  pushLike: function(answerId) {
    return axios.post(`/api/answer/like/${answerId}`,config)
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
    return axios.get(`/api/achievement`);
  },
  getBannerInfo: function () {
    return axios.get(`/api/mybanner`, config);
  },
  
};
