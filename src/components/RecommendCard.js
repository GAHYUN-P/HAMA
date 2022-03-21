import React from "react";

import { categoryEncoder } from '../shared/categoryEncoder';

import styled from "styled-components";

const RecommendCard = (props) => {
    let { category, content, modifiedAt, postLikeCount, postid, title } = props;
    content = content?.length > 15 ? (content.slice(0,14) + '...') : content;


    return(
        <Card>
          <div id='cat' >{categoryEncoder(category)}</div>
          <div id='con' >
            <Title>{title}</Title>            
            <Small>{content}</Small>            
          </div>
          <div id='time' >{modifiedAt}</div>
          <div id='like' >♡ {postLikeCount}</div>
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