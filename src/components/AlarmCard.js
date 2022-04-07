import React from "react";

import { useDispatch } from "react-redux";
import { alarmActions } from "../redux/modules/alarm";

import { setAlamContent, MoveTo } from "../shared/setAlamcontent";
import { typeEncoder } from "../shared/categoryEncoder";

import {BsX} from 'react-icons/bs';

import Div from "../elements/Div";

const AlarmCard = (props) => {
    const dispatch = useDispatch();
    // 해당 컴포넌트는 map으로 불려옴
    // alarmId: 해당 알람의 아이디, 삭제요청을 위해 사용
    // id: 각 알람의 게시물로 이동하기 위해 각 게시물의 아이디를 받아옴
    // alarmType: 각 알림이 무엇을 알리는지 가르쳐주는 역할,
    // 어떠한 페이지로 이동해야 하는지 식별하기 위해 사용함
    // readingStatus: 해당 알람을 읽었는지 식별하기위한 역할,
    // 알람카드의 css를 결정하는 스테이터스임
    const { alarmId ,id, alarmType, readingStatus } = props;

    // 알람에 해당하는 페이지로 이동하는 함수
    // MoveTo: 어디로 이동하는지 판단하기 위한 함수
    // *자세한 것은 setAlamcontent를 확인
    const Move=()=>{MoveTo(alarmType,id);}

    // 알람카드를 삭제할 때 작동하는 함수   
    const deletAlarm = () => {
        dispatch(alarmActions.deleteAlarmDB(alarmId));
    }

    // readingStatus에 따라 사용되는 폰트의 컬러를 결정해 줌
    const color = (readingStatus === 'N' ? '#000' : '#9e9e9e');

    return (
        <React.Fragment>
            <Div color={color} display='flex' padding='1rem 0' borderB='1px solid #ccc' >
                <Div width='20%' display='flex' justify='left' items='start'>
                    <Div color='#9e9e9e' padding='.15rem .5rem' border='.1rem solid #e4e4e4' Bradius='.8rem' >
                        {typeEncoder(alarmType)}
                    </Div>
                </Div>
                <div onClick={Move} style={{width:'70%'}}>
                    {setAlamContent(props)}
                </div>
                <Div _onClick={deletAlarm} fontSize='1.5rem' color='#747474' width='10%' display='flex' justify='right' items='center' >
                    <BsX />
                </Div>
            </Div>
        </React.Fragment>
    )
};

export default AlarmCard;