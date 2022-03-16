import React from "react";
import styled from "styled-components";

import { useDispatch } from "react-redux";
import { alamActions } from "../redux/modules/alam";

import { setAlamContent } from "../shared/setAlamcontent";

import { history } from "../redux/configureStore";

const AlamCard = (props) => {
    const dispatch = useDispatch();
    const { alarmId ,id, senderNickName, type, title, modifiedAt, readingStatus } = props;

    const MoveTo = () => {
        if(['likeP','answer'].includes(type)){
            history.push(`/requestdeatil/${id}`);
        }
        if(['comment','rate','rated','likeA'].includes(type)){
            history.push(`/answerdetail/${id}`);
        }
        if(type === 'child'){
            history.push(`/comment/${id}`);
        }
        if(type === 'level'){
            history.push('/mypage');
        }
    }

    console.log(readingStatus);

    const deletAlarm = () => {
        dispatch(alamActions.deleteAlamDB(alarmId));
    }

    return (
        <React.Fragment>
            <div style={{display:'flex',padding:'1rem 0',borderBottom:'1px solid #ccc'}} >
                <div style={{width:'20%',display:'flex',justifyContent:'center',alignItems:'center'}}>
                    {type}
                </div>
                <div onClick={MoveTo} style={{width:'70%'}}>
                    {senderNickName}님이 [{title}]글에 댓글을 남겼습니다.
                    <span>      {modifiedAt}</span>
                </div>
                <div onClick={deletAlarm}
                 style={{width:'10%',display:'flex',justifyContent:'center',alignItems:'center'}}>X</div>
            </div>
        </React.Fragment>
    )
}

const ReadY = styled.div`
    color: ${({theme})=> theme.colors.gray_1};
`;

const ReadN = styled.div`
    color: ${({theme})=> theme.colors.black};
`

export default AlamCard;