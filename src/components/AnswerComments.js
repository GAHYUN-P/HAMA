import React from 'react';
import { useDispatch } from 'react-redux';
import { answerActions } from '../redux/modules/answer';
import { getUserId } from '../shared/cookie';
import { history } from '../redux/configureStore'

const AnswerComments = (props) => {
    const dispatch = useDispatch();
    
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

    console.log(props)

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
                <div>{props.content}</div>
                <div>{props.modifiedAt}</div>
                <button
                style={{border:'none', backgroundColor:'#eee', padding:'8px'}}
                onClick={()=>{history.push(`/`)}} >답글</button>
                <br/>
                
                
            </div>
        </React.Fragment>
    )
}

export default AnswerComments;