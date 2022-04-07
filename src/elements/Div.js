import React from "react";
import styled from "styled-components";

const Div = (props) => {
    const { children, _onClick, ref } = props;
    
    return(
        <Grid {...props} onClick={_onClick} ref={ref} >
            {children}
        </Grid>
    )
}

const Grid = styled.div`
    display: ${props => props.display ? props.display : ''};
    flex-direction: ${props => props.direction ? props.direction : ''};
    justify-content: ${props => props.justify ? props.justify : ''};
    align-items: ${props => props.items ? props.items : ''};
    max-width: ${props => props.maxWidth ? props.maxWidth : ''};
    width: ${props => props.width ? props.width : ''};
    height: ${props => props.height ? props.height : ''};
    border: ${props => props.border ? props.border : ''};
    border-radius: ${props => props.Bradius ? props.Bradius : ''};
    border-bottom: ${props => props.borderB ? props.borderB : ''};
    box-sizing: ${props => props.Bsizing ? props.Bsizing : ''};
    padding: ${props => props.padding ? props.padding : ''};
    margin: ${props => props.margin ? props.margin : ''};
    color: ${props => props.color ? props.color : ''};
    font-size: ${props => props.fontSize ? props.fontSize : ''};
    background-color: ${props => props.bc ? props.bc : ''};
    position: ${props => props.position ? props.position : ''};
    top: ${props => props.top ? props.top : ''};
    bottom: ${props => props.bottom ? props.bottom : ''};
    right: ${props => props.right ? props.right : ''};
    left: ${props => props.left ? props.left : ''};
    white-space: ${props => props.whiteSpace ? props.whiteSpace : ''};
`;

export default Div;