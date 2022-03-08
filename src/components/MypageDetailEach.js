import React, { useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import styled from 'styled-components';

const MypageDetailEach = (props) => {

    console.log(props);
    
  return (
    <div>
      <img src={props.imgUrl}/>
      {props.title} | {props.modifiedAt} | {props.category}
    </div>
  );
};

export default MypageDetailEach;