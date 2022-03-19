import React from 'react';
// 소켓 통신
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';
// 리덕스
import { useDispatch, useSelector } from 'react-redux';
import { history } from '../redux/configureStore';
// 쿠키
import { getCookie } from '../shared/cookie';
// 채팅 관련 함수들 가져오기
import { chatActions } from '../redux/modules/chat';


const EnterChattingBtn = (props) => {
  // 소켓 통신 객체
  const sock = new SockJS('http://15.164.219.84/chatting');
  const ws = Stomp.over(sock);

  // 토큰
  const token = getCookie('access-token');
  const dispatch = useDispatch();

  // 방 제목 가져오기
  const roomName = useSelector((state) => state.chat.currentChat.roomName);
  const roomId = props.roomId;

  // 렌더링 될 때마다 연결,구독 다른 방으로 옮길 때 연결, 구독 해제
  React.useEffect(() => {
    wsConnectSubscribe();
    return () => {
    //   wsDisConnectUnsubscribe();
    };
  }, [roomId]);
      
  // 웹소켓 연결, 구독
  function wsConnectSubscribe() {
    try {
      ws.connect(
        {
          token: token
        },
        () => {
          ws.subscribe(
            `/sub/api/chat/rooms/${roomId}`,
            (data) => {
              const newMessage = JSON.parse(data.body);
              dispatch(chatActions.getMessages(newMessage));
            },
            { token: token }
          );
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

//   // 연결해제, 구독해제
//   function wsDisConnectUnsubscribe() {
//     try {
//       ws.disconnect(
//         () => {
//           ws.unsubscribe('sub-0');
//         },
//         { token: token }
//       );
//     } catch (error) {
//       console.log(error);
//     }
//   }

  const onClickChat = () => {
      history.push('/chat');
  }

  return (
      <button onClick={onClickChat}>
          채팅방 입장
      </button>
  )
};

export default EnterChattingBtn;