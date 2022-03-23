import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { alarmActions } from "../redux/modules/alarm";

import AlarmCard from "../components/AlarmCard";
import Header from '../components/Header';

import Stomp from 'stompjs';
import SockJS from 'sockjs-client';

import { getToken, getUserId } from "../shared/cookie";

import styled from "styled-components";

const Alarm = (props) => {
    const dispatch = useDispatch();
    const { alams } = useSelector(state => state.alarm);

    React.useEffect(()=>{
        dispatch(alarmActions.getAlarmsDB());
        return()=>{
          dispatch(alarmActions.checkAlarmDB());  
        }
    },[])

    const delAll = () => {
        dispatch(alarmActions.deleteAllDB());
    }

    if(!alams || alams.length === 0){
        return (
            <React.Fragment>
                <Header />
                <NoAlarm>
                   아직 알람이 없습니다.
                </NoAlarm>
            </React.Fragment>
        )
    }

    return(
          <React.Fragment>
              <Header />
              <GreyBar />
              <Grid>
              {/* 삭제 버튼 */}
              <BtnGrid style={{display:'flex',justifyContent:'right'}} >
                  {alams.length !==0 && 
                  <DelBtn onClick={delAll}>
                    전체삭제
                  </DelBtn>}
              </BtnGrid>
              <div>
                  {alams.map((a,i)=>{
                      return <AlarmCard key={i} {...a} />
                  })}
              </div>
              </Grid>
          </React.Fragment>
    )
}

const Grid = styled.div`
  padding: 0 ${({theme})=> theme.paddings.default} 0;
`;

const GreyBar = styled.div`
  height: .7rem;
  background-color: #f7f7f7;
`

const BtnGrid = styled.div`
  display: flex;
  justify-content: right;
  padding: ${({theme})=> theme.paddings.default} 0 .2rem;
`;

const DelBtn = styled.button`
  border: none;
  color: #666;
  background-color: #fff;
`;

const NoAlarm = styled.div`
  color: #666666;
  margin-top: 20vh;
  text-align: center;
`;

export default Alarm;