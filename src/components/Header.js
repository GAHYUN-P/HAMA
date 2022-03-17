import React, { useEffect } from 'react';

import { useSelector,useDispatch } from 'react-redux';
import { history } from '../redux/configureStore';

import { getPage, NeedAlam } from '../shared/getPages';

import AlamBadge from './AlamBadge';

import { FiInfo, FiChevronLeft, FiSearch, FiBell, FiMoreHorizontal } from 'react-icons/fi';
import styled from 'styled-components';

const Header = (props) => {
  const pathname = window.location.pathname;
  const { is_what } =props;

  const GoBack = () => {
    history.goBack()
  }

  const GoSearch = () => {
    history.push('/search');
  }

  if(pathname === '/login'){
    return(
      <Grid onClick={GoBack} >
        x
      </Grid>
    )
  }

  if(pathname === '/mypage'){
    return(
      <MGrid>
        <FiChevronLeft onClick={GoBack} id='che'/>
        마이페이지
        <FiMoreHorizontal id='hor'/>
      </MGrid>
    )
  }

  if(pathname === '/'){
    return(
      <Grid>
        <div id='logo' >로고</div>
        <FiInfo id='info' />
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
      position: absolute;
      left: 1rem;
      bottom: 1rem;
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
