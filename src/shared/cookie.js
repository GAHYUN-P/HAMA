const getCookie = (name) => {
  let value = '; ' + document.cookie;
  let parts = value.split(`; ${name}=`);

  if (parts.length === 2) {
    return parts.pop().split(';').shift();
  }
};

// 유저 고유 아이디 가져오기
const getUserId = () => {
  if(document.cookie){
    let userId = document.cookie.split('userId=')[1].split(';')[0];

    return Number(userId);
  }
  return null;
}

// 유저 토큰 가져오기
const getToken = () => {
  if(document.cookie){
    const token = document.cookie.split('=')[1].split(';')[0];
    return token;
  }
  return null;
}

// 유저가 개인정보를 입력했는지 여부가 담긴 status가져오기
const getStatus = () => {
  if(document.cookie){
    let status = document.cookie.split('userStatus=')[1].split(';')[0];
    console.log(status)
    status = status === 'true' ? true : false
    return status;
  }
  return null;
}

const setFalse = (exp = 5) => {
  let date = new Date('2020-01-01').toUTCString();
  document.cookie = `userStatus=; expires=${date}`;
  
  let _date = new Date();
  _date.setTime(_date.getTime() + exp * 24 * 60 * 60 * 1000);
  document.cookie = `userStatus=false; path=/; expires=${_date.toUTCString()}`;
  
  return null
};

const setCookie = (name, value, exp = 5) => {
  console.log('setcookie');
  let date = new Date();
  date.setTime(date.getTime() + exp * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value}; path=/; expires=${date.toUTCString()}`;
};

const deleteCookie = (name) => {
  let date = new Date('2020-01-01').toUTCString();

  document.cookie = `${name}=; expires=${date}`;
};

export { 
  getCookie, 
  setCookie, 
  deleteCookie, 
  getUserId, 
  getToken, 
  getStatus, 
  setFalse,
 };