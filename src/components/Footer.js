import React from 'react';

import { history } from '../redux/configureStore';

import { plzLogin } from '../shared/getPages';

import home_n from '../assets/home_n.svg'
import home from '../assets/home.svg'
import write_n from '../assets/write-n.svg'
import write from '../assets/write.svg'
import shorts_n from '../assets/shorts-n.svg'
import shorts from '../assets/shorts.svg'
import estimate_n from '../assets/estimate_n.svg'
import estimate from '../assets/estimate.svg'
import mypage_n from '../assets/mypage_n.svg'
import mypage from '../assets/mypage.svg'


import styled from 'styled-components';

const Footer = (props) => {
  // 현재 불려와진 페이지의 주소명을 얻어옮
  // 이를 얻어온 이유는 푸터가 현재 있는 위치가 
  // 메인페이지나 마이페이지라면 이를 고정해주어야 하기 때문
  const pathname = window.location.pathname;

  return (
    <Grid>
      {/* 홈 */}
      <Btn 
      onClick={()=>{
        // 현재 주소가 메인페이지라면 작동하지않음
        if(pathname==='/'){return;}
        history.push('/')
      }}
      // 현재 주소가 메인페이지라면 입력되는 이미지는 호버시의 이미지와 같음
      basic={ pathname === '/' ? home : home_n} hover={home} />

      {/* 작성 */}
      <Btn 
      onClick={()=>{
        if(plzLogin()){return}
        history.push('/request')
      }}
      basic={write_n} hover={write} />

      {/* 쇼츠 */}
      <Btn 
      onClick={()=>{
        history.push('/shorts')
      }}
      basic={shorts_n} hover={shorts} />

      {/* 평가하기 */}
      <Btn 
      onClick={()=>{window.open('https://forms.gle/THNpyEqo8vUbc82m9')}}
      basic={estimate_n} hover={estimate} />
      
      {/* 마이페이지 */}
      <Btn 
       // 현재 주소가 마이페이지라면 작동하지않음
      onClick={()=>{
        // 로그인 하지않으면 접근불가 로그인 페이지로 이동시켜줌
        if(plzLogin()){return}
        if(pathname === '/mypage'){return;}
        history.push('/mypage')
      }}
      // 현재 주소가 마이페이지라면 입력되는 이미지는 호버시의 이미지와 같음
      basic={pathname === '/mypage' ? mypage : mypage_n } hover={mypage} />
    </Grid>
  );
};

const Grid = styled.div`
  z-index: 1;
  background-color: #f5f5f5;
  padding-bottom: 1rem;
  width: 100%;
  max-width: 412px;
  height: 4.5rem;
  position: fixed;
  bottom: 0;
`;

const Btn = styled.div`
  display: inline-block;
  width: 20%;
  height: 3.8rem;
  background-image: url(${props => props.basic});
  background-size: cover;
  &:hover{
    background-image: url(${props => props.hover});
  }
`;

export default Footer;