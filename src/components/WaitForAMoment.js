import React from "react";

import loading_5 from '../assets/loading_5.svg';

import styled, { keyframes } from "styled-components";

const WaitForAMoment = (props) => {
    // 로딩 상태일 때 쓰기위한 컴포넌트
     
    return(
        <WaitGrid>
            <Wait src={loading_5} />
            <Anounce color='#ffcd48' >
                로딩중
            </Anounce>
        </WaitGrid>
    )
}

const WaitGrid =styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 1;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0,0,0,0.3);
`;

const rotating = keyframes`
    0%{
        transform: translate(-12rem,0) 
    }
    10%{
        transform: translate(-10rem,-2)
    }
    20%{
        transform: translate(-8rem,0)
    }
    30%{
        transform: translate(-6rem,-1rem)
    }
    40%{
        transform: translate(-4rem,0)
    }
    50%{
        transform: translate(0,-.5rem)
    }
    60%{
        transform: translate(4rem,0)
    }
    70%{
        transform: translate(6rem,-1rem)
    }
    80%{
        transform: translate(8rem,0)
    }
    90%{
        transform: translate(10rem,-1.5rem)
    }
    100%{
        transform: translate(12rem,0)
    }
`;

const Wait = styled.img`
    width: 30%;
    animation: ${rotating} 2s 1s infinite linear;
`;

const Anounce = styled.div`
    width: 100%;
    text-align: center;
    font-size: 2rem;
    margin-top: 1.8rem;
    color: ${props=> props.color};
`;

export default WaitForAMoment;