import React from 'react';

import { initKakao, sharePostKakao } from '../shared/kakaoShare';

import { AiFillMessage } from 'react-icons/ai';

import styled from 'styled-components'; 

const SharedBtn = (props) => {
    
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