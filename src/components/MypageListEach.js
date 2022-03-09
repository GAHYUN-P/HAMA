import React, { useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import styled from 'styled-components';

const MypageListEach = (props) => {

    console.log(props);
    
  return (
    <div>
      {props.title} | {props.modifiedAt}
    </div>
  );
};

export default MypageListEach;