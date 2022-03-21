import axios from 'axios';
import { getToken } from './cookie';

//axios.defaults.withCredentials = true;

// 배포
axios.defaults.baseURL = 'https://gongbuhyeyum.shop';

// 로컬
// axios.defaults.baseURL = 'http://52.79.68.84';



const config = {
  headers:{
      'token': getToken(),
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
  userInfo : function (data) {
    return axios.post(`/api/userinfo`, data, config);
  },
  sameCheck: function(nickname) {
    return axios.post('/api/user/nickname',{nickname: nickname})
  }
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
    return axios.post('/api/post',data,config);
  },
  getOneRequestDB: function(postId){
    return axios.get(`/api/post/${postId}`);
  },
  getRequestAnswers: function(postId){
    return axios.get(`/api/answer/${postId}`);
  },
  pushLike: function(postId){
    return axios.post(`/api/post/like/${postId}`,'',config);
  },
  editRequest: function(postId,data){
    return axios.put(`/api/post/${postId}`,data,config);
  },
  concluseRequest: function(postId){
    return axios.post(`/api/post/${postId}`,'',config);
  }
}

export const answerAPI = {
  answering: function(data,postId) {
    return axios.post(`/api/answer/${postId}`,data, config);
  },
  editAnswer: function(data,answerId) {
    return axios.put(`/api/answer/${answerId}`,data, config);
  },
  deleteAnswer: function(answerId) {
    return axios.delete(`/api/answer/${answerId}`,config)
  },
  getAnswer: function (answerId) {
    return axios.get(`/api/answer/detail/${answerId}`);
  },
  getComment: function (answerId) {
    return axios.get(`/api/comment/answer/${answerId}`);
  },
  addComment: function(data) {
    return axios.post(`/api/comment/${data.answerId}`,{
      comment: data.comment,
      parentCommentId: data.parentCommentId,
      timestamp: data.timestamp
    },config);
  },
  editComment: function(data) {
    return axios.put(`/api/comment/${data.commentId}`,{
      content: data.comment,
      timestamp: data.timestamp
    },config);
  },
  removeComment: function(commentId) {
    return axios.delete(`/api/comment/${commentId}`,config);
  },
  pushLike: function(answerId) {
    return axios.post(`/api/answer/like/${answerId}`,'',config);
  },
  rating: function(data) {
    return axios.post(`/api/star/${data.answerId}`, {star:data.star}, config);
  }
}

export const childAPI = {
  getChilds: function(commentId) {
    return axios.get(`/api/comment/${commentId}`);
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
    return axios.get(`/api/survey`,config);
  },
  getRecommend: function(hippoName){
    return axios.get(`/api/survey/${hippoName}`,config)
  }
};

export const mypageAPI = {
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
  getMypageUserInfo: function () {
    return axios.get(`/api/mycount`, config);
  },
};

export const searchAPI = {
  getResultPost: function (searchWord) {
    return axios.get(`/api/postsearch/${searchWord}`, config);
  },
  getResultAnswer: function (searchWord) {
    return axios.get(`/api/answersearch/${searchWord}`, config);
  },
  getRecentWord: function (){
    return axios.get('/api/search',config);
  },
  deleteRecentWord: function (searchId){
    return axios.delete(`/api/search/${searchId}`,config);
  },
  deleteAll: function (){
    return axios.delete(`/api/search`,config);
  },
};

export const shortsAPI = {
  getShorts : function () {
    return axios.get(`/api/shorts`);
  },
};

export const alamAPI = {
  getAlams: function () {
    return axios.get(`/api/alarm`,config);
  },
  deleteOneAlam: function(alamId){
    return axios.delete(`/api/alarm/${alamId}`,config);
  },
  deleteAllAlam: function(){
    return axios.delete(`/api/alarm`,config);
  },
  checkAlam: function(){
    return axios.post(`/api/alarm`,'',config);
  },
  notReadCount: function(){
    return axios.get(`/api/alarmCount`,config);
  }
};