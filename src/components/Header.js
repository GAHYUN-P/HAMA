import React, { useEffect } from 'react';

import { useSelector,useDispatch } from 'react-redux';
import { userActions } from '../redux/modules/user';
import { history } from '../redux/configureStore';

import { getPage, NeedAlam } from '../shared/getPages';

import AlamBadge from './AlamBadge';

import logo from '../assets/logo_final.svg';

import { FiInfo, FiChevronLeft, FiSearch, FiBell, FiMoreHorizontal } from 'react-icons/fi';
import {BsX} from 'react-icons/bs';
import styled from 'styled-components';

const Header = (props) => {
  const dispatch = useDispatch();
  const pathname = window.location.pathname;
  const { is_what } =props;

  const GoBack = () => {
    history.goBack()
  }

  const GoSearch = () => {
    history.push('/search');
  }

  const LogOut = () => {
    dispatch(userActions.logout());
  };

  if(pathname === '/login'){
    return(
      <Grid onClick={GoBack} >
        <BsX id='che' />
      </Grid>
    )
  }

  if(pathname === '/mypage' || pathname === '/mypage_achievement'){
    return(
      <MGrid>
        <FiChevronLeft onClick={GoBack} id='che'/>
        { pathname === '/mypage' ? '마이페이지' : '나의 업적' }
        <FiMoreHorizontal onClick={LogOut} id='hor'/>
      </MGrid>
    )
  }

  if(is_what){
    return(
      <Grid>
          <FiChevronLeft onClick={GoBack} id='che'/>
          {is_what === 'mypost' ? '내가 요청한 글' : '내가 답변한 글'}
          <div id='bell' >
            <AlamBadge/>
          </div>
          <FiSearch id='search' onClick={GoSearch} />
      </Grid>
  )
  }

  if(pathname === '/'){
    return(
      <Grid>
        <img id='logo' src={logo} />
        <FiInfo onClick={()=>{history.push('/login')}} id='info' />
        <div id='bell'><AlamBadge/></div>
        <FiSearch id='search' onClick={GoSearch} />
      </Grid>
    )
  }

  if(pathname === '/shorts'){
    return(
      <Grid color >
        <FiChevronLeft color onClick={GoBack} id='che'/>
        {getPage(pathname)}
        <div color id='bell'><AlamBadge/></div>
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

  if(pathname === '/alam'){
    return(
      <Grid>
        <FiChevronLeft color onClick={GoBack} id='che'/>
        {getPage(pathname)}
        <FiBell id='search' />
      </Grid>
    )
  }

  return (
    <Grid>
      <FiChevronLeft onClick={GoBack} id='che'/>
      {getPage(pathname)}
      { pathname.split('search').length < 2  &&
      <div id='bell' >
        <AlamBadge/>
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
    background-color: transparent;
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
