import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { answerActions } from '../redux/modules/answer';

import ChildComment from './ChildComment';

const AnswerComments = (props) => {
    const dispatch = useDispatch();

    // 댓글 수정을 위한 초기 스테이트들
    const [is_edit, setEdit] = React.useState(false);
    const [comment,setComment] = React.useState('');
    
    // 댓글 삭제 요청
    const delcom = () => {
        const data = {
            commentId: props.commentId,
        }
        dispatch(answerActions.deleteCommentDB(data))
    }

    // 댓글 수정 준비
    const _setEdit = () => {
        props.commentRef.current.value = props.content;
        props.commentRef.current.commentId = props.commentId;
        props.commentRef.current.focus();
    }

    // 댓글 수정 요청
    const _editComment = () => {
        const data = {
            commentId: props.commentId,
            comment: comment,
        }
        dispatch(answerActions.editCommentDB(data));
    }


    return (
        <React.Fragment>
            <div>

                <div style={{display:'flex', justifyContent:'space-between'}} >
                    <div style={{display:'flex'}} > 
                        <div>프로필</div>
                        <div>{props.commentWriter}</div>
                    </div>
                    <div style={{display:'flex'}} >
                        <button onClick={_setEdit} >수정</button>
                        <button onClick={delcom} >삭제</button>
                    </div>
                </div>
                <div>{props.content}</div>
                <div style={{display:'flex',justifyContent:'space-between'}} >
                    <div>{props.modifiedAt}</div>
                    <button onClick={()=>{}} >답글쓰기</button>
                </div>
                <br/>
                
                
            </div>
        </React.Fragment>
    )
}

export default AnswerComments;