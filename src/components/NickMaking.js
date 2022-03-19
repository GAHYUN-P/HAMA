import React from "react";

import styled from 'styled-components';


const NickMaking = (props) => {
    const { nickname, setNickname } = props;

    return(
        <Grid>
            <div>
                <InvidPart>닉네임</InvidPart>
                <NickInput value={nickname} onChange={(e)=>{setNickname(e.target.value)}} type='text' placeholder='3~8자리의 숫자,영어,한글만 가능합니다.' />
            </div>
            <Btn>중복확인</Btn>
        </Grid>
    )
}

const Grid = styled.div`
    display: flex;
    align-items: center;
    padding: 2rem 0 4rem 2.5rem;
`;

const InvidPart = styled.div`
  margin-bottom: .4rem;
`;

const NickInput = styled.input`
    display: block;
    width: 16rem;
    padding: .7rem .8rem;
    border: 1px solid #dcdcdc;
    border-radius: .3rem;
    outline: none;
    &::placeholder{
        font-size: ${({theme}) => theme.fontSizes.small};
        color: #dcdcdc;
    }
`;

const Btn = styled.button`
    margin: 1.45rem 0 0 .8rem;
    padding: .65rem .8rem;
    color: #ff5d5d;
    border: 1px solid #ff5d5d;
    border-radius: .3rem;
    background-color: #fff;
    &:hover{
        color: #fff;
        background-color: #ff7a7a;
    }
`

export default NickMaking;