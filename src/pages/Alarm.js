import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { alarmActions } from "../redux/modules/alarm";

import AlarmCard from "../components/AlarmCard";
import Header from '../components/Header';

import styled from "styled-components";

const Alarm = (props) => {
    const dispatch = useDispatch();
    // 알람들의 리스트
    const { alams } = useSelector(state => state.alarm);

    React.useEffect(()=>{
      // 페이지로 들어올 때 알람 정보들을 dispatch
        dispatch(alarmActions.getAlarmsDB());
        return()=>{
          // 페이지를 나갈 때 알람을 읽었다는 dispatch
          dispatch(alarmActions.checkAlarmDB());  
        }
    },[])

    // 모든 알람을 삭제하는 요청을 하는 함수
    const delAll = () => {
        dispatch(alarmActions.deleteAllDB());
    }

    // 알람이 없을경우 보여줄 페이지
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