import React from 'react';

import styled from 'styled-components';

// 리덕스
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../redux/modules/user';
import { history } from '../redux/configureStore';

import { wsDisConnect } from '../shared/socket';

// 채팅방 생성 창
const Popup = (props) => {
  const dispatch = useDispatch();
  // 영역을 설정하기 위한 ref
  const popupInside = React.useRef();
  // 열린 팝업을 닫기위한 함수
  const { closePopup } = props;
  // 현재 상태에서 소켓과 연결되어있는지 체크하기위한 스테이트
  const { connected } = useSelector(state => state.alarm);

  // 로그아웃을 하기위한 함수
  const LogOut = () => {
    // 소켓과 연결되어 있다면 소켓 구독해지를 해주는 함수
    if(connected){
      wsDisConnect();
    }
    dispatch(userActions.logout());
    history.replace('/');
    window.location.href = '/';
  }

  // ref로 지정한 영역 외를 누르면 작동하는 함수
  const clickOutside = ({ target }) => {
    if (!popupInside.current?.contains(target)) {
      closePopup()
    }
  }

  // clickOutside를 이벤트 리스너 클릭으로 구독함
  React.useEffect(() => {
    window.addEventListener("click", clickOutside);
    return () => {
      window.removeEventListener("click", clickOutside);
    };
  }, []);

  return (
    <PopupOverlay>
      <PopupInner ref={popupInside}>
        <Btn borderR='.8rem .8rem 0 0' onClick={()=>{history.push('/notice')}} >공지사항</Btn>
        <Btn borderR='0 0 0 0' onClick={()=>{history.push('/developer')}} >개발자들</Btn>
        <Btn borderR='0 0 .8rem .8rem' onClick={LogOut} >로그아웃</Btn>
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
  border-radius: ${props => props.borderR};
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