import React from 'react'
import styled from 'styled-components';

import good_g from '../assets/good_g.svg';
import good_c from '../assets/good_c.svg';
import fair_g from '../assets/fair_g.svg';
import fair_c from '../assets/fair_c.svg';
import poor_g from '../assets/poor_g.svg';
import poor_c from '../assets/poor_c.svg';

const Level = (props) => {
    const { children, _onClick, level } = props

    return(
        <LvContainer>
            <LvBtn basic={good_g} />
            <LvBtn basic={fair_g} />
            <LvBtn basic={poor_g} />
        </LvContainer>
    )
}

const LvContainer = styled.div`
    width: 100%;
    height: 4.45rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 0.64rem;
    background-color: #f8f8fa;
    box-sizing: border-box;
`;

const LvBtn = styled.button`
    border: none;
    border-radius: 3rem;
    width: 3rem;
    height: 3rem;
    margin: 0 0.68rem;
    background-image: url(${props => props.basic});
    background-size: cover;
`;

export default Level;