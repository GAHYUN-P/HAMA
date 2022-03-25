import React from "react";

import styled from 'styled-components';


const NickMaking = (props) => {
    const { nickname, setNickname, sameCheck, same, setSame } = props;

    return(
        <>
        <Grid>
            <div>
                <InvidPart>닉네임</InvidPart>
                <NickInput value={nickname} onChange={(e)=>{
                    setNickname(e.target.value)
                    setSame('needCheck')
                    }} type='text' placeholder='3~6자리의 숫자,영어,한글만 가능합니다.' />
                {same === 'needCheck' && <SameMsg color='#212121' >* 중복체크를 해주세요.</SameMsg> }
                {same === 'true' && <SameMsg color='#036635' >* 사용할 수 있는 닉네임입니다.</SameMsg> }
                {same === 'false' && <SameMsg color='#ff7a7a' >* 사용할 수 없는 닉네임입니다.</SameMsg> }
            </div>
            <Btn onClick={sameCheck} >중복확인</Btn>
        </Grid>
        </>
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
    width: 14rem;
    padding: .7rem .4rem .7rem .4rem;
    border: 1px solid #dcdcdc;
    border-radius: .3rem;
    outline: none;
    &::placeholder{
        font-size: ${({theme}) => theme.fontSizes.small};
        color: #ff7a7a;
    }
`;

const Btn = styled.button`
    margin: 1.45rem 0 1.1rem .8rem;
    padding: .65rem .8rem;
    color: #ff5d5d;
    border: 1px solid #ff5d5d;
    border-radius: .3rem;
    background-color: #fff;
    &:hover{
        color: #fff;
        background-color: #ff7a7a;
    }
`;

const SameMsg = styled.span`
    font-size: ${({theme})=> theme.fontSizes.small};
    color: ${props => props.color};
`;

export default NickMaking;