import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { answerActions } from '../redux/modules/answer';
import { history } from '../redux/configureStore';

import ImageUploader from '../components/ImageUploader';
import VideoUploader from '../components/VideoUploader';
import Header from '../components/Header';

import loading from '../assets/logo_final.svg';

import styled, { keyframes } from 'styled-components';


const Answer = (props) => {
    const dispatch = useDispatch();
    const { answerLoading } = useSelector(state=>state.answer);
    const postId = props.match.params.postId
    const titleRef = React.useRef();
    const contentRef = React.useRef();

    const answering = () => {
      const title = titleRef.current.value;
      const content = contentRef.current.value;
      const data = {
        title:title,
        content:content
      }
      dispatch(answerActions.answeringDB(data,postId))
    }

    return (
        <React.Fragment>
            <Header />
            { answerLoading &&
            <WaitGrid>
                <Wait src={loading} />
            </WaitGrid>}

            <Grid >
                {/* 제목 */}
                <Titles>
                    제목
                </Titles>
                <TitleInput 
                placeholder='제목을 입력해주세요.' 
                ref={titleRef}/>

                {/* 내용 */}
                <Contents>
                    <div>내용</div>
                </Contents>
                <ContentArea placeholder='내용을 작성해 주세요.' rows={15} ref={contentRef}/>
                
                {/* 이미지 */}
                <Selections>
                사진등록
                </Selections>
                <ImageUploader />

                {/* 동영상 */}
                <VideoUploader />
                { !answerLoading && 
                <BtnGrid>
                    <Btn onClick={()=>{history.goBack()}}>취소</Btn>
                    <Btn onClick={answering}>등록</Btn>
                </BtnGrid>}
            </Grid>
        </React.Fragment>
    )
}

const Grid = styled.div`
    width: 100%;
    height: 100%;
    padding: 0 ${({theme})=> theme.paddings.default};
    position: relative;
`;

const TitleInput = styled.input`
    width: 100%;
    font-size: ${({theme}) => theme.fontSizes.base};
    border: none;
    outline: none;
    border-bottom: 1px solid #dcdcdc;
    box-sizing: border-box;
    padding: ${({theme})=>theme.paddings.small} 0;
    &::placeholder{
        color: #dcdcdc;
        font-size: ${({theme})=> theme.fontSizes.base};
    }
`;

const ContentArea = styled.textarea`
    resize: none;
    font-size: ${({theme}) => theme.fontSizes.base};
    width: 100%;
    border: none;
    border-radius: .3rem;
    outline: none;
    padding: ${({theme})=>theme.paddings.xxl};
    background-color: #f5f5f5;
    &::placeholder{
        color: #dcdcdc;
        font-size: ${({theme})=> theme.fontSizes.base};
    }
`;

const Titles = styled.div`
    margin: 1.4rem 0 ${({theme})=>theme.paddings.small};
    font-size: 1.2rem;
`;

const Contents = styled.div`
    margin: 1.5rem 0 ${({theme})=>theme.paddings.small};
    font-size: 1.2rem;
`;

const Selections = styled.div`
    margin: 3rem 0 ${({theme})=>theme.paddings.small};
    font-size: 1.15rem;
`;
const BtnGrid = styled.div`
    display: flex;
    justify-content: right;
    margin: 2.2rem 0 3.8rem;
`;

const Btn = styled.button`
    border: none;
    width: 3.8rem;
    height: 2.3rem;
    border-radius: .3rem;
    margin-right: .4rem;
    &:hover {
        background-color: #ff7a7a;
        color: #fff;
    }
`;

const WaitGrid =styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0,0,0,0.3);
`;

const rotating = keyframes`
    0%{
        transform:rotate(0deg)
    }
    20%{
        transform:rotate(72deg)
    }
    40%{
        transform:rotate(144deg)
    }
    60%{
        transform:rotate(216deg)
    }
    80%{
        transform:rotate(288deg)
    }
    100%{
        transform:rotate(360deg)
    }
`;

const Wait = styled.img`
    width: 30%;
    animation: ${rotating} 2s 1s infinite linear;
`;

export default Answer;