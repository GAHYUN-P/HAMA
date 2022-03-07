import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { answerActions } from "../redux/modules/answer";

import WriteUser from "./WriteUser";
import { getUserId } from "../shared/cookie";

import styled from "styled-components";

const AnswerContent = (props) => {
    const dispatch = useDispatch();
    // 이미지 리스트
    const fileList = props.fileList;

    // 좋아여 작용
    const likeList = useSelector(state => state.answer.answer.likeUserList);
    const likeColor = likeList.includes(Number(getUserId())) ? 'coral' : '#eee';
    
    const push = () => {
        const data = {
            answerId: props.answerId,
            userId: Number(getUserId()),
        }
        dispatch(answerActions.pushLikeDB(data));
    }

    return (
        <React.Fragment>
            <div style={{width:'100%', padding:'10px 0'}} >

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
                <div style={{padding:'5px 0'}} >
                    <WriteUser profile={props.profile} writer={props.answerWriter} modifiedAt={props.modifiedAt} />
                </div>

                {/* 하단 */}
                <div style={{padding:'5px 0'}} >
                    <div>
                        {props.content}
                    </div>
                    <div style={{whiteSpace:'nowrap', overflowX:'scroll',padding:'4px'}} >
                        {fileList.map((f,i)=>{
                            return <div style={{display:'inline-block'}} key={i} >파일입니다.</div>
                        })}
                    </div>
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