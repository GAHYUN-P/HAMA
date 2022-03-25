import React from "react";

import { history } from '../redux/configureStore';
import share from '../assets/share_button.svg'

import { initKakao, shareResultKakao } from "../shared/kakaoShare";

import styled from "styled-components";

const ResultBtns = (props) => {

      React.useEffect(()=>{
        initKakao();
      },[]);

    return (
      <Grid>
        <BtnGrid>
          <ReDo onClick={()=>{history.replace('/survey')}} >다시하기</ReDo>
          <Set onClick={()=>{history.replace('/mypage')}} >등록하기</Set>
        </BtnGrid>
        <Share onClick={()=>{shareResultKakao(props)}} src={share} />
      </Grid>
    );
}

const Grid = styled.div`
    margin: 3rem auto 5rem;
    width: 80%;
`;

const BtnGrid = styled.div`
    display: flex;
    justify-content: space-between;
`;

const ReDo = styled.button`
    width: 48%;
    padding: .85rem 0;
    font-size: ${({theme})=> theme.fontSizes.small};
    color: #fff;
    border-radius: .3rem;
    background-color: #9e9e9e;
`;

const Set = styled.button`
    width: 48%;
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