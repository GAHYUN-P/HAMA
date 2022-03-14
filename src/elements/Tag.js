import React from "react";
import styled from "styled-components";


const Tag = (props) => {
    const { children, _onClick, tag } = props

    if(tag === children){
        return(
        <Selected onClick={_onClick} >
            <div style={{fontWeight:'600'}} >
                {children}
            </div>
        </Selected>
        )
    }

    return(
        <Eltag onClick={_onClick} >
            {children}
        </Eltag>
    )
}

const Eltag = styled.button`
    min-width: 4.2rem;
    height: 1.7rem;
    color: #666;
    font-size: ${({theme})=>theme.fontSizes.small};
    width: auto;
    padding: 5px ${({theme})=>theme.paddings.small};
    margin: 0 4px 12px;
    border: none;
    border-radius: 20px;
    background-color: #eee;
`;

const Selected = styled.button`
    min-width: 4.2rem;
    height: 1.7rem;
    color: #fff;
    font-size: ${({theme})=>theme.fontSizes.small};
    width: auto;
    padding: 5px ${({theme})=>theme.paddings.small};
    margin: 0 4px 12px;
    border: none;
    border-radius: 20px;
    background-color: #ff7a7a;
`; 

export default Tag;