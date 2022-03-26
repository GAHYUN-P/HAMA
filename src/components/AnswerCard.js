import React from 'react';

import { history } from '../redux/configureStore';

import { alreadyRated } from '../shared/conditions';

import { FiMessageSquare, FiHeart, FiImage } from 'react-icons/fi'

import styled from 'styled-components';

const AnswerCard = (props) => {
    const { requestWriterId, answerWriter, modifiedAt, title, commentCount, answerId, imageCount, answerLikeCount, imgUrl, star } = props;

    const profileOnClick = () => {
        history.replace(`/userpage/${requestWriterId}`);
    };

    return(
        <React.Fragment>
            <CardContainer>
                {/* 프로필 사진 공간 */}
                <HippoContainer onClick={profileOnClick}>
                    <ProHippo src={imgUrl} />
                </HippoContainer>

                {/* 카드 내용들 */}
                <div style={{width:'100%',padding:'0 0 0 1rem'}}
                 onClick={()=>{history.push(`/answerdetail/${answerId}`)}}>
                    <TitleDiv>
                        {title}
                        { alreadyRated(requestWriterId, star) &&
                        <Rated>평가완료</Rated>}
                    </TitleDiv>

                    <SubContainer>
                        {/* 작성자, 작성일 */}
                        <WriterAndTime>
                            {answerWriter} {modifiedAt}
                        </WriterAndTime>

                        <Icons>
                            <IconWraper>
                                <FiImage/>
                            </IconWraper>
                            {imageCount} 
                            <IconWraper>
                                <FiMessageSquare/>
                            </IconWraper>
                            {commentCount}
                            <IconWraper>
                                <FiHeart/>
                            </IconWraper>
                            {answerLikeCount}
                        </Icons>

                    </SubContainer>
                </div>
            </CardContainer>
        </React.Fragment>
    )
}

const CardContainer = styled.div`
    display: flex;
    border-bottom: 1px solid #efefef;
    padding: ${({theme}) => theme.paddings.base} 0 ${({theme}) => theme.paddings.xl};
`;

const HippoContainer = styled.div`
   
`;

const ProHippo = styled.img`
    width: 3rem;
    height: 3rem;
`;

const TitleDiv = styled.div`
    display: flex;
    justify-content: space-between;
    font-size: ${({theme})=> theme.fontSizes.base};
    font-weight: 300;
    padding: .2rem 0 ${({theme}) => theme.paddings.small};
`;

const Rated = styled.button`
    background-color: #fff;
    border: 1px solid #ff7a7a;
    border-radius: .15rem;
    color: #ff7a7a;
    font-size: ${({theme})=> theme.fontSizes.xsmall};
`;

const SubContainer = styled.div`
    display: flex;
    justify-content: space-between;
`;

const WriterAndTime = styled.div`
    font-size: ${({theme})=>theme.fontSizes.xsmall};
    color: #9e9e9e;
`;

const Icons = styled.div`
    font-size: ${({theme})=>theme.fontSizes.xsmall};
    color: #9e9e9e;
`;

const IconWraper = styled.div`
    font-size: .62rem;
    display: inline-block;
    height: .8rem;
    padding: 0 .1rem 0 .4rem;
`;

export default AnswerCard;