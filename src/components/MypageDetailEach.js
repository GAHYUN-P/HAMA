import React, { useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import styled from 'styled-components';
import ProfileImg from '../elements/ProfileImg';
import { history } from '../redux/configureStore';

const MypageDetailEach = (props) => {

  let is_what = useSelector((state)=>state.mypage.is_what);

  const onClickhandler = () => {
    if(is_what === 'mypost') {
      history.push(`/requestdetail/${props.id}`);
    }
    if(is_what === 'myanswer') {
      history.push(`/answerdetail/${props.id}`);
    }
  }
  
    
  return (
      <Wrap>
        {props.img &&
          <ProfileImg shape='square' src={props.img} size='3rem'/>
        }
        <TitleWrap>
          <Title onClick={onClickhandler}>{props.title}</Title>
          <Minitext>
            <div>{props.nickname}</div>
            <div>{props.category}</div>
            <div>{props.modifiedAt}</div>
          </Minitext>
        </TitleWrap>
      </Wrap>
  );
};

const Wrap = styled.div`
  width: 100%;
  padding: 1rem ${({ theme }) => theme.paddings.default};
  display: flex;
  border-bottom: 1px solid #EFEFEF;
  height: 10vh;
  justify-content: space-between;
`;

const TitleWrap = styled.div`
  width: 80%;
  margin-top: 0.5rem;
`;

const Title = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.lg};
`;

const Minitext = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.small};
  color: #9E9E9E;
  display: flex;
  justify-content: space-between;
  width: 70%;
  margin-top: 0.2rem;
`;

export default MypageDetailEach;