import React from 'react';

import AnswerComments from './AnswerComments';

import { useDispatch, useSelector } from 'react-redux';
import { answerActions } from '../redux/modules/answer';

import styled from 'styled-components';

const CommentList = (props) => {
    const dispatch = useDispatch();
    const commentArray = useSelector(state=>state.answer.comments);
    const commentRef = React.useRef();
    const timestampRef = React.useRef();

    const commenting = () => {
        if(commentRef.current.commentId){
            console.log('수정 요청입니다.');
            return
        }
        console.log('작성요청입니다.');
    }

    const cancel = () => {
        commentRef.current.value = '';
        timestampRef.current.value = '';
        commentRef.current.commentId = null;
    }

    return (
        <React.Fragment>
            <div>
                <div style={{display:'flex'}} >
                    <Elinput ref={commentRef} type='text' placeholder='댓글을 작성해 주세요.'/>
                    <button onClick={commenting} >작성</button>
                </div>
                <div style={{display:'flex'}} >
                    <Elinput ref={timestampRef} type='text' placeholder='원하는 시간을 선정! ex)04:44:44'/>
                    <button onClick={cancel} >취소</button>
                </div>
                {commentArray.map((c,i)=>{
                    return(<AnswerComments commentRef={commentRef} timestampRef={timestampRef} key={i} {...c} />)
                })}
            </div>
        </React.Fragment>
    )
};

const Elinput = styled.input`
    width: 80%;
    display: inline-block;
    border: none;
    outline: none;
    border-bottom: 1px solid #ddd;
    padding: 8px 4px;
`;

export default CommentList;