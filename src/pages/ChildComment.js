import React,{ useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { childActions } from '../redux/modules/child';
import { getUserId } from '../shared/cookie';

import Header from '../components/Header';

import styled from 'styled-components';

const ChildComment = (props) => {
    const dispatch = useDispatch();
    const commentRef = React.useRef();
    const [comment,setComment] = useState('');
    const parentId = props.match.params.commentId;
    const parent = useSelector(state => state.child.parentComment);
    const childs = useSelector(state => state.child.childComments);

    React.useEffect(()=>{
        if(parentId !== parent.commentId){
            dispatch(childActions.getChildsDB(parentId));
        }
    },[]);

    const add = () => {
        if(!commentRef.current.value){
            window.alert('내용이 비었습니다.')
            return;
        }
        if(commentRef.current.commentId !== undefined){
            const data = {
                content: commentRef.current.value,
                commentId: commentRef.current.commentId
            }
            console.log(data);
            dispatch(childActions.editChildDB(data));
            cancel();
            return;
        }
        const data = {
            answerId: parent.answerId,
            comment: commentRef.current.value,
            parentCommentId: parentId
        }
        dispatch(childActions.addChildDB(data));
        cancel();
    }

    const cancel = () => {
        commentRef.current.commentId = undefined;
        commentRef.current.value = '';
    }

    const del = (commentId) => {
        if(window.confirm('댓글을 삭제하겠습니까?')){
            dispatch(childActions.delChildDB(commentId))
        }
    };

    return(
        <React.Fragment>
            <Header />
            <div style={{width:'90%', margin:'0 auto',position:'relative'}} >
                {/* 부모댓글 */}
                <div style={{display:'flex'}} >
                    <div>
                        <ProHippo />
                    </div>
                    <div>
                        <div style={{display:'flex'}} > 
                            <div>{parent.commentWriter}</div>
                        </div>
                        <div>
                            {parent.content}
                        </div>
                        <div>
                            {parent.modifiedAt}
                        </div>
                    </div>
                </div>
                <hr/>

                {/* 댓글 없을 때 */}
                {childs.length === 0 &&
                <div style={{
                    width:'100%',display:'flex',justifyContent:'center',
                    alignItems:'center',fontSize:'2rem'
                }} >아직 대댓글이 없어요 
                첫 작성자가 되어주세요!!</div>
                }
                {/* 자식댓글 */}
                {childs.length > 0 &&
                childs.map((k,i)=>{
                    return (
                    <div key={i} style={{width:'100%',display:'flex'}} >
                        <div style={{width:'10%'}} >
                            화살
                        </div>
                        <div style={{width:'90%'}} >
                            <div style={{display:'flex', justifyContent:'space-between'}} >
                                <div style={{display:'flex'}} > 
                                    <div>프로필</div>
                                    <div>{k.commentWriter}</div>
                                </div>
                                {k.commentWriterId === Number(getUserId())  &&
                                <div style={{display:'flex'}} > 
                                    <button
                                    onClick={()=>{
                                        commentRef.current.commentId = k.commentId;
                                        commentRef.current.value = k.content;
                                        commentRef.current.focus();
                                    }}
                                    style={{border:'none',margin:'0 0.5rem 0 0'}} >수정</button>
                                    <button
                                    onClick={()=>{
                                        if(window.confirm('댓글을 삭제하겠습니까?')){
                                            dispatch(childActions.delChildDB(k.commentId))
                                        }
                                    }}
                                     style={{border:'none'}} >삭제</button>
                                </div>}
                            </div>
                            <div>{k.content}</div>
                            <div>{k.modifiedAt}</div>
                            <hr/>
                        </div>
                    </div>
                    )
                    })}
                <div style={{
                    width:'90%',border:'1px solid #ccc',borderRadius:'1rem',
                    position:'fixed',bottom:'24px'
                    }} >
                    <Elinput ref={commentRef}
                     type='text' placeholder='댓글을 작성해 주세요.' />
                    <div style={{display:'inline-block',padding:'0 16px 0 0'}} >x</div>
                    <button onClick={add} value={comment} onChange={(e)=>{setComment(e.target.value)}}
                    style={{
                        display:'inline-block',border:'none',backgroundColor:'#ccc',
                        padding:'8px'
                        }} >작성</button>
                </div>
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

const ProHippo = styled.div`
    width: 1.6rem;
    height: 1.6rem;
    margin: .2rem .3rem 0 0;
    border-radius: 1.6rem;
    background-color: #dcdcdc;
`;

export default ChildComment;