import React, { useState, useRef } from "react";

import { userpageActions } from "../redux/modules/userpage";
import { useDispatch, useSelector } from "react-redux";

import CommentInput from "./CommentInput";
import UserComment from "./UserComment";

import { BsXCircle } from 'react-icons/bs';
import { BiMessageEdit, BiMessageAltEdit } from 'react-icons/bi';

import styled, {keyframes} from "styled-components";

const UserCommentList = (props) => {
    const dispatch = useDispatch();
    const { Id } = props;
    const { comments, userId } = useSelector(state => state.userpage);
    const [open,setOpen] = useState(false);
    const [comment,setComment] = useState('');
    const commentRef = useRef();

    React.useEffect(()=>{
        if(Number(Id) !== userId){
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
                <Btn onClick={()=>{setOpen(true)}} >
                    {/* <BiMessageAltEdit /> */}
                    방명록
                </Btn>
            </CommentBtn>
            { open &&
            <Wrap>
                <NavBar>
                    방명록
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
    z-index: 3;
    max-width: 412px;
    width: 100%;
    position: fixed;
    bottom: 0;
    display: flex;
    justify-content: right;
`;

const slime = keyframes`
0%{
    transform: translate(0,0) 
}
25%{
    transform: translate(0,-.3rem)
}
50%{
    transform: translate(0,0)
}
75%{
    transform: translate(0,-.2rem)
}
100%{
    transform: translate(0,0)
}
`;

const Btn = styled.div`
    z-index: 2;
    position: absolute;
    top: -9rem;
    right: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 3rem;
    height: 2rem;
    border: .15rem solid #ff7a7a;
    border-radius: .5rem;
    background-color: #fff;
    font-size: ${({theme})=> theme.fontSizes.small};
    color: #ff7a7a;
    cursor: pointer;
    animation: ${slime} 1.5s 1s infinite linear;
    &:active {
        border: none;
        color: #fff;
        background-color: #ff7a7a;
    }
`;

const Wrap = styled.div`
    z-index: 3;
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