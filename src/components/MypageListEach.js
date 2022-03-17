import React, { useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import styled from 'styled-components';
import { categoryEncoder } from '../shared/categoryEncoder';

const MypageListEach = (props) => {

    console.log(props);
    const idx = props.idx;


    
  return (
    <div>
      <Container>
        <Category>{categoryEncoder(props.category)}</Category>
        <TitleWrap>
          <Title onClick>{props.title}</Title>
          <Content>{props.contents}</Content>
        </TitleWrap>
        <div>{props.modifiedAt}</div>
        <div>♡ {props.like}</div>
      </Container>
      {idx === 0 &&
        <hr style={{border: '0.1px solid #E6E6E6'}}/>
      }
    </div>
  );
};

const Container = styled.div`
  width: 100%;
  height: 5vh;
  display: flex;
  justify-content: space-between;
  margin: ${({ theme }) => theme.margins.base} 0px;
`;

const Category = styled.div`
  width: 20%;
`;

const TitleWrap = styled.div`
  width: 45%;
`;

const Title = styled.div`
  font-family: 'Noto-Sans-KR-M';
`;

const Content = styled.div`
  color: #666666;
`;

export default MypageListEach;