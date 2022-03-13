import React, { useEffect } from 'react';

import { history } from '../redux/configureStore';

import { getToken } from '../shared/cookie';
import { getFooter, getFixed } from '../shared/getPages';

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
  const pathname = window.location.pathname;
  
  if(getFooter(pathname)){
    return null
  }

  return (
    <Grid>
      {/* 홈 */}
      <Btn 
      onClick={()=>{
        if(getFixed(pathname)==='home'){return;}
        history.push('/home')
        console.log('작동')
      }}
      basic={ getFixed(pathname) === 'home' ? home : home_n} hover={home} />

      {/* 작성 */}
      <Btn 
      onClick={()=>{
        history.push('/request')
        console.log('작동')
      }}
      basic={write_n} hover={write} />

      {/* 쇼츠 */}
      <Btn 
      onClick={()=>{
        history.push('/shorts')
        console.log('작동')
      }}
      basic={shorts_n} hover={shorts} />

      {/* 평가하기 */}
      <Btn 
      onClick={()=>{console.log('작동')}}
      basic={estimate_n} hover={estimate} />
      
      {/* 마이페이지 */}
      <Btn 
      onClick={()=>{
        if(getFixed(pathname)==='mypage'){return;}
        history.push('/mypage')
        console.log('작동')
      }}
      basic={getFixed(pathname) === 'mypage' ? mypage : mypage_n } hover={mypage} />
    </Grid>
  );
};

const Grid = styled.div`
  background-color: #f5f5f5;
  padding-bottom: 1rem;
  width: 100%;
  height: 3.5rem;
  position: absolute;
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