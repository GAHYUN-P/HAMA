import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Header from '../components/Header';

import styled from 'styled-components';

import { userActions } from '../redux/modules/user';
import { KAKAO_JS_ID } from '../shared/common';

import kakao_login from '../assets/kakao_login.svg';
import hama from '../assets/rehama.png';
import logoS from '../assets/logo_string.png';
import logoF from '../assets/logo_final.svg';

import KaKaoLogin from 'react-kakao-login';
import { utilActions } from '../redux/modules/util';

// 로그인 페이지 컴포넌트
const Login = ({ history, match }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      // 로그인 에러가 있다면 null 처리
      dispatch(userActions.setLoginError(null));
    };
  }, []);

  // 카카오 로그인
  const kakaoLoginSuccessHandler = (res) => {
    const data = res.response;
    // 카카오 로그인 후 받아온 토큰
    dispatch(
      userActions.loginByKakao({
        kakaoToken: data.access_token
      })
    );
    dispatch(utilActions.setPopupOpen(true));
  };

  return (
    <React.Fragment>
    <Header />
    <Grid>  
      <div style={{width:'100%',height:'4rem'}} />
      <MakeCenter>
        <LoginPic width='30%' src={logoF} />
      </MakeCenter>
      <div style={{width:'100%',height:'1rem'}} />
      <MakeCenter>
        <LoginPic width='50%' src={logoS} />
      </MakeCenter>
      <div style={{width:'100%',height:'2rem'}} />
      <MakeCenter>
        <KaKaoLogin token={KAKAO_JS_ID}
          //카카오에서 할당받은 jsKey를 입력
          render={(props) => (<KakaoButton src={kakao_login} onClick={props.onClick} />)}
          //로그인 버튼의 text를 입력
          onSuccess={kakaoLoginSuccessHandler}
          //성공했을때 불러올 함수로서 fetch해서 localStorage에 저장할 함수를 여기로 저장
          getProfile={true}/>
      </MakeCenter>
      <HamaCenter>
        <LoginPic width='100%' src={hama} />
      </HamaCenter>
    </Grid>
    </React.Fragment>
  );
};

const Grid = styled.div`
  position: relative;
  height: 100vh;
  align-items: center;
  padding: 0 ${({theme})=> theme.paddings.default} 0;
  background-color: #4e4e4e;
  overflow: hidden;
`;

const LoginPic = styled.img`
  width: ${props => props.width};
`;

const MakeCenter = styled.div`
  display: flex;
  justify-content: center;
`;

const HamaCenter = styled.div`
  display: flex;
  justify-content: center;
  transform: rotate(10deg);
`;

const KakaoButton = styled.img`
  cursor: pointer;
  width: 70%;
  height: 3.5rem;
`;

export default Login;

// const Title = styled.div`
//   display: flex;
//   padding: 15rem ${({theme})=> theme.paddings.default} 5rem;
//   justify-content: center;
//   font-weight: 800;
//   font-size: 1.5rem;
// `;

// const SearchPassword = styled.span`
//   margin: 0.5rem 0;
//   cursor: pointer;
//   width: 100%;
//   text-align: right;
//   padding-right: 0.5rem;
//   color: gray;
//   font-size: 0.75rem;
// `;

// const Container = styled.div`
//   width: 300px;
//   height: 100%;
//   ${(props) => props.theme.flex_column};
//   justify-content: center;
// `;


//  1
// {/* <Wrapper margin="0.5rem 0">
// <Input
//   _onChange={onChangeEmail}
//   placeholder="이메일을 입력해주세요"
// ></Input>
// </Wrapper>
// <Input
// type="password"
// value={password}
// is_submit
// onSubmit={onLogin}
// _onChange={onChangePassword}
// placeholder="비밀번호를 입력해주세요"
// ></Input>
// <Wrapper margin="0.5rem 0">
// <SearchPassword onClick={() => history.push('/findPassword')}>
//   비밀번호 찾기
// </SearchPassword>
// </Wrapper>
// <Wrapper margin="0.5rem 0">
// <ErrorMsg valid={loginError}>{loginError}</ErrorMsg>
// </Wrapper> */}

//  2
// {/* <Wrapper margin="0.5rem 0">
//             <Button disabled={!email || !password} _onClick={onLogin}>
//               로그인
//             </Button>
//           </Wrapper>
//           <Wrapper>
//             <Button _onClick={() => history.push('/signup')}>회원가입</Button>
//           </Wrapper> */}

// 3
// {/* {username && (
//         <Wrapper is_column>
//           {username}님 환영합니다
//           <Wrapper margin="1rem 0">
//             <Button _onClick={() => history.push('/chat')}>
//               채팅방으로 입장
//             </Button>
//           </Wrapper>
//         </Wrapper>
//       )} */}