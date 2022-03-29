import React,{ useEffect, useRef, useState } from 'react';

import PP from '../assets/Paper_Plane.svg';

import styled from 'styled-components';

const CommentInput = (props) => {
    const { commentRef, comment, setComment, type, placeholder, add, is_child } = props;
    // 댓글창의 범위를 지정하기 위한 ref
    const inputRef = useRef();

    // 댓글창의 범위를 벗어나면 작동하는 함수
    const Cancel = () => {
        // 확인을 한 후 확인을 누른다면 내용 초기화
            if(window.confirm('작성을 취소하시겠습니까?')){
                // 댓글창 내용 초기화
                setComment('')
                commentRef.current.value = '';
                // 수정을 위한 댓글의 아이디 초기화
                commentRef.current.commentId = undefined;
                // 대댓글 작성을 위한 부모댓글의 아이디 초기화
                commentRef.current.parentId = undefined;
                return
            }
            // 취소를 누른다면 다시 댓글창에 포커스
            commentRef.current.focus();
    }

    // 댓글창의 범위를 감지하기 위한 함수
    const clickOutside = ({target}) => {
        // 수정버튼을 누를 경우 타겟팅에서 제외되어 무조건 cancel이 작동
        // 이를 예외처리하기 위하여 수정 버튼에는 전부 id값을 주었고 
        // target의 id값이 edit이면 예외처리가 되도록 해주었음
        if(target?.id === 'edit'){return};
        // target에 댓글창이 없다면 작동
        if(!inputRef.current?.contains(target)){
            // 만일 댓글 내용이 없거나 수정을 위한 아이디 또는 대댓글 작성을 위한 부모댓글이 없을 때는 작동 방지
            if(!commentRef.current?.value && !commentRef.current?.commentId && !commentRef.current?.parentId){return}
            Cancel();
        }
    }

    React.useEffect(()=>{
        // 클릭이벤트를 구독하여 댓글창 이외를 누르면 clickOutside가 작동하도록 구성 
        window.addEventListener("click", clickOutside);
        return () => {
            // 컴포넌트가 사라지면 구독해제
            window.removeEventListener("click", clickOutside);
        };
    },[]);

    // 일반댓글창
    if(!is_child){
        return(
            <InputGrid ref={inputRef} >
                <Back>
                    <ElInput 
                    ref={commentRef} 
                    value={comment}
                    onChange={(e)=>{setComment(e.target.value)}}
                    type={type}
                    placeholder={placeholder}/>
                    <PPImg width='1.6rem' onClick={add} src={PP} />
                </Back>
            </InputGrid>
        )
    }

    // 대댓글 댓글창
    return(
        <WholeGrid>
            <Back ref={inputRef} >
                <ElInput 
                ref={commentRef} 
                value={comment}
                onChange={(e)=>{setComment(e.target.value)}}
                type={type}
                placeholder={placeholder}/>
                <PPImg width='1.6rem' onClick={add} src={PP} />
            </Back>
        </WholeGrid>
    )
}

const WholeGrid = styled.div`
    max-width: 412px;
    width: 100%;
    padding: 0 ${({theme})=> theme.paddings.default};
    position: fixed;
    bottom: 2rem;
`;

const Back = styled.div`
    width: 100%;
    height: 3rem;
    padding: 0 ${({theme})=> theme.paddings.xl} 0;
    display: flex;
    justify-content: space-between;
    border-radius: .3rem;
    background-color: #fff;
    box-shadow:  0 .15rem .4rem #d5d5d5;
`;

const ElInput = styled.input`
    width: 100%;
    border: none;
    outline: none;
    background-color: transparent;
    &::placeholder{
        font-size: .7rem;
        color:  #9e9e9e;
    }
`;

const PPImg = styled.img`
    width: ${props=>props.width};
`;

const InputGrid = styled.div`
    position: relative;
    padding: ${({theme})=> theme.paddings.default};
    background-color: #efefef;
`;

export default CommentInput; 