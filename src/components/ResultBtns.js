import React from "react";

import { history } from '../redux/configureStore';
import share from '../assets/share_button.svg'

import styled from "styled-components";

const ResultBtns = (props) => {
    
    return (
      <Grid>
        <BtnGrid>
          <ReDo onClick={()=>{history.replace('/survey')}} >다시하기</ReDo>
          <Set onClick={()=>{history.replace('/mypage')}} >등록하기</Set>
        </BtnGrid>
        <Share src={share} />
      </Grid>
    );
}

const Grid = styled.div`
    padding: 3rem 3rem 5rem;
`;

const BtnGrid = styled.div`
    display: flex;
    justify-content: space-between;
`;

const ReDo = styled.button`
    width: 8rem;
    padding: .85rem 0;
    font-size: ${({theme})=> theme.fontSizes.small};
    color: #fff;
    border-radius: .3rem;
    background-color: #9e9e9e;
`;

const Set = styled.button`
    width: 8rem;
    padding: .85rem 0;
    font-size: ${({theme})=> theme.fontSizes.small};
    color: #fff;
    border-radius: .3rem;
    background-color: #ff7a7a;
`;

const Share = styled.img`
    width: 100%;
    margin-top: 1rem;
    border-radius: .3rem;
`;

export default ResultBtns;