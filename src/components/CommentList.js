import React from 'react';

import AnswerComments from './AnswerComments';

import { useDispatch, useSelector } from 'react-redux';
import { answerActions } from '../redux/modules/answer';

import styled from 'styled-components';

const CommentList = (props) => {
    const dispatch = useDispatch();
    const commentArray = useSelector(state=>state.answer.comments);
    const [content,setContent] = React.useState('');
    const commentRef = React.useRef();

    const commenting = () => {
        console.log(commentRef.current.commentId);
        if(commentRef.current.commentId !== undefined){
            console.log(commentRef.current.value);
            // 수정요청
            const data = {
                comment: commentRef.current.value,
                commentId: commentRef.current.commentId
            }
            dispatch(answerActions.editCommentDB(data));
            cancel()
            return
        }
        // 작성요청
        const data = {
            comment: commentRef.current.value,
            answerId: props.answerId
        };
        dispatch(answerActions.addCommentDB(data));
        console.log(commentRef.current.value);
        cancel()
    }

    const cancel = () => {
        setContent('')
        commentRef.current.commentId = undefined;
    }

    return (
        <React.Fragment>
            <div>
                <div style={{
                    display:'flex', border:'1px solid #ccc',
                    padding:'4px',borderRadius:'1rem'
                    }} >
                    <Elinput 
                    ref={commentRef}
                    value={content}
                    onChange={(e)=>{setContent(e.target.value)}}
                    type='text' 
                    placeholder='00:00(타임 스탬프)댓글을 작성해 주세요.'/>
                    {content &&
                    <div style={{padding:'5px 8px'}} onClick={cancel} >x</div>}
                    <button style={{border:'none'}} onClick={commenting} >작성</button>
                </div>
                {commentArray.map((c,i)=>{
                    return(<AnswerComments setContent={setContent} commentRef={commentRef} key={i} {...c} />)
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

export default CommentList;