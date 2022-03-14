import React, { useEffect } from 'react';

import { useSelector,useDispatch } from 'react-redux';
import { history } from '../redux/configureStore';

import { getPage, NeedAlam } from '../shared/getPages';

import AlamBadge from './AlamBadge';

import { FiInfo, FiChevronLeft, FiSearch, FiBell, FiMoreHorizontal } from 'react-icons/fi';
import styled from 'styled-components';

const Header = (props) => {
  const pathname = window.location.pathname;
  const {is_what} =props; 

  if(pathname === '/'){
    return(
      <Grid onClick={()=>{history.goBack()}} >
        x
      </Grid>
    )
  }

  if(getPage(pathname).type === 'basic'){
    return(
      <Grid fSize='1rem' padding='1rem' is_flex justifyContent='space-around' >
        
        {pathname === '/home' && 
        <div>
          로고
        </div>}

        { pathname !== '/home' &&
        <div onClick={()=>{history.goBack()}} >
          <FiChevronLeft />
        </div>}

        {!is_what &&
        <PageTitle style={{fontWeight:'800',color:'#000',fontSize:'1.25rem'}} >
          {getPage(pathname).title}
        </PageTitle>}
        {is_what &&
        <PageTitle style={{fontWeight:'800',color:'#000',fontSize:'1.25rem'}} >
          {is_what==='mypost' ? '내가 요청한 글':'내가 답변한 글'}
        </PageTitle>}

        <div style={{display:'flex'}} >

          { pathname === '/home' &&
          <div style={{padding:'0 1rem 0 0'}} >
            <FiInfo />
          </div>}

          { NeedAlam(pathname) &&
           <AlamBadge />}

          { NeedAlam(pathname) &&
          <div style={{padding:'0 0 0 1rem'}} >
            <FiSearch onClick={()=>{history.push('/search')}} />
          </div>}
          
          {pathname === '/alam' && 
          <div>
            on/off
          </div>}

          {pathname === '/mypage'  &&
          <div  style={{padding:'0 0 0 1rem'}} >
            <FiMoreHorizontal />
          </div>}

        </div>
      </Grid>
    )
  }

  return null
};

const Grid = styled.div`
  width: ${props => props.width ? props.width : '100%'};
  font-size: ${props => props.fSize ? props.fSize : '2rem'};
  color: ${props => props.color ? props.color : '#9e9e9e'};
  padding: ${props => props.padding ? props.padding : '0.7rem 2rem'};
  ${props => props.is_flex ? `display: flex;` : ''}
  justify-content: space-between; 
  ${props => props.justifyContent ? `justify-content: ${props => props.justifyContent};` : ''}
  box-sizing: border-box;
`;

const PageTitle =styled.div`
  font-size: ${({ theme })=>theme.fontSizes.titleSize};
`;

export default Header;
