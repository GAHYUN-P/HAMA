import React from "react";

import styled from 'styled-components';


const NickMaking = (props) => {
    // nickname,setNickname: 닉네임을 정하기 위한 스테이트와 함수
    // sameCheck: 중복확인 요청을 보내는 함수 
    // same,setSame: 중복확인 여부를 나타내는 스테이트 이름을 다시 입력할 때
    // 초기화 시켜주기 위해 setSame을 이용함
    const { nickname, setNickname, sameCheck, same, setSame } = props;

    return(
        <>
        <Grid>
            <div>
                <InvidPart>닉네임</InvidPart>
                <NickInput value={nickname} onChange={(e)=>{
                    setNickname(e.target.value);
                    // 중복체크 후 다시 닉네임을 지으면 중복체크를 다시하도록 설정 초기화
                    setSame('needCheck');
                    }} type='text' placeholder='3~8자리의 숫자,영어,한글만 가능합니다.' />
                    {/* 중복확인의 결과에 따라 나오는 메세지가 다름 */}
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