import React from 'react';

import { history } from '../redux/configureStore';

import { FiChevronLeft } from 'react-icons/fi';

import styled from 'styled-components';

const ProgressBar = (props) => {
    const progress = (props.q / 9 * 22.85) + 'rem';

    return(
        <Grid>
            <UpGrid>
                <Back onClick={()=>{history.replace('/mypage')}} >
                    <div id='arr' >
                        <FiChevronLeft/>
                    </div>
                    <div>
                        뒤로가기
                    </div>
                </Back>
                <Count>{props.q}/9</Count>
            </UpGrid>
            <GreyBar />
            <PinkBar width={progress} />
        </Grid>
    )
}

const Grid = styled.div`
    position: relative;
    width: 100%;
    margin-top: 2rem;
    padding: 1rem 0;
`;

const UpGrid = styled.div`
    display: flex;
    justify-content: space-between;
    color: #666;
    font-size: .5rem;
`;

const Back = styled.div`
    display: flex;
    #arr{
        padding-top: .1rem;
        font-size: .8rem;
        display: flex;
        justify-content: center;
        align-items: center;
    }
`;

const Count = styled.div`
   
`;

const GreyBar = styled.div`
    width: 22.85rem;
    height: .5rem;
    border-radius: .3rem;
    background-color: #efefef;
`;

const PinkBar = styled.div`
    position: absolute;
    bottom: 1rem;
    width: ${props=> props.width};
    height: .5rem;
    border-radius: .3rem;
    background-color: #fe6664;
    animation: ease-in;
`

export default ProgressBar;