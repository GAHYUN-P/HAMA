import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { alamActions } from '../redux/modules/alam';

import { FiBell } from 'react-icons/fi';

import styled from 'styled-components';

const AlamBadge = (props) => {
    const dispatch = useDispatch();
    const { notReadCount } = useSelector(state => state.alam);

    React.useEffect(()=>{
        dispatch(alamActions.getNotReadCountDB());
    },[])

    // const sock = new SockJS('규진님이 주실 주소');
    // const ws = Stomp.over(sock);
    // const token = getToken();
    // const userId = getUserId();

    // React.useEffect(()=>{
    //     wsConnectSubscribe()
    //     return () => {
    //         wsDisConnectUnsubscribe()
    //     }
    // },[]);

    // function wsConnectSubscribe() {
    //     try {
    //       ws.connect(
    //         {
    //           token: token
    //         },
    //         () => {
    //           ws.subscribe(
    //             `구독해야할 주소${userId}`,
    //             (data) => {
    //               const newMessage = JSON.parse(data.body);
    //               dispatch(alamActions.addNotReadCount());
    //             },
    //             { token: token }
    //           );
    //         }
    //       );
    //     } catch (error) {
    //       console.log(error);
    //     }
    //   }

    //   function wsDisConnectUnsubscribe() {
    //     try {
    //       ws.disconnect(
    //         () => {
    //           ws.unsubscribe('sub-0');
    //         },
    //         { token: token }
    //       );
    //     } catch (error) {
    //       console.log(error);
    //     }
    //   }

    if(notReadCount){
        return(
            <React.Fragment>
                <Grid>
                    <FiBell />
                    <Count>{notReadCount}</Count>
                </Grid>
            </React.Fragment>
        )
    }

    return(
        <React.Fragment>
            <div>
                <FiBell />
            </div>
        </React.Fragment>
    )
}

const Grid = styled.div`
    position: relative;
`;

const Count = styled.p`
    position: absolute;
    color: coral;
    font-size: ${({theme}) => theme.fontSizes.small};
    left: 5px;
    top: -3px;
`;

export default AlamBadge;