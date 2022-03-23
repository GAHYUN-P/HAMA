import React, { useState } from 'react';

import { useSelector,useDispatch } from 'react-redux';
import { userActions } from '../redux/modules/user';
import { history } from '../redux/configureStore';

import { getPage, NeedAlarm } from '../shared/getPages';

import AlarmBadge from './AlarmBadge';
import Popup from './Popup';

import logo from '../assets/logo_final.svg';

import { FiInfo, FiChevronLeft, FiSearch, FiBell, FiMoreHorizontal } from 'react-icons/fi';
import {BsX} from 'react-icons/bs';
import styled from 'styled-components';

const Header = (props) => {
  const dispatch = useDispatch();
  const { is_what, length, index } =props;
  const [open,setOpen] = useState(false);
  const pathname = window.location.pathname;

  const GoBack = () => {
    history.goBack()
  };

  const GoHome = () => {
    history.push('/')
  };

  const GoSearch = () => {
    history.push('/search');
  };


  if(pathname === '/login'){
    return(
      <Grid bc>
        <BsX onClick={GoBack} id='che'/>
      </Grid>
    )
  }

  if(pathname === '/notice' || pathname === '/developer'){
    return (
    <Grid>
        <FiChevronLeft color onClick={GoBack} id='che'/>
        { pathname === '/notice' ? '공지사항' : '개발자들' }
    </Grid>
    )
  }

  const closePopup = () => {
    setOpen(false);
  };

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

  if(pathname === '/userinfo'){
    return(
      <Grid>
        <FiChevronLeft color onClick={GoBack} id='che'/>
      </Grid>
    )
  }

  if(pathname === '/alarm'){
    return(
      <Grid>
        <FiChevronLeft onClick={GoBack} id='che'/>
        {getPage(pathname)}
        <FiBell id='search' />
      </Grid>
    )
  }

  if(pathname.split('/')[1] === 'images'){
    return (
      <Grid>
        <BsX onClick={GoBack} id='che'/>
        {(index + 1)}/{length}
      </Grid>
    )
  }

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
    font-size: ${({theme})=> theme.fontSizes.xl};
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
      bottom: 1rem;
    }
    #info{
      color: #7b7b7b;
      position: absolute;
      right: 5rem;
      bottom: 1rem;
    }
    #bell{
      color: ${props => props.color ? '#fff' : '#7b7b7b'};
      position: absolute;
      right: 2.93rem;
      bottom: .92rem;
    }
    #search{
      color: ${props => props.color ? '#fff' : '#7b7b7b'};
      position: absolute;
      right: 1rem;
      bottom: 1rem;
    }
`;

export default Header;