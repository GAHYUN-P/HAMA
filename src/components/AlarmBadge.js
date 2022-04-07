import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { alarmActions } from '../redux/modules/alarm';
import { history } from '../redux/configureStore';

import { wsAlarm } from '../shared/socket';
import { getToken } from '../shared/cookie';
import { plzLogin } from '../shared/getPages';

import live_off from '../assets/live_alarm_off.svg';
import white_bell from '../assets/white_bell.svg';

import Div from '../elements/Div';

import styled from 'styled-components';

const AlarmBadge = (props) => {
    const dispatch = useDispatch();
    // notReadCount: 읽지않은 알람의 갯수를 나타내기위한 스테이트
    // connected: 소켓과의 연결상태를 나타내는 스테이트
    const { notReadCount, connected } = useSelector(state => state.alarm);
    // 쇼츠일 경우 종모양 아이콘의 색깔이 달라져야 하기에 사용하는 pathname
    const pathname = window.location.pathname;

    React.useEffect(()=>{
        // 로그인 시 해당 유저의 읽지않은 알람의 갯수를 요청하는 dispatch
        if(getToken()){
          dispatch(alarmActions.getNotReadCountDB());
        }
        // 로그인 상태이며 연결되지않은 상태일 때 요청하는 함수
        // wsAlarm: 소켓에 연결을 하는 함수 안에서 사용하기 위해 dispatch를 변수로 받음
        if(getToken()&&!connected){
          wsAlarm(dispatch)
          dispatch(alarmActions.setConnected());
        }
    },[])

    return(
      <React.Fragment>
        <Div _onClick={()=>{if(plzLogin()){return};history.push('/alarm')}} >
          <LiveOff src={pathname === '/shorts' ? white_bell : live_off} />
          { notReadCount !== 0 &&
          <Div display='flex' justify='center' items='center' width='.6rem' height='.6rem' fontSize='8px' color='#fff' bc='#f55' Bradius='.6rem' position='absolute' top='0'  right='0'>
            {notReadCount > 9 ? 9 : notReadCount}
          </Div>}
        </Div>
      </React.Fragment>
    )
};

const LiveOff = styled.img`
  width: 1.5rem;
`;

export default AlarmBadge;