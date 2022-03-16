import React, { useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import styled from 'styled-components';
import ProfileImg from '../elements/ProfileImg';

const Medal = (props) => {

    // Mypage에서 Medal을 map을 돌려
    // value값에 따라서 return을 해줘 매달 색칠 아니면 색칠 ㄴㄴ로
    console.log(props);
  
  if(props.value === 0) {
    return (
      <div>
        <ProfileImg shape='circle' size='3rem' src='https://png.pngtree.com/thumb_back/fh260/background/20210207/pngtree-gray-simple-gradient-background-image_557031.jpg'/>
      </div>
    );
  }

  return (
    <div>
      <ProfileImg shape='circle' size='3rem' src='https://minki-bucket.s3.ap-northeast-2.amazonaws.com/static/me.png'/>
    </div>
  );
};

export default Medal;