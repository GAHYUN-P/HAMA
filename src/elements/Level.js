import React from 'react'
import styled from 'styled-components';

import good_g from '../assets/good_g.svg';
import good_c from '../assets/good_c.svg';
import fair_g from '../assets/fair_g.svg';
import fair_c from '../assets/fair_c.svg';
import poor_g from '../assets/poor_g.svg';
import poor_c from '../assets/poor_c.svg';

import good from '../assets/good_g.png';
import fair from '../assets/fair_g.png';
import poor from '../assets/poor_g.png';

const Level = (props) => {
    const { children, setLevel, level } = props

    return(
        <LvContainer>
            { level !== '상' ? 
            <LvBtn onClick={()=>setLevel('상')} basic={good_g} /> 
            :
            <SelectedLvBtn basic={good_c} /> }

            { level !== '중' ?  
            <LvBtn onClick={()=>setLevel('중')} basic={fair_g} /> 
            :
            <SelectedLvBtn basic={fair_c} /> }

            { level !== '하' ?
            <LvBtn onClick={()=>setLevel('하')} basic={poor_g} />
            :
            <SelectedLvBtn basic={poor_c} /> }
        </LvContainer>
    )
}

const LvContainer = styled.div`
    width: 100%;
    height: 5.42rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 0.3rem;
    background-color: #efefef;
    box-sizing: border-box;
`;

const LvBtn = styled.button`
    border: none;
    width: 3rem;
    height: 3rem;
    margin: 0 0.68rem;
    background-image: url(${props => props.basic});
    background-size: cover;
`;

const SelectedLvBtn = styled.button`
    border: none;
    width: 3rem;
    height: 3rem;
    margin: 0 0.68rem;
    background-image: url(${props => props.basic});
    background-size: cover;
`;

export default Level;