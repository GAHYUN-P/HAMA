import React from 'react';

import AnswerComments from './AnswerComments';

import { useDispatch, useSelector } from 'react-redux';
import { answerActions } from '../redux/modules/answer';

import styled from 'styled-components';

const CommentList = (props) => {
    const dispatch = useDispatch();
    const commentArray = useSelector(state=>state.answer.comments);
    const commentRef = React.useRef();

    const commenting = () => {
        if(commentRef.current.commentId){
            console.log('수정 요청입니다.');
            return
        }
        console.log('작성요청입니다.');
    }

    const cancel = () => {
        commentRef.current.value = '';
        commentRef.current.commentId = null;
    }

    return (
        <React.Fragment>
            <div>
                <div style={{display:'flex'}} >
                    <Elinput ref={commentRef} type='text' placeholder='00:00:00(타임 스탬프)댓글을 작성해 주세요.'/>
                    <button onClick={commenting} >작성</button>
                </div>
                {commentArray.map((c,i)=>{
                    return(<AnswerComments commentRef={commentRef} key={i} {...c} />)
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
    padding: 8px 4px;
`;

const AddBox = styled.div`
    width: 100%;
    border: #eee;
`;

export default CommentList;