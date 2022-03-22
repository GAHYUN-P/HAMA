import React from 'react';

import styled from 'styled-components';

// 리덕스
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../redux/modules/user';
import { history } from '../redux/configureStore';

// 채팅방 생성 창
const Popup = (props) => {
  const { closePopup, visible } = props;
  const dispatch = useDispatch();

  const popupInside = React.useRef();
  //  바깥 클릭시 팝업 끄기
  const clickOutside = ({ target }) => {
    if (!popupInside.current?.contains(target)) {
      closePopup()
    }
  }

  React.useEffect(() => {
    window.addEventListener("click", clickOutside);
    return () => {
      window.removeEventListener("click", clickOutside);
    };
  }, []);

  return (
    <PopupOverlay>
      <PopupInner ref={popupInside}>
        <Btn onClick={()=>{history.push('/notice')}} >공지사항</Btn>
        <Btn onClick={()=>{history.push('/developer')}} >개발자들</Btn>
        <Btn onClick={()=>{
          dispatch(userActions.logout())
          history.replace('/');
          }} >로그아웃</Btn>
      </PopupInner>
    </PopupOverlay >
  )

}


const PopupOverlay = styled.div`
  display: flex;
  justify-content: right;
  z-index: 1;
  width: 100%;
  height: 100vh;
  padding-top: 3rem;
  background-color: rgba(0, 0, 0, 0);
  position: absolute;
  top: 0;
  left: 0;
`;

const PopupInner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: .5rem;
  width: 11rem;
  height: 14rem;
  background-color: #fff;
  border-radius: .8rem;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.5);
`;

const Btn = styled.button`
  width: 100%;
  height: 100%;
  border: none;
  border-bottom: .1rem solid #dcdcdc;
  border-radius: .8rem;
  background-color: #fff;
  color: #ff7a7a;
  font-size: ${({theme})=> theme.fontSizes.lg};
  font-family: 'Noto-Sans-KR-M'
  &:active {
    color: #fff;
    background-color: #ff7a7a;
  }
`;

export default Popup;