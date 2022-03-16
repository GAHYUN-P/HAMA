import React, {useState} from "react";

import { useDispatch, useSelector } from 'react-redux';
import { answerActions } from '../redux/modules/answer';
import { imgActions } from "../redux/modules/image";
import { getUserId } from "../shared/cookie";
import { history } from "../redux/configureStore";

import ImageUploader from '../components/ImageUploader';
import VideoUploader from '../components/VideoUploader';
import Header from '../components/Header';

import styled from "styled-components";

const AnswerEdit = (props) => {
    const dispatch = useDispatch();
    const answerId = props.match.params.answerId;
    const answerData = useSelector(state => state.answer.answer);
    const [title,setTitle] = useState('');
    const [content,setContent] = useState('');
    console.log(answerData);

    React.useEffect(()=>{
        if(answerData.answerId !== answerId){
            dispatch(answerActions.getOneAnswer(answerId));
        }
        const data = {
            file: answerData.fileList,
            video: answerData.videoUrl
        };
        setTitle(answerData.title);
        setContent(answerData.content);
        dispatch(imgActions.editAnswer(data));
    },[])

    React.useEffect(()=>{
        const data = {
            file: answerData.fileList,
            video: answerData.videoUrl
        };
        setTitle(answerData.title);
        setContent(answerData.content);
        dispatch(imgActions.editAnswer(data));
    },[answerData])

    const edit = () => {
        if(!title || !content){
            window.alert('빈칸이 있습니다.')
        }
        dispatch(answerActions.editAnswerDB({title:title,content:content},answerId));
    }

    return (
        <React.Fragment>
            <Header />
            <Grid>

                <Titles>
                    제목
                </Titles>
                <TitleInput placeholder='제목을 입력해주세요.' 
                value={title} onChange={(e)=>{setTitle(e.target.value)}}
                style={{width:'100%',border:'none',outline:'none',borderBottom:'1px solid black', padding:'4px'}} />

    
                <Contents>
                    내용
                </Contents>
                <ContentArea placeholder='내용을 작성해 주세요.' rows={15}
                value={content} onChange={(e)=>{setContent(e.target.value)}}/>

                <Selections>
                    이미지
                </Selections>
                <ImageUploader is_edit={true} />

                <VideoUploader is_edit={true} />

                <BtnGrid>
                    <Btn onClick={()=>{history.goBack()}}>취소</Btn>
                    <Btn onClick={edit}>등록</Btn>
                </BtnGrid>
            </Grid>
        </React.Fragment>
    )
};

const Grid = styled.div`
    padding: 0 ${({theme})=> theme.paddings.default};
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

export default AnswerEdit;