import React, { useState, useRef } from "react";

import { userpageActions } from "../redux/modules/userpage";
import { useDispatch, useSelector } from "react-redux";

import { getUserId } from "../shared/cookie";

import CommentInput from "./CommentInput";
import UserComment from "./UserComment";

import { BsXCircle } from 'react-icons/bs';

import styled from "styled-components";

const UserCommentList = (props) => {
    const dispatch = useDispatch();
    const { Id } = props;
    const { comments, userId } = useSelector(state => state.userpage);
    const [open,setOpen] = useState(false);
    const [comment,setComment] = useState('');
    const commentRef = useRef();

    React.useEffect(()=>{
        // if(Id !== userId){
        //     dispatch(userpageActions.getCommentsDB(Id));
        // }
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

    const set = {comment: comment, setComment:setComment, commentRef:commentRef, add:add };

    return (
        <React.Fragment>
            <CommentBtn>
                <Btn onClick={()=>{setOpen(true)}} >방명록쓰기</Btn>
            </CommentBtn>
            { open &&
            <Wrap>
                <NavBar>
                    Guest Book
                    <Icon onClick={()=>{setOpen(false)}} ><BsXCircle /></Icon>
                </NavBar>
                <CommentInput {...set} type='text' placeholder='댓글을 작성해주세요.' />
                {[1,2,3,3,3,3,3,3].map((c,i)=>{
                    return <UserComment {...c} set={set} commentRef={commentRef} />
                    })}
            </Wrap>}
        </React.Fragment>
    )
};

const CommentBtn = styled.div`
    width: 100%;
    position: absolute;
    bottom: -10vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Btn = styled.div`
    display: flex;
    justify-content: center;
    width: 60%;
    padding: .45rem;
    border: 1px solid #ff7a7a;
    border-radius: .3rem;
    background-color: #fff;
    color: #ff7a7a;
    cursor: pointer;
`;

const Wrap = styled.div`
    z-index: 2;
    max-width: 412px;
    width: 100%;
    height: 100%;
    padding: 15vh 0 0;
    position: fixed;
    top: 0;
    overflow-Y: scroll;
    background-color: rgba(0,0,0,0.2);
`;

const NavBar = styled.div`
    width: 100%;
    padding: ${({theme}) => theme.paddings.base};
    display: flex;
    justify-content: space-between;
    border-radius: .8rem .8rem 0 0;
    color: #ff7a7a;
    font-size: ${({theme})=> theme.fontSizes.xl};
    background-color: #fff;
`;

const Icon = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

export default UserCommentList;