import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { alamActions } from '../redux/modules/alam';
import { history } from '../redux/configureStore';

import Stomp from 'stompjs';
import SockJS from 'sockjs-client';

import { getToken, getUserId } from '../shared/cookie';
import { plzLogin } from '../shared/getPages';

import live_off from '../assets/live_alarm_off.svg';
import white_bell from '../assets/white_bell.svg';

import styled from 'styled-components';

const AlamBadge = (props) => {
    const dispatch = useDispatch();
    const { notReadCount } = useSelector(state => state.alam);
    const pathname = window.location.pathname;

    React.useEffect(()=>{
        if(getToken()){
          dispatch(alamActions.getNotReadCountDB());
        }
    },[])

    const sock = new SockJS('https://gongbuhyeyum.shop/ws-stomp');
    const ws = Stomp.over(sock);
    const token = getToken();
    const userId = getUserId();

    console.log(window);

    React.useEffect(()=>{
          if(getToken()){
            wsConnectSubscribe()
          }
          if(!getToken()){
            wsDisConnectUnsubscribe()
          }

        // return () => {
        // }
    },[]);

    function wsConnectSubscribe() {
        try {
          ws.connect(
            {
              token: token
            },
            () => {
              ws.subscribe(
                `/sub/alarm/user/${userId}`,
                (data) => {
                  const newMessage = JSON.parse(data.body);
                  dispatch(alamActions.addNotReadCount());
                  console.log(newMessage);
                },
                { token: token }
              );
            }
          );
        } catch (error) {
          console.log(error);
        }
      }

      function wsDisConnectUnsubscribe() {
        try {
          ws.disconnect(
            () => {
              ws.unsubscribe('sub-0');
            },
            { token: token }
          );
        } catch (error) {
          console.log(error);
        }
      }

    if(notReadCount){
        return(
            <React.Fragment>
                <Grid onClick={()=>{history.push('/alam')}} >
                    <LiveOff src={pathname === '/shorts' ? white_bell : live_off} />
                    <Count>{notReadCount > 9 ? 9 : notReadCount}</Count>
                </Grid>
            </React.Fragment>
        )
    }

    return(
        <React.Fragment>
            <Grid onClick={()=>{if(plzLogin()){return};history.push('/alam')}} >
                <LiveOff src={pathname === '/shorts' ? white_bell : live_off} />
            </Grid>
        </React.Fragment>
    )
}

const Grid = styled.div`
    position: relative;
    display: flex;
    align-items: center;
`;

const LiveOff = styled.img`
  width: 1.2rem;
`;

const Count = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: .6rem;
  height: .6rem;
  font-size: 8px;
  color: #fff;
  background-color: #f55;
  border-radius: .6rem;
  position: absolute;
  right: 0;
  top: 0;
`;

export default AlamBadge;