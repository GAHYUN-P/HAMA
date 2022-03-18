import React from "react";

import styled from "styled-components";

const RecommendCard = (props) => {

    return(
        <Card>
          <div id='cat' >카테/고리</div>
          <div id='con' >
            <Title>빵을 야무지게 먹어보았습니다</Title>            
            <Small>빵을 야무지게 먹어보았습니...</Small>            
          </div>
          <div id='time' >21.07.10</div>
          <div id='like' >♡ 20</div>
        </Card>
    )
}

const Card = styled.div`
  display: flex;
  padding: ${({theme})=> theme.paddings.xxl} 0;
  border-bottom: solid .1rem #e5e5e1;
  #cat{
    width: 4rem;
    display: flex;
    align-items: center;
    color: #9e9e9e;
    font-size: ${({theme})=> theme.fontSizes.small};
  }
  #con{
    width: 12rem;
  }
  #time{
    width: 4.8rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: ${({theme})=> theme.fontSizes.small};
  }
  #like{
    width: 4rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: ${({theme})=> theme.fontSizes.small};
  }
`;

const Small = styled.div`
  color: #666;
  font-size: ${({theme})=> theme.fontSizes.small};
`;

const Title = styled.div`
  color: #212121;
  font-size: .8rem;
`;  

export default RecommendCard;