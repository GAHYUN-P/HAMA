import React from "react";
import styled from "styled-components";


const Tag = (props) => {
    const { children, _onClick, tag } = props

    const tagColor = tag === children ? 'coral' : '#eee';

    return(
        <Eltag tagColor={tagColor} onClick={_onClick} >{children}</Eltag>
    )
}

const Eltag = styled.button`
    min-width: 70px;
    width: auto;
    height: 30px;
    margin: 0 5px 10px;
    border: 1px solid #ffcd48;
    border-radius: 20px;
    background-color: ${props => props.tagColor};
`

export default Tag;