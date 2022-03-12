import React, { useEffect } from 'react';

import { useSelector,useDispatch } from 'react-redux';

import styled from 'styled-components';

const Header = (props) => {
  const { type } = props;
  const state = window.location.pathname;

  console.log(state);

  if(state === '/'){
    return(
      <Grid>
        x
      </Grid>
    )
  }

  if(state==='/request'){
    return(
      <Grid fSize='1rem' padding='1rem' >
        뒤로가기
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
  box-sizing: border-box;
`;

export default Header;
