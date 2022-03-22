import React from 'react';

import PP from '../assets/Paper_Plane.svg';

import styled from 'styled-components';

const CommentInput = (props) => {
    const { commentRef, comment, setComment, type, placeholder, add, is_child } = props;

    const Cancel = () => {
        if(!comment){return}; 
        if(window.confirm('댓글 작성을 그만두시겠습니까?')){
            setComment('')
            commentRef.current.commentId = undefined;
            return
        };
        commentRef.current.focus();
    }

    if(!is_child){
        return(
            <InputGrid>
                <Back>
                    <ElInput 
                    ref={commentRef} 
                    value={comment}
                    onChange={(e)=>{setComment(e.target.value)}}
                    onBlur={Cancel}
                    type={type}
                    placeholder={placeholder}/>
                    <PPImg width='1.6rem' onClick={add} src={PP} />
                </Back>
            </InputGrid>
        )
    }

    return(
        <WholeGrid>
            <Back>
                <ElInput 
                ref={commentRef} 
                value={comment}
                onChange={(e)=>{setComment(e.target.value)}}
                onBlur={Cancel}
                type={type}
                placeholder={placeholder}/>
                <PPImg width='1.6rem' onClick={add} src={PP} />
            </Back>
        </WholeGrid>
    )
}

const WholeGrid = styled.div`
    width: 100%;
    padding: 0 ${({theme})=> theme.paddings.default};
    position: absolute;
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