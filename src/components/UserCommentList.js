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
        if(Id !== userId){
            dispatch(userpageActions.getCommentsDB(Id));
        }
    },[])

    const add = () => {
        const commentId = commentRef.current.commentId;
        const parentId = commentRef.current.parentId;
        const content = commentRef.current.value;

        const data = {
            userId: Id,
            commentId: commentId,
            parentId: parentId,
            content: content
        }

        console.log(data);

        if(!content){window.alert('빈칸이 있으면 작성할 수 없습니다.'); return};
        if(!commentId && !parentId){dispatch(userpageActions.addCommentsDB(data))}
        if(commentId && !parentId){dispatch(userpageActions.editCommentsDB(data))}
        if(!commentId && parentId){dispatch(userpageActions.addCommentsDB(data))}
        if(commentId && parentId){dispatch(userpageActions.editCommentsDB(data))}
        cancel()
    };

    const cancel = () => {
        setComment('')
        commentRef.current.value = '';
        commentRef.current.parentId = undefined;
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
                <CommentInput {...set} type='text' placeholder='방명록을 작성해주세요.' />
                {comments.map((c,i)=>{
                    return <UserComment key={i} {...c} set={set} commentRef={commentRef} />
                    })}
                <FootBar />
            </Wrap>}
        </React.Fragment>
    )
};

const CommentBtn = styled.div`
    width: 100%;
    position: absolute;
    bottom: 5vh;
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

const FootBar = styled.div`
    width: 100%;
    height: 2.5rem;
    background-color: #fff;
    border-radius: 0 0 .8rem .8rem;
`;

const Icon = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

export default UserCommentList;