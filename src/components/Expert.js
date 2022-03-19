import React, { useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import styled from 'styled-components';
import ProfileImg from '../elements/ProfileImg';

const Expert = (props) => {

    // Mypage에서 Medal을 map을 돌려
    // value값에 따라서 return을 해줘 매달 색칠 아니면 색칠 ㄴㄴ로
    console.log(props);
    const idx = props.idx;
    const img = 'https://minki-bucket.s3.ap-northeast-2.amazonaws.com/static/'+ `${props.value}` + '.svg'
    console.log(img);

  return (
    <Contain>
      <ProfileImg shape='square' size='2.5rem' src={img}/>
    </Contain>
  );
};

const Contain = styled.div`
  /* position: absolute; */
  display: inline-block;
`;

export default Expert;