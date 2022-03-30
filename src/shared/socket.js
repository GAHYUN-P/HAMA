import Stomp from 'stompjs';
import SockJS from 'sockjs-client';

import { alarmActions } from '../redux/modules/alarm';

import { getToken,getUserId } from '../shared/cookie';

// 소켓을 서버와 연결하기 위한 준비들
// 소켓과 연결할 서버 지정
const sock = new SockJS('https://jumong.xyz/ws-stomp');
// 소켓과 브라우저의 stomp를 연결
const ws = Stomp.over(sock);
// 유저를 식별하기 위한 토큰
const token = getToken();
// destination을 나누기 위한 해당 유저의 아이디
const userId = getUserId();

// 유저 개인이 소켓을 구독하는 함수
// react요소로 만든 것이 아니기 때문에
// 따로 dispatch를 사용할 수 없었기에 
// 해당함수를 호출하는 react요소에 dispatch를
// 선언하여 인자로 받아와 사용함 
const wsAlarm = (dispatch) => {
    try {
      ws.connect(
        {token: token},
        () => {
          ws.subscribe(
            `/sub/alarm/user/${userId}`,
            (data) => {
              const newMessage = JSON.parse(data.body);
                  dispatch(alarmActions.getNewAlarm(newMessage));
            },
            { token: token }
            );
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  // 유저 개인이 소켓 구독을 해제하는 함수
const wsDisConnect = () => {
    try {
      ws.disconnect(
        () => {
          ws.unsubscribe("sub-0");
        },
        { token: token }
      );
    } catch (error) {
      console.log(error);
    }
  };

export { wsAlarm, wsDisConnect };