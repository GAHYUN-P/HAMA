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

  if(pathname === '/login/kakao'){
    return(
      <Grid onClick={()=>{history.goBack()}} >
        x
      </Grid>
    )
  }

  if(pathname === '/login/kakao'){
    return(
      <Grid onClick={()=>{history.goBack()}} >
        x
      </Grid>
    )
  }

  if(getPage(pathname).type === 'basic'){
    return(
      <Grid >
        
        {pathname === '/' && 
        <div>
          로고
        </div>}

        { pathname !== '/' &&
        <ChevronWrap onClick={()=>{history.goBack()}} >
          <FiChevronLeft />
        </ChevronWrap>}

        {!is_what &&
        <PageTitle>
          {getPage(pathname).title}
        </PageTitle>}
        {is_what &&
        <PageTitle>
          {is_what==='mypost' ? '내가 요청한 글':'내가 답변한 글'}
        </PageTitle>}

        <div style={{display:'flex'}} >

          { pathname === '/' &&
          <IconWrap>
            <FiInfo />
          </IconWrap>}

          { NeedAlam(pathname) &&
          <IconWrap>
            <AlamBadge />
          </IconWrap>}

          { NeedAlam(pathname) &&
          <IconWrap>
            <FiSearch onClick={()=>{history.push('/search')}} />
          </IconWrap>}
          
          {pathname === '/alam' && 
          <IconWrap>
            <FiBell />
          </IconWrap>}

          {pathname === '/mypage'  &&
          <IconWrap>
            <FiMoreHorizontal />
          </IconWrap>}

        </div>
      </Grid>
    )
  }

  return null
};

const Grid = styled.div`
  width: ${props => props.width ? props.width : '100%'};
  padding: ${({theme}) => theme.paddings.small} ${({theme}) => theme.paddings.xxl};
  display: flex;
  justify-content: space-between; 
  box-sizing: border-box;
`;

const ChevronWrap = styled.div`
  width: ${({theme}) => theme.paddings.xxl};
  height: ${({theme}) => theme.paddings.xxl};
  font-size: ${({theme}) => theme.fontSizes.lg};
  color: ${({theme}) => theme.colors.gray_1};
`;

const IconWrap = styled.div`
  width: ${({theme}) => theme.paddings.xxl};
  height: ${({theme}) => theme.paddings.xxl};
  margin-left: ${({theme}) => theme.margins.lg};
  font-size: ${({theme}) => theme.fontSizes.lg};
  color: ${({theme}) => theme.colors.gray_1};
  `;

const PageTitle =styled.div`
  font-size: ${({theme}) => theme.fontSizes.xl};
  color: ${({theme}) => theme.colors.black};
`;

export default Header;
