import React from 'react';
import styled from 'styled-components';
import { Wrapper } from '../elements';

import ina from '../assets/ina.svg';
import gh from '../assets/gh.svg';
import jg from '../assets/jg.svg';
import gj from '../assets/gj.svg';
import yt from '../assets/yt.svg';
import sh from '../assets/sh.svg';
import mk from '../assets/mk.svg';

import { FiMail } from "react-icons/fi";


const DevInfo = (props) => {


  return (
    <Wrapper>
        <Title>만든 사람들</Title>
        <Paragraph>
            <ImageWrap>
                <Image src={gh}/>
            </ImageWrap>
            <Contents>
                <SemiTitle>
                    <div>FE</div>박가현</SemiTitle>
                <Role>Project Manager</Role>
                <Role>Project Leader</Role>
                <Role>Project Engineer</Role>
                <Contact>
                 gahyun94526@gmail.com
                </Contact>
            </Contents>
        </Paragraph>
        <Paragraph>
            <ImageWrap>
                <Image src={mk}/>
            </ImageWrap>
            <Contents>
                <SemiTitle>
                    <div>BE</div>김민기</SemiTitle>
                <Role>Project Leader</Role>
                <Role>Project Engineer</Role>
                <Contact>
                    minkik715@gmail.com
                </Contact>
            </Contents>
        </Paragraph>
        <Paragraph>
            <ImageWrap>
                <Image src={jg}/>
            </ImageWrap>
            <Contents>
                <SemiTitle>
                    <div>BE</div>박재균</SemiTitle>
                <Role>Project Engineer</Role>
                <Contact>
                    rkdnjsxpzm@gmail.com
                </Contact>
            </Contents>
        </Paragraph>
        <Paragraph>
            <ImageWrap>
                <Image src={gj}/>
            </ImageWrap>
            <Contents>
                <SemiTitle>
                    <div>BE</div>이규진</SemiTitle>
                <Role>Project Engineer</Role>
                <Contact>
                    rbwls44@naver.com
                </Contact>
            </Contents>
        </Paragraph>
        <Paragraph>
            <ImageWrap>
                <Image src={yt}/>
            </ImageWrap>
            <Contents>
                <SemiTitle>
                    <div>FE</div>유영탁</SemiTitle>
                <Role>Project Engineer</Role>
                <Contact>
                    yongzhuo502@gmail.com
                </Contact>
            </Contents>
        </Paragraph>
        <Paragraph>
            <ImageWrap>
                <Image src={ina}/>
            </ImageWrap>
            <Contents>
                <SemiTitle>
                    <div>DS</div>곽인아</SemiTitle>
                <Role>UI/UX Designer</Role>
                <Contact>
                    rhkrdlsdk99@naver.com
                </Contact>
            </Contents>
        </Paragraph>
        <Paragraph>
            <ImageWrap>
                <Image src={sh}/>
            </ImageWrap>
            <Contents>
                <SemiTitle>
                    <div>DS</div>이수현</SemiTitle>
                <Role>UI/UX Designer</Role>
                <Contact>
                    tngust@naver.com
                </Contact>
            </Contents>
        </Paragraph>

    </Wrapper>
  );
};

const Paragraph = styled.div`
    /* margin: 10px; */
    padding: 10px;
    background-color: #EFEFEF;
    border-radius: 10px;
    display: flex;
    margin-bottom: 10px;
    height: 20vh;
    justify-content: space-between;
    position: relative;
`;

const Title = styled.div`
    font-family: 'Noto-Sans-KR-M';
    font-size: ${({ theme }) => theme.fontSizes.xl};
    padding-bottom: 10px;
`;

const ImageWrap = styled.div`
    width: 45%;
    height: 100%;
    background-color: white;
    border-radius: 10px;
    padding: 0.5rem;
`;

const Image = styled.img`
    width: 100%;
    height: 100%;
`;

const Contents = styled.div`
    width: 50%;
    margin: 1rem 0px;
`;

const SemiTitle = styled.div`
    font-family: 'Noto-Sans-KR-M';
    font-size: ${({ theme }) => theme.fontSizes.lg};
    padding-bottom: 10px;
    > div {
        font-size: ${({ theme }) => theme.fontSizes.xsmall};
        background-color: #FF7A7A;
        color: white;
        border-radius: 5px;
        padding: 0px 0.2rem;
        display: inline-block;
        vertical-align: 1px;
        margin-right: 3px;
        
    }
`;

const Role = styled.div`
    color: #666666;
    font-size: ${({ theme }) => theme.fontSizes.small};
`;

const Contact = styled.div`
    position: absolute;
    bottom: 1rem;
`;



const Caution = styled.div`
    color: #FF7A7A;
`;


export default DevInfo;
