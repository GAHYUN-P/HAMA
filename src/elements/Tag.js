import React from "react";
import styled from "styled-components";


const Tag = (props) => {
    const { children, _onClick, tag, value } = props

    if(tag === children){
        return(
        <Selected onClick={_onClick} value={value} >
                {children}
        </Selected>
        )
    }

    return(
        <Eltag onClick={_onClick} value={value} >
                {children}
        </Eltag>
    )
}

const Eltag = styled.button`
    min-width: 3.6rem;
    width: auto;
    height: 1.7rem;
    color: #666;
    font-size: ${({theme})=>theme.fontSizes.small};
    width: auto;
    padding: 5px 0.7rem;
    margin: 0 4px 12px;
    border: none;
    border-radius: 20px;
    background-color: #eee;
`;

const Selected = styled.button`
    min-width: 3.6rem;
    width: auto;
    height: 1.7rem;
    color: #fff;
    font-size: ${({theme})=>theme.fontSizes.small};
    width: auto;
    padding: 5px 0.7rem;
    margin: 0 4px 12px;
    border: none;
    border-radius: 20px;
    background-color: #ff7a7a;
`; 

export default Tag;