import React from "react";

import MainHama from '../assets/rehama.png';

import styled from "styled-components";

const WaitForAMoment = (props) => {

    return(
        <Comment>
            <div>
               잠시만요.
            </div>
            <HamaImg src={MainHama} />
        </Comment>
    )
}

const Comment = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 1rem;
`;

const HamaImg = styled.img`
    width: 50%;
`;

export default WaitForAMoment;