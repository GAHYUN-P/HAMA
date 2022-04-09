import React from 'react';

import { history } from '../redux/configureStore';

import { alreadyRated } from '../shared/conditions';

import { FiMessageSquare, FiHeart, FiImage } from 'react-icons/fi'

import Div from '../elements/Div';

import styled from 'styled-components';

const AnswerCard = (props) => {
    const { requestWriterId, answerWriter, modifiedAt, title, commentCount, answerId, imageCount, answerLikeCount, imgUrl, star, userId } = props;

    const profileOnClick = () => {
        history.replace(`/userpage/${userId}`);
    };

    return(
        <React.Fragment>
            <Div display='flex' borderB='1px solid #efefef' padding='.6rem 0 .8rem' >
                {/* 프로필 사진 공간 */}
                <Div _onClick={profileOnClick}>
                    <ProHippo src={imgUrl} />
                </Div>

                {/* 카드 내용들 */}
                <Div width='100%' padding='0 0 0 1rem'
                 _onClick={()=>{history.push(`/answerdetail/${answerId}`)}}>
                    <Div display='flex' justify='space-between' fontSize='.95rem' padding='.2rem 0 .2rem' >
                        {title}
                        {/* 평가 완료가 된 글일 경우 나타나는 평가완료 버튼의 조건식 */}
                        { alreadyRated(requestWriterId, star) &&
                        <Rated>평가완료</Rated>}
                    </Div>

                    <Div display='flex' justify='space-between' >
                        {/* 작성자, 작성일 */}
                        <Div fontSize='.62rem' color='#9e9e9e' >
                            {answerWriter} {modifiedAt}
                        </Div>

                        <Div fontSize='.62rem' color='#9e9e9e' >
                            <Div fontSize='.62rem' display='inline-block' height='.8rem' padding='0 .1rem 0 .4rem' >
                                <FiImage/>
                            </Div>
                            {imageCount} 
                            <Div fontSize='.62rem' display='inline-block' height='.8rem' padding='0 .1rem 0 .4rem'>
                                <FiMessageSquare/>
                            </Div>
                            {commentCount}
                            <Div fontSize='.62rem' display='inline-block' height='.8rem' padding='0 .1rem 0 .4rem'>
                                <FiHeart/>
                            </Div>
                            {answerLikeCount}
                        </Div>

                    </Div>
                </Div>
            </Div>
        </React.Fragment>
    )
}

const ProHippo = styled.img`
    width: 3rem;
    height: 3rem;
`;

const Rated = styled.button`
    background-color: #fff;
    border: 1px solid #ff7a7a;
    border-radius: .15rem;
    color: #ff7a7a;
    font-size: ${({theme})=> theme.fontSizes.xsmall};
`;

export default AnswerCard;