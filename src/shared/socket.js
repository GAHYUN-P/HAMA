import Stomp from 'stompjs';
import SockJS from 'sockjs-client';

import { alarmActions } from '../redux/modules/alarm';

import { getToken,getUserId } from '../shared/cookie';

const sock = new SockJS('https://gongbuhyeyum.shop/ws-stomp');
const ws = Stomp.over(sock);
const token = getToken();
const userId = getUserId();
const pathname = window.location.pathname;

const wsAlarm = (dispatch) => {
    try {
      ws.connect(
        {token: token},
        () => {
          ws.subscribe(
            `/sub/alarm/user/${userId}`,
            (data) => {
              const newMessage = JSON.parse(data.body);
              console.log(newMessage);
              if(pathname === '/alarm'){
                  dispatch(alarmActions.getNewAlarm(newMessage));
              }
              if(pathname !== '/alarm'){
                  dispatch(alarmActions.addNotReadCount());
              }
            },
            { token: token }
            );
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

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

export { wsAlarm, wsDisConnect }