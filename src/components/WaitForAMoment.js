import React from "react";

import MainHama from '../assets/rehama.png';
import loading from '../assets/loading_2.gif';

import styled from "styled-components";

const WaitForAMoment = (props) => {

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

export default WaitForAMoment;