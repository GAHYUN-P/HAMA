import React from "react";

import MainHama from '../assets/rehama.png';
import logo from '../assets/logo_final.svg';
import loading from '../assets/loading_2.gif';

import styled, { keyframes } from "styled-components";

const WaitForAMoment = (props) => {
    const { is_loading } = props;

    if(is_loading){
        return(
        <WaitGrid>
            <Wait src={logo} />
        </WaitGrid>
        )
    }

    return(
        <Comment>
            <HamaImg src={loading} />
        </Comment>
    )
}

const Comment = styled.div`
    width: 100%;
    height: 30rem;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const HamaImg = styled.img`
    width: 50%;
`;

const WaitGrid =styled.div`
    width: 100%;
    height: 100%;
    display: flex;
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
        transform:rotate(0deg)
    }
    20%{
        transform:rotate(72deg)
    }
    40%{
        transform:rotate(144deg)
    }
    60%{
        transform:rotate(216deg)
    }
    80%{
        transform:rotate(288deg)
    }
    100%{
        transform:rotate(360deg)
    }
`;

const Wait = styled.img`
    width: 30%;
    animation: ${rotating} 2s 1s infinite linear;
`;

export default WaitForAMoment;