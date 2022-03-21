import React from 'react';

import styled from 'styled-components';


// 리덕스
import { useDispatch, useSelector } from 'react-redux';

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
    if (!popupInside.current.contains(target)) {
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
        <button>공지사항</button>
        <button>개발자 정보</button>
        <button>로그아웃</button>
      </PopupInner>
    </PopupOverlay >
  )

}


const PopupOverlay = styled.div`
  ${(props) => props.theme.border_box};
  position: fixed;
  background-color: rgba(0, 0, 0, 0.6);
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 2;
`

const PopupInner = styled.div`
  ${(props) => props.theme.border_box};
  ${(props) => props.theme.flex_column};
  position: relative;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.5);
  width: 50%;
  height: 70%;
  background-color: whitesmoke;
  border-radius: 10px;
  top: 50%;
  margin: 0 auto;
  transform: translateY(-50%);
  @media ${(props) => props.theme.mobile} {
    width: 90%
  }

`

const PopupButtons = styled.div`
${(props) => props.theme.flex_row}
width: 80%;
margin: 0px 0px 20px 0px;
`

const InputWrap = styled.div`
${(props) => props.theme.flex_row}
justify-content: center;
  width: 80%;
  margin: 10px 0px 10px 0px;
`
const TagWrap = styled.div`
${(props) => props.theme.flex_row}
margin: 0px 5px;
  padding: 5px;
  font-size: 1rem;
  background-color: orange;
  border-radius: 10px;
  color: whitesmoke;
  & span{
    cursor: pointer;
    font-size: 10px;
    margin-left: 5px;
  }
  @media ${(props) => props.theme.mobile} {
    font-size: 0.7rem;
  }
`


export default Popup;