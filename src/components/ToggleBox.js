import React, { useState, useRef } from 'react';

import styled from 'styled-components';

const ToggleBox = (props) => {
    const [state, setState] = useState(false);
    const { gender ,setGender } = props;
    // const [gender, setGender] = useState('');
    const toggleRef = useRef();
    
    const openClose = () => {
        if(state){
            toggleRef.current.style = 'display: none;'
            setState(false);
        }
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