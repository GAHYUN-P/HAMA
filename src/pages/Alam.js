import React from "react";

import { useDispatch, useSelector } from "react-redux";
import alam, { alamActions } from "../redux/modules/alam";

import AlamCard from "../components/AlamCard";
import Header from '../components/Header';

import Stomp from 'stompjs';
import SockJS from 'sockjs-client';

import { getToken, getUserId } from "../shared/cookie";

const Alam = (props) => {
    const dispatch = useDispatch();
    const { alams } = useSelector(state => state.alam);

    const sock = new SockJS('http://dean900404.shop/ws-stomp');
    const ws = Stomp.over(sock);
    const token = getToken();
    const userId = getUserId();

    React.useEffect(()=>{
        dispatch(alamActions.getAlamsDB());
        dispatch(alamActions.checkAlamDB());
    },[])

    React.useEffect(()=>{
        // wsConnectSubscribe()
        // return () => {
        //     wsDisConnectUnsubscribe()
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
                `http://dean900404.shop/${userId}`,
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

    if(!alams){
        return (
            <React.Fragment>
                <Header />
                <div>
                    잠시만 기다려주세요.
                </div>
            </React.Fragment>
        )
    }

    return(
        <React.Fragment>
            <Header />
            <div style={{width:'90%',height:'100%',margin:'auto',padding:'1rem 0'}} >
               
                <div style={{width:'100%', margin:'0 0 2rem'}} >
                    {/* 삭제 버튼 */}
                    <div style={{display:'flex',justifyContent:'space-between'}} >
                        <div></div>
                        {alams.length !==0 && 
                        <button onClick={delAll} style={{border:'none',backgroundColor:'#fff'}} >전체삭제</button>}
                    </div>

                    {/* 알림 들어가는 곳 */}
                    {alams.length !==0 && 
                    <div>
                        {alams.map((a,i)=>{
                            return <AlamCard key={i} {...a} />
                        })}
                    </div>}

                    {/* 알람이 없을 때 */}
                    {alams.length === 0 && 
                    <div>
                        알람이 없습니다.
                    </div> }
                </div>

            </div>
        </React.Fragment>
    )
}

export default Alam;