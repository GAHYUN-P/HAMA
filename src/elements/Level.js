import React from 'react'
import styled from 'styled-components';

const Level = (props) => {
    const { children, _onClick, level } = props

    const levelColor = level === children ? 'coral' : '#ddd';

    return(
        <React.Fragment>
            <ElLevel levelColor={levelColor} onClick={_onClick} >{children}</ElLevel>
        </React.Fragment>
    )
}

const ElLevel = styled.button`
    width: 70px;
    height: 70px;
    margin: 0 10px;
    border-radius: 70px;
    background-color: ${props => props.levelColor};
    border: none;
    font-size: 18px;
`;

export default Level;