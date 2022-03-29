import React from 'react';

import { initKakao, sharePostKakao } from '../shared/kakaoShare';

import { AiFillMessage } from 'react-icons/ai';

import styled from 'styled-components'; 

const SharedBtn = (props) => {
    // 이곳은 실질적으로 뷰적인 기능만을 담당함으로 
    // 기능적인 측면을 알고싶다면 위의 kakaoShare를 참조할 것

    // 공유하기 위해서 카카오 브라우저 설정을 하는 함수
    React.useEffect(()=>{
        initKakao()
    },[])

    return(
        <Wrap>
            <Circle onClick={()=>{sharePostKakao(props)}} >
                <AiFillMessage />
            </Circle>
        </Wrap>
    )
};

const Wrap = styled.div`
    display:flex;
    flex-direction: right;
`;

const Circle = styled.div`
    display:flex;
    justify-content: center;
    align-items: center;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 1.5rem;
    background-color: #F7E600;
    color: #3A1D1D;
`;

export default SharedBtn;