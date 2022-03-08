import React, { useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import styled from 'styled-components';

const Medal = (props) => {

    // Mypage에서 Medal을 map을 돌려
    // value값에 따라서 return을 해줘 매달 색칠 아니면 색칠 ㄴㄴ로
    console.log(props);
  
  if(props.value === 0) {
    return (
      <div>
        메달 업서~
      </div>
    );
  }

  return (
    <div>
      메달 잇서~
    </div>
  );
};

export default Medal;