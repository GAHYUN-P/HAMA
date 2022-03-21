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

  // 방 생성하기
  // const onClickCreateRoom = () => {

  //   const data = {
  //     chatRoomImg: preview,
  //     chatRoomName: chatRoomName,
  //     category: Tags,
  //   }
  //   dispatch(utilActions.setPreview(null));
  //   dispatch(chatActions.createRoom(data, closePopup));
  // }

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
        <Btn onClick={()=>{dispatch(userActions.logout())}} >로그아웃</Btn>
      </PopupInner>
    </PopupOverlay >
  )

}


const PopupOverlay = styled.div`
  display: flex;
  justify-content: right;
  z-index: 1;
  width: 100%;
  height: 100%;
  padding-top: 3rem;
  background-color: rgba(0, 0, 0, 0.2);
  position: fixed;
  top: 0;
`;

const PopupInner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: .5rem;
  width: 16rem;
  height: 16rem;
  background-color: whitesmoke;
  border-radius: .8rem;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.5);
`;

const Btn = styled.button`
  width: 100%;
  height: 100%;
  border: none;
  border-bottom: .1rem solid #dcdcdc;
  border-radius: .8rem;
  background-color: #transparent;
  color: #ff7a7a;
  font-size: ${({theme})=> theme.fontSizes.lg};
  font-family: 'Noto-Sans-KR-M'
`;

export default Popup;