import React, { useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import styled from 'styled-components';
import ProfileImg from '../elements/ProfileImg';

const Medal = (props) => {

    // Mypage에서 Medal을 map을 돌려
    // value값에 따라서 return을 해줘 매달 색칠 아니면 색칠 ㄴㄴ로
    console.log(props);
    const idx = props.idx;

    const imgArr = [
      'https://minki-bucket.s3.ap-northeast-2.amazonaws.com/static/medetail.png',
      'https://minki-bucket.s3.ap-northeast-2.amazonaws.com/static/satisfieddetail.png',
      'https://minki-bucket.s3.ap-northeast-2.amazonaws.com/static/inquiredetail.png',
      'https://minki-bucket.s3.ap-northeast-2.amazonaws.com/static/congratudetail.png',
      'https://minki-bucket.s3.ap-northeast-2.amazonaws.com/static/analyzedetail.png',
      'https://minki-bucket.s3.ap-northeast-2.amazonaws.com/static/reactiondetail.png',
      'https://minki-bucket.s3.ap-northeast-2.amazonaws.com/static/searchdetail.png',
      'https://minki-bucket.s3.ap-northeast-2.amazonaws.com/static/moreeffortdetail.png',
    ];
    
  
  if(props.value === 0) {
    return (
      <Contain>
        <ProfileImg shape='circle' size='3rem' bgColor='#EEEEEE'/>
      </Contain>
    );
  }

  return (
    <Contain>
      <ProfileImg shape='circle' size='3rem' src={imgArr[idx]}/>
    </Contain>
  );
};

const Contain = styled.div`
  margin-left: 2rem;
  margin-bottom: 1rem;
  display: inline-block;
`;

export default Medal;