import React from 'react'
import styled from 'styled-components';

const Level = (props) => {
    const { children, _onClick } = props

    return(
        <React.Fragment>
            <ElLevel onClick={_onClick} >{children}</ElLevel>
        </React.Fragment>
    )
}

const ElLevel = styled.button`
    width: 70px;
    height: 70px;
    margin: 0 10px;
    border-radius: 70px;
    background-color: #ddd;
    border: none;
    font-size: 18px;
`;

export default Level;