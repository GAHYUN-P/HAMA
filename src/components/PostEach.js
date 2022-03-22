import React, { useEffect } from 'react';

import { useSelector,useDispatch } from 'react-redux';
import { history } from '../redux/configureStore';

import {FiHeart} from 'react-icons/fi';
import {GoNote} from 'react-icons/go';

import styled from 'styled-components';

const PostEach = (props) => {
    const { title, content, modifiedAt, answerCount, postLikeCount, id,
        imgUrl, timeSet, writer, status } = props;
        
    const titleOnClick = () => {
        history.push(`/requestdetail/${id}`);
    }

    return (
        <TitleEach onClick = {titleOnClick}>
            {/* 프로필 */}
            <ProHippo src={imgUrl} />
            {/* 내용 */}
            <ContentGrid>
                <Title>
                    {title}
                </Title>
                <SubInfo pad={title.length > 23 ? '0' : '.3rem'} >
                    {writer} 
                    <Icon>{modifiedAt}</Icon>
                    <Icon><FiHeart/></Icon>{postLikeCount}  
                    <Icon><GoNote/></Icon>{answerCount}
                </SubInfo>
            </ContentGrid>
            {/* 마감시간 */}
            <ConclusionBox>
                {status === 'closed'
                    ? <div style={{fontWeight: 'bold'}}>답변 마감</div>
                    : <div>{timeSet}</div>            
                }
            </ConclusionBox>
        </TitleEach>
    );
};

const TitleEach = styled.div`
    display: flex;
    justify-content: space-between;
    border-bottom: .05rem solid #efefef;
`;

const ContentGrid = styled.div`
    width: 16rem;
    margin: ${({theme})=> theme.paddings.base} 0 0;
    padding: 0 ${({theme})=> theme.paddings.base};
`;

const Title = styled.div`
font-size: ${({theme})=> theme.fontSizes.base};
`;

const SubInfo = styled.div`
    display: flex;
    padding-top: ${props => props.pad};
    font-size: ${({theme})=> theme.fontSizes.xsmall};
    color: #9e9e9e;
`;

const Icon = styled.div`
    display: flex;
    padding: 0 .15rem;
    justify-content: center;
    align-items: center;
`;

const ConclusionBox = styled.div`
    display: flex;
    padding: .5rem 0;
    width: 3.5rem;
    margin: ${({theme})=> theme.paddings.base} 0;
    height: 2.7rem;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: ${({theme})=> theme.fontSizes.xsmall};
    color: #ff7a7a;
    border-radius: .3rem;
    background-color: #f5f5f5;
`;

const Close = styled.div`
    font-weight: bold;
`;

const ProHippo = styled.img`
    width: 2.7rem;
    height: 2.7rem;
    margin: ${({theme})=> theme.paddings.base} 0;
`;

export default PostEach;