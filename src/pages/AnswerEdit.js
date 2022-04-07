import React, {useState} from "react";

import { useDispatch, useSelector } from 'react-redux';
import { answerActions } from '../redux/modules/answer';
import { imgActions } from "../redux/modules/image";
import { history } from "../redux/configureStore";

import ImageUploader from '../components/ImageUploader';
import VideoUploader from '../components/VideoUploader';
import Header from '../components/Header';
import WaitForAMoment from '../components/WaitForAMoment';

import styled from "styled-components";

const AnswerEdit = (props) => {
    const dispatch = useDispatch();
    // 현재 수정할 답변글의 아이디를 params로 가져옴
    const answerId = props.match.params.answerId;
    // 리덕스 상에 있는 답변글의 데이터를 가져옴-> 수정페이지에 넣어주기 위함
    const answerData = useSelector(state => state.answer.answer);
    // 제목과 내용을 다루기 위한 state
    const [title,setTitle] = useState('');
    const [content,setContent] = useState('');

    React.useEffect(()=>{
        // 현재 답변글의 아이디와 params로 받은 아이디가 
        // 다른 경우 해당하는 답변글로 dispatch 
        if(answerData.answerId !== answerId){
            dispatch(answerActions.getOneAnswer(answerId));
        }
        const data = {
            file: answerData.fileList,
            video: answerData.videoUrl
        };
        // 수정페이지들의 데이터를 초기화
        // 제목과 내용을 초기화
        setTitle(answerData.title);
        setContent(answerData.content);
        // 프리뷰를 초기화
        dispatch(imgActions.editAnswer(data));
    },[])

    // 만일 새로고침이나 다른 이유로 답변글의 데이터가 없어진다면 
    // 다시 요청받아온 데이터로 수정페이지의 데이터들을 초기화 해줌
    React.useEffect(()=>{
        const data = {
            file: answerData.fileList,
            video: answerData.videoUrl
        };

        setTitle(answerData.title);
        setContent(answerData.content);
        dispatch(imgActions.editAnswer(data));
    },[answerData])

    // 수정버튼을 누를 시 작동하는 함수
    const edit = () => {
        if(!title || !content){
            window.alert('빈칸이 있습니다.')
        }
        dispatch(answerActions.editAnswerDB({title:title,content:content},answerId));
    }

    // 데이터가 없는 경우 잠시 로딩 페이지를 보여줌
    if(!answerData){
        return <WaitForAMoment />
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