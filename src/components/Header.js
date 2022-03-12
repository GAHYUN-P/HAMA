import React, { useEffect } from 'react';

import { useSelector,useDispatch } from 'react-redux';

import { getPage } from '../shared/getPages';

import { FiChevronLeft } from 'react-icons/fi';
import styled from 'styled-components';

const Header = (props) => {
  const pathname = window.location.pathname;

  getPage(pathname);

  if(pathname === '/'){
    return(
      <Grid>
        x
      </Grid>
    )
  }

  if(getPage(pathname).type === 'basic'){
    return(
      <Grid fSize='1rem' padding='1rem' is_flex justifyContent='space-around' >
        <div>
          <FiChevronLeft />
        </div>
        <div style={{fontWeight:'800',color:'#000',fontSize:'1.25rem'}} >
          {getPage(pathname).title}
        </div>
        <div>
          {/* 정보,검색,알람 */}
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

export default Header;
