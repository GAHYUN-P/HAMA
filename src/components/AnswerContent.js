import React from "react";

import { useDispatch, useSelector } from "react-redux";
import {history} from '../redux/configureStore';
import { answerActions } from "../redux/modules/answer";

import WriteUser from "./WriteUser";
import Viewer from '../components/Viewer'
import { getUserId } from "../shared/cookie";

import styled from "styled-components";

const AnswerContent = (props) => {
    const dispatch = useDispatch();
    // 이미지 리스트
    const { videoRef, fileList, videoUrl, answerId } = props;

    // 좋아요 작용
    const likeList = useSelector(state => state.answer.answer.likeUserList);
    const likeColor = likeList.includes(Number(getUserId())) ? 'coral' : '#eee';
    
    const push = () => {
        const data = {
            answerId: props.answerId,
            userId: Number(getUserId()),
        }
        dispatch(answerActions.pushLikeDB(data));
    }

    const delAnswer =() => {
        dispatch(answerActions.deleteAnswerDB(answerId));
    }

    return (
        <React.Fragment>
            <div style={{width:'100%', padding:'10px 0',margin:'2px auto'}} >

                {/* 상단 */}
                <div style={{padding:'5px 0'}} >
                    <div>{props.category}</div>

                    <div style={{width:'100%',display:'flex',justifyContent:'space-between'}} >
                        <div>{props.title}</div>
                        <Likebtn 
                        onClick={push}
                        likeColor={likeColor}
                        >{likeList.length}</Likebtn>
                    </div>
                </div>

                {/* 중단 */}
                <div style={{padding:'5px 0',display:'flex',justifyContent:'space-between'}} >
                    <WriteUser profile={props.profile} writer={props.answerWriter} modifiedAt={props.modifiedAt} />
                    <div>
                        <button onClick={()=>{history.push(`/answeredit/${props.answerId}`)}} >수정</button>
                        <button onClick={delAnswer} >삭제</button>
                    </div>
                </div>

                {/* 하단 */}
                <div style={{padding:'5px 0'}} >
                    <div>
                        {props.content}
                    </div>
                    
                    <Viewer videoRef={videoRef} fileList={fileList} video={videoUrl} is_answer  />
                </div>

            </div>
        </React.Fragment>
    )
}

const Likebtn = styled.button`
    width: 30px;
    height: 30px;
    border-radius: 30px;
    background-color: ${props => props.likeColor};
`;

export default AnswerContent;