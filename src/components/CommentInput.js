import React from 'react';

import PP from '../assets/Paper_Plane.svg';

import styled from 'styled-components';

const CommentInput = (props) => {
    const { commentRef, comment, setComment, type, placeholder, add } = props;

    return(
        <WholeGrid>
            <Back>
                <ElInput 
                ref={commentRef} 
                value={comment}
                onChange={(e)=>{setComment(e.target.value)}}
                type={type}
                placeholder={placeholder}/>
                <PPImg onClick={add} src={PP} />
            </Back>
        </WholeGrid>
    )
}

const WholeGrid = styled.div`
    width: 100vw;
    padding: 0 ${({theme})=> theme.paddings.default};
    position: fixed;
    bottom: 2rem;
`;

const Back = styled.div`
    width: 100%;
    height: 3rem;
    padding: 0 ${({theme})=> theme.paddings.default} 0;
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
    width: 2rem;
`;

export default CommentInput; 