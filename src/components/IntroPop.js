import React from 'react';

import styled, {keyframes} from 'styled-components';
import { IoChevronDown } from "react-icons/io5";
import { IoClose } from "react-icons/io5";


// 리덕스
import { useDispatch, useSelector } from 'react-redux';

// 채팅방 생성 창
const IntroPop = (props) => {
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

    <PopupOverlay >
      <Close>
        <IoClose/>
      </Close>
      <Intro ref={popupInside}>
          내가HAMA를 통해<br/>
          먹방, 겜방, 브이로그 등<br/>
          서로 대리만족을<br/>
          채워줘볼까요 :)
      </Intro>
      <IntroNav>
        '요청하기'를 눌러서 요청을 작성해보세요!<br/>
        '숏츠'를 눌러서 대리만족 영상 미리보기를<br/> 해보세요!
      </IntroNav>
      <Arrow>
        <IoChevronDown/>
      </Arrow>
    </PopupOverlay >
  )

}


const PopupOverlay = styled.div`
  position: absolute;
  background-color: rgba(0, 0, 0, 0.6);
  top: 0%;
  right: 0%;
  bottom: 0%;
  left: 0%;
  width: 100%;
  height: 100%;
  z-index: 2;
`

const Close = styled.div`
    position: absolute;
    top: 1rem;
    right: 1rem;
    font-size: 2rem;
    color: white;
`;

const Intro = styled.div`
    position: relative;
    font-size: 2rem;
    font-family: 'Noto-Sans-KR-M';
    line-height: 3rem;
    color: white;
    margin: 8rem 3rem;
`;

const IntroNav = styled.div`
    position: absolute;
    font-size: 1rem;
    color: white;
    bottom: 8rem;
    margin: 0px 2rem;
    padding: 1rem;
    border: 1px solid #FF7A7A;
    border-radius: 10px;
    line-height: 1.5rem;
`;

const move = keyframes`
	0% {
      opacity: 1; 
    }
    50% {
      opacity: 0.5;
    }
    100% {
      opacity: 1;
    }
`;

const Arrow = styled.div`
    position: absolute;
    font-size: 3rem;
    color: #FF7A7A;
    bottom: 4.5rem;
    margin: 0px 6.5rem;
    animation: ${move} 2s 1s infinite;
`;


export default IntroPop;