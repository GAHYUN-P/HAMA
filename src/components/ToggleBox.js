import React, { useState, useRef } from 'react';

import styled from 'styled-components';

const ToggleBox = (props) => {
    // 박스를 여닫기위해 사용하는 스테이트
    const [state, setState] = useState(false);
    // 성별을 정하기 위해 전해받은 스테이트와 함수
    const { gender ,setGender } = props;
    // 토글을 나타내기 위해 사용할 ref
    const toggleRef = useRef();
    
    // 토글 상태를 조절하는 함수 ref를 이용하여 css를 조절하여 나타냄
    const openClose = () => {
        // state가 true라면 안보이도록 만든후 false로 바꿈
        if(state){
            toggleRef.current.style = 'display: none;'
            setState(false);
        }
        // state가 false라면 보이도록 만든후 true로 바꿈
        if(!state){
            toggleRef.current.style = 'display: block;'
            setState(true);
        }
    }

    return(
        <React.Fragment>
                <ToggleGrid>
                    <OpenBtn onClick={openClose} >{gender ? gender : '선택해주세요.'}</OpenBtn>
                    <Box ref={toggleRef} >
                        <Select onClick={(e)=>{setGender('남');openClose();}} >남</Select>
                        <Line />
                        <Select onClick={(e)=>{setGender('여');openClose();}} >여</Select>
                    </Box>
                </ToggleGrid>
    
        </React.Fragment>
    )
};

const ToggleGrid = styled.div`
    position: relative;
`;

const OpenBtn = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 7rem;
    height: 2.5rem;
    color: #9e9e9e;
    border: 1px solid #dcdcdc;
    border-radius: .3rem;
    background-color: #fff;
`;

const Box = styled.div`
    display: none;
    position: absolute;
    top: 2.4rem;
    width: 7rem;
    border-radius: .3rem;
    border: 1px solid #dcdcdc;
    box-shadow: 0 .1rem .2rem #dcdcdc;
`;

const Select = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: .5rem 0;
    color: #9e9e9e;
    &:hover{
        background-color: #dcdcdc;
    }
`;

const Line = styled.hr`
    width: 80%;
    margin: 0 auto;
    color: #efefef;
`;

export default ToggleBox;