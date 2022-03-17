import React from "react";

import { useDispatch, useSelector } from "react-redux";
import alam, { alamActions } from "../redux/modules/alam";

import AlamCard from "../components/AlamCard";
import Header from '../components/Header';

import Stomp from 'stompjs';
import SockJS from 'sockjs-client';

import { getToken, getUserId } from "../shared/cookie";

import styled from "styled-components";

const Alam = (props) => {
    const dispatch = useDispatch();
    const { alams } = useSelector(state => state.alam);

    const sock = new SockJS('http://15.165.18.176/ws-stomp');
    const ws = Stomp.over(sock);
    const token = getToken();
    const userId = getUserId();

    React.useEffect(()=>{
        dispatch(alamActions.getAlamsDB());
        dispatch(alamActions.checkAlamDB());
    },[])

    React.useEffect(()=>{
        wsConnectSubscribe()
        return () => {
            wsDisConnectUnsubscribe()
        }
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
                  dispatch(alamActions.getNewAlam(newMessage));
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

    const delAll = () => {
        dispatch(alamActions.deleteAllDB());
    }

    if(!alams || alams.length === 0){
        return (
            <React.Fragment>
                <Header />
                <div>
                   아직 알람이 없습니다.
                </div>
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
                      return <AlamCard key={i} {...a} />
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

export default Alam;