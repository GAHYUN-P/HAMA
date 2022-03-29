import React, { useState } from 'react';

import { history } from '../redux/configureStore';

import { getPage } from '../shared/getPages';

import AlarmBadge from './AlarmBadge';
import Popup from './Popup';

import logo from '../assets/logo_final.svg';

import { FiInfo, FiChevronLeft, FiSearch, FiBell, FiMoreHorizontal } from 'react-icons/fi';
import {BsX} from 'react-icons/bs';
import styled from 'styled-components';

const Header = (props) => {
  // is_what: 유저의 요청글, 답변글 리스트 페이지를 분별하는 기준
  // length: 이미지뷰어의 전체 길이
  // index: 이미지 뷰어의 현재 이미지의 순서
  const { is_what, length, index } =props;
  // 마이페이지의 토글 버튼을 열기위한 스테이트
  const [open,setOpen] = useState(false);
  // 헤더가 어디서 불려왔는지 알기위한 기준이 되는 pathname
  const pathname = window.location.pathname;

  // 뒤로가기 버튼에 작동하는 함수
  const GoBack = () => {
    // 요청상세글에서 작동-> 아예 메인페이지로 보냄
    if(pathname.split('/')[1] === 'requestdetail' ){
      GoHome();
      return
    }
    history.goBack()
  };
  
  // 메인페이지로 보내는 함수
  const GoHome = () => {
    history.push('/')
  };

  // 검색페이지로 보내는 함수
  const GoSearch = () => {
    history.push('/search');
  };

  // 로그인 페이지에서 나오는 헤더 
  if(pathname === '/login'){
    return(
      <Grid bc>
        <BsX onClick={GoBack} id='che'/>
      </Grid>
    )
  }
  // 공지사항과 개발자 페이지에서 나오는 헤더
  if(pathname === '/notice' || pathname === '/developer'){
    return (
    <Grid>
        <FiChevronLeft color onClick={GoBack} id='che'/>
        { pathname === '/notice' ? '공지사항' : '개발자들' }
    </Grid>
    )
  }

  // 토글 버튼들을 닫아주는 함수
  const closePopup = () => {
    setOpen(false);
  };
  // 마이페이지와 나의 업적 페이지에서 나오는 헤더
  if(pathname === '/mypage' || pathname === '/mypage_achievement'){
    return(
      <React.Fragment>
      <MGrid>
        <FiChevronLeft onClick={pathname === '/mypage' ? GoHome : GoBack} id='che'/>
        { pathname === '/mypage' ? '마이페이지' : '나의 업적' }
        <FiMoreHorizontal onClick={()=>{setOpen(true)}} id='hor'/>
      </MGrid>
        {open && <Popup visible={open} closePopup={closePopup} />}
      </React.Fragment>
    )
  }

  // 유저상세 페이지에서 나오는 헤더
  if(pathname.split('/')[1] === 'userpage'){
    return(
      <React.Fragment>
        <MGrid>
        <FiChevronLeft onClick={GoBack} id='che'/>
        유저 페이지
      </MGrid>
      </React.Fragment>
    )
  }

  // 유저가 작성한 글 목록 페이지에서 나오는 헤더
  if(is_what){
    return(
      <Grid>
          <FiChevronLeft onClick={GoBack} id='che'/>
          {is_what === 'mypost' ? '내가 요청한 글' : '내가 답변한 글'}
          <div id='bell' >
            <AlarmBadge/>
          </div>
          <FiSearch id='search' onClick={GoSearch} />
      </Grid>
  )
  }

  // 메인페이지에서 나오는 헤더
  if(pathname === '/'){
    return(
      <Grid>
        <img id='logo' src={logo} />
        <FiInfo onClick={()=>{history.push('/notice')}} id='info' />
        <div id='bell'><AlarmBadge/></div>
        <FiSearch id='search' onClick={GoSearch} />
      </Grid>
    )
  }

  // 쇼츠페이지에서 나오는 헤더
  if(pathname === '/shorts'){
    return(
      <Grid color >
        <FiChevronLeft color onClick={GoBack} id='che'/>
        {getPage(pathname)}
        <div color id='bell'><AlarmBadge/></div>
        <FiSearch color id='search' onClick={GoSearch} />
      </Grid>
    )
  }

  // 유저 개인정보를 작성하는 페이지에서 나오는 헤더
  if(pathname === '/userinfo'){
    return(
      <Grid>
        <FiChevronLeft color onClick={GoBack} id='che'/>
      </Grid>
    )
  }

  // 알림페이지에서 나오는 헤더
  if(pathname === '/alarm'){
    return(
      <Grid>
        <FiChevronLeft onClick={GoBack} id='che'/>
        {getPage(pathname)}
        <FiBell id='search' />
      </Grid>
    )
  }

  // 이미지 상세페이지에서 나오는 헤더
  // 이 때 length와 index를 사용함
  if(pathname.split('/')[1] === 'images'){
    return (
      <Grid>
        <BsX onClick={GoBack} id='che'/>
        {(index + 1)}/{length}
      </Grid>
    )
  }

  // 특이케이스를 제외한 페이지들에서 나오는 헤더
  // 이 때 페이지 별로 이름을 주기위하여 getPage로 얻어옴
  return (
    <Grid>
      <FiChevronLeft onClick={GoBack} id='che'/>
      {getPage(pathname)}
      { pathname.split('search').length < 2  &&
      <div id='bell' >
        <AlarmBadge/>
      </div>}
      { pathname.split('search').length < 2 &&
      <FiSearch id='search' onClick={GoSearch} />}
    </Grid>
  )
};

const MGrid = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 3rem;
  font-size: ${({theme})=> theme.fontSizes.xl};
  font-weight: lighter;
  color: #fff; 
  background-color: transparent;
  #che{
    font-size: ${({theme})=> theme.fontSizes.xxxxxl};
    position: absolute;
    left: -1rem;
    bottom: .5rem;
  }
  #hor{
    font-size: ${({theme})=> theme.fontSizes.xxxxxl};
    position: absolute;
    right: -1rem;
    bottom: .5rem;
  }
`;

const Grid = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 3rem;
    font-size: ${({theme})=> theme.fontSizes.xxxl};
    color: ${props => props.color ? '#fff' : '#212121'}; 
    background-color: ${props=>props.bc ? '#4e4e4e':'transparent'};
    #logo{
      width: 2.3rem;
      position: absolute;
      left: .8rem;
      bottom: .7rem;
    }
    #che{
      color: ${props => props.color ? '#fff' : '#7b7b7b'};
      position: absolute;
      left: 1rem;
      bottom: .8rem;
    }
    #info{
      color: #7b7b7b;
      position: absolute;
      right: 5.5rem;
      bottom: .8rem;
    }
    #bell{
      color: ${props => props.color ? '#fff' : '#7b7b7b'};
      position: absolute;
      right: 3.1rem;
      bottom: .78rem;
    }
    #search{
      color: ${props => props.color ? '#fff' : '#7b7b7b'};
      position: absolute;
      right: 1rem;
      bottom: .84rem;
    }
`;

export default Header;