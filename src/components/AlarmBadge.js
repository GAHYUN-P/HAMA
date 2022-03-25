import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { alarmActions } from '../redux/modules/alarm';
import { history } from '../redux/configureStore';

import { wsAlarm } from '../shared/socket';
import { getToken } from '../shared/cookie';
import { plzLogin } from '../shared/getPages';

import live_off from '../assets/live_alarm_off.svg';
import white_bell from '../assets/white_bell.svg';

import styled from 'styled-components';

const AlarmBadge = (props) => {
    const dispatch = useDispatch();
    const { notReadCount, connected } = useSelector(state => state.alarm);
    const pathname = window.location.pathname;

    React.useEffect(()=>{
        if(getToken()){
          dispatch(alarmActions.getNotReadCountDB());
        }
        if(getToken()&&!connected){
          wsAlarm(dispatch)
          dispatch(alarmActions.setConnected());
        }
    },[])

    if(notReadCount){
        return(
            <React.Fragment>
                <Grid onClick={()=>{history.push('/alarm')}} >
                    <LiveOff src={pathname === '/shorts' ? white_bell : live_off} />
                    <Count>{notReadCount > 9 ? 9 : notReadCount}</Count>
                </Grid>
            </React.Fragment>
        )
    }

    return(
        <React.Fragment>
            <Grid onClick={()=>{if(plzLogin()){return};history.push('/alarm')}} >
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
  width: 1.5rem;
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

export default AlarmBadge;