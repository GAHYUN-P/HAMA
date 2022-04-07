import React from 'react';

import { history } from '../redux/configureStore';

import { FiChevronLeft } from 'react-icons/fi';

import styled from 'styled-components';

const ProgressBar = (props) => {
    // 진행도를 나타내는 변수 질문이 넘어갈 때마다 
    // 인덱스가 올라감으로 진행도의 길이도 길어짐
    const progress = ((props.q + 1) * 10) + '%';

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
    width: 100%;
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