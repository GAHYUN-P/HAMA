import React, { useState, useRef } from "react";

import { userpageActions } from "../redux/modules/userpage";
import { useDispatch, useSelector } from "react-redux";

import CommentInput from "./CommentInput";
import UserComment from "./UserComment";

import { BsXCircle } from 'react-icons/bs';

import styled, {keyframes} from "styled-components";

const UserCommentList = (props) => {
    const dispatch = useDispatch();
    // 해당 유저의 아이디
    const { Id } = props;
    // 리덕스 상의 방명록 리스트
    // userId: 현재 리덕스 상의 방명록의 유저 아이디
    // nickname: 현재 리덕스 상의 방명록의 유저 닉네임
    const { comments, userId, nickname } = useSelector(state => state.userpage);
    // 방명록을 열기위한 state
    const [open,setOpen] = useState(false);
    // 댓글입력창을 다루기 위한 ref와 state
    const [comment,setComment] = useState('');
    const commentRef = useRef();

    React.useEffect(()=>{
        // props로 넘겨받은 아이디와 리덕스 상의 아이디가 다르다면 다시 요청받음
        if(Number(Id) !== userId){
            dispatch(userpageActions.getCommentsDB(Id));
        }
    },[])

    // 댓글작성 버튼을 누를시 작동하는 함수
    const add = () => {
        // 현재 ref에 들어 있는 정보들을 가져옴
        const commentId = commentRef.current.commentId;
        const parentId = commentRef.current.parentId;
        const content = commentRef.current.value;

        const data = {
            userId: Id,
            commentId: commentId,
            parentId: parentId,
            content: content
        };

        if(!content){window.alert('빈칸이 있으면 작성할 수 없습니다.'); return};
        // 댓글 아이디와 부모댓글 아이디가 없다면 일반 댓글 작성
        if(!commentId && !parentId){dispatch(userpageActions.addCommentsDB(data))};
        // 댓글 아이디가 있고 부모댓글 아이디가 없다면 일반 댓글 수정
        if(commentId && !parentId){dispatch(userpageActions.editCommentsDB(data))};
        // 댓글 아이디가 없이 부모댓글 아이디가 있다면 대댓글 작성
        if(!commentId && parentId){dispatch(userpageActions.addCommentsDB(data))};
        // 댓글 아이디가 있고 부모댓글의 아이디도 있다멵 대댓글 수정
        if(commentId && parentId){dispatch(userpageActions.editCommentsDB(data))}
        cancel()
    };

    // 댓글 작성하고 난 후 ref를 초기화 시켜주는 함수
    const cancel = () => {
        setComment('')
        commentRef.current.value = '';
        commentRef.current.parentId = undefined;
        commentRef.current.commentId = undefined;
    };

    // 댓글창을 조작하기 위한 ref와 스테이트를 모아 놓음
    const set = {comment: comment, setComment:setComment, commentRef:commentRef, add:add };

    return (
        <React.Fragment>
            <CommentBtn>
                <Btn onClick={()=>{setOpen(true)}}>
                    방명록
                </Btn>
            </CommentBtn>
            { open &&
            <Wrap>
                <NavBar>
                    {nickname}'s 방명록
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