import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { answerActions } from '../redux/modules/answer';

const ChildComment = (props) => {
    const dispatch = useDispatch();

    // 댓글 수정을 위한 초기 스테이트들
    const [is_edit, setEdit] = React.useState(false);
    const [comment,setComment] = React.useState('');
    const editRef = React.useRef();

    // 댓글 삭제 요청
    const delcom = () => {
        const data = {
            commentId: props.commentId,
            parentId: props.parentId
        }
        dispatch(answerActions.deleteCommentDB(data));
    }

    // 댓글 수정 준비
    const _setEdit = () => {
        setComment(props.content);
        setEdit(true);
    }

    // 댓글 수정 요청
    const _editComment = () => {
        const data = {
            commentId: props.commentId,
            comment: comment,
            parentId: props.parentId
        }
        dispatch(answerActions.editCommentDB(data));
    }

    return(
        <React.Fragment>
            <div style={{ margin:'0 0 0 20px' }} >
                
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
                
                <div style={{display:'flex'}} >
                        <div>{props.modifiedAt}</div>
                </div>

                {is_edit && 
                <div style={{display:'flex',padding:'3px 0'}} >
                    <input 
                    type='text' 
                    value={comment}
                    ref={editRef}
                    onChange={(e)=>{setComment(e.target.value)}} 
                    placeholder='내용이 없다면 수정할 수 없어요!' />
                    <div style={{display:'flex'}} >
                        <button onClick={_editComment} >수정</button>
                        <button onClick={()=>{setEdit(false)}} >취소</button>
                    </div>
                </div>}

            </div>
        </React.Fragment>
    )
}

export default ChildComment;