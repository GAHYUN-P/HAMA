import React, { useState, useRef } from "react";

import { userpageActions } from "../redux/modules/userpage";
import { useDispatch, useSelector } from "react-redux";

import { getUserId } from "../shared/cookie";

import CommentInput from "./CommentInput";
import UserComment from "./UserComment";

import styled from "styled-components";

const UserCommentList = (props) => {
    const dispatch = useDispatch();
    const { comments } = useSelector(state => state.userpage);
    const [comment,setComment] = useState('');
    const commentRef = useRef();

    React.useEffect(()=>{

    },[])

    const add = () => {
        if(!commentRef.current.value){return};
        if(commentRef.current.commentId !== undefined){
            // 수정요청
            const data = {
                comment: commentRef.current.value,
                commentId: commentRef.current.commentId
            }
            dispatch();
            cancel()
            return
        }
        // 작성요청
        const data = {
            comment: commentRef.current.value,
            answerId: props.answerId
        };
        dispatch();
        cancel()
    };

    const cancel = () => {
        setComment('')
        commentRef.current.value = '';
        commentRef.current.commentId = undefined;
    };

    return (
        <React.Fragment>
            <Wrap>
                <CommentInput
                add={add}
                type='text'
                placeholder='댓글을 작성해주세요.'
                comment={comment}
                setComment={setComment}
                commentRef={commentRef} />
                {[1,2].map((c,i)=>{
                    return <UserComment {...c} commentRef={commentRef} />
                    })}
            </Wrap>
        </React.Fragment>
    )
};

const Wrap = styled.div`
    width: 100%;
    height: 15vh;
    position: absolute;
    bottom: 0;
    overflow-Y: scroll;
`;

export default UserCommentList;