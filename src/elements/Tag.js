import React from "react";
import styled from "styled-components";


const Tag = (props) => {
    const { children, _onClick } = props

    return(
        <Eltag onClick={_onClick} >{children}</Eltag>
    )
}

const Eltag = styled.button`
    min-width: 70px;
    width: auto;
    height: 30px;
    margin: 0 5px 10px;
    border: 1px solid #ffcd48;
    border-radius: 20px;
`

export default Tag;