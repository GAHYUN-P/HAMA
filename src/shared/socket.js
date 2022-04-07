import Stomp from 'stompjs';
import SockJS from 'sockjs-client';

import { alarmActions } from '../redux/modules/alarm';

import { getToken,getUserId } from '../shared/cookie';

const sock = new SockJS('https://coin11.shop/ws-stomp');
// const sock = new SockJS('https://jumong.xyz/ws-stomp');
const ws = Stomp.over(sock);
const token = getToken();
const userId = getUserId();

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