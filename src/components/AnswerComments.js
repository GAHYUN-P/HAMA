import React from 'react';

import { useDispatch } from 'react-redux';
import { answerActions } from '../redux/modules/answer';
import { history } from '../redux/configureStore';

import { getUserId } from '../shared/cookie';
import { getComment, getBtnString } from '../shared/separator';

import styled from 'styled-components';

const AnswerComments = (props) => {
    const dispatch = useDispatch();
    const {videoRef,timestamp,content} = props;
    // 댓글 삭제 요청
    const delcom = () => {
        const data = {
            commentId: props.commentId,
        }
        dispatch(answerActions.deleteCommentDB(data));
    }

    // 댓글 수정 준비
    const _setEdit = () => {
        props.setContent(props.content);
        props.commentRef.current.commentId = props.commentId;
        props.commentRef.current.focus();
    };

    const pushStamp = () => {
        videoRef.current.seekTo(timestamp);
    }

    return (
        <React.Fragment>
            <div>

                <div style={{display:'flex', justifyContent:'space-between'}} >
                    <div style={{display:'flex'}} > 
                        <div>프로필</div>
                        <div>{props.commentWriter}</div>
                    </div>
                    {props.commentWriterId === Number(getUserId()) &&
                    <div style={{display:'flex'}} >
                        <button onClick={_setEdit} >수정</button>
                        <button onClick={delcom} >삭제</button>
                    </div>}
                </div>
                {/* 타임스탬프가 있을 때 나올 댓글 */}
                {timestamp &&
                <div>
                    <TimeStampBtn onClick={pushStamp} >{getBtnString(content)}</TimeStampBtn>
                    {getComment(content)}
                </div>}
                {/* 타임스탬프가 없을 때 나올 댓글 */}
                {!timestamp &&
                <div>
                    {content}
                </div>}
                <div>{props.modifiedAt}</div>
                <button
                style={{border:'none', backgroundColor:'#eee', padding:'8px'}}
                onClick={()=>{history.push(`/comment/${props.commentId}`)}} >답글</button>
                <br/>
                
            </div>
        </React.Fragment>
    )
}

const TimeStampBtn = styled.button`
    border: none;
    border-radius: 0.4rem;
    background-color: #f5f5f5;
    color: #ff7a7a;
`;

export default AnswerComments;