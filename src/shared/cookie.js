const getCookie = (name) => {
  let value = '; ' + document.cookie;
  let parts = value.split(`; ${name}=`);

  if (parts.length === 2) {
    return parts.pop().split(';').shift();
  }
};

// 유저 고유 아이디 가져오기
const getUserId = () => {
  const userId = document.cookie.split('userId=')[1];
  return userId;
}

// 유저 닉네임 가져오기
const getUserName = () => {
  const userName = document.cookie.split('username=')[1].split(';')[0];
  return userName;
}

// 유저 토큰 가져오기
const getToken = () => {
  const token = document.cookie.split('=')[1].split(';')[0];
  return token;
}

const setCookie = (name, value, exp = 5) => {
  let date = new Date();
  date.setTime(date.getTime() + exp * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value}; expires=${date.toUTCString()}`;
};

const deleteCookie = (name) => {
  let date = new Date('2020-01-01').toUTCString();

  document.cookie = `${name}=; expires=${date}`;
};

export { getCookie, setCookie, deleteCookie, getUserId, getUserName, getToken };
