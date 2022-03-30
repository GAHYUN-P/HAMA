import React, {useState} from 'react';

import ImageUploader from '../components/ImageUploader';
import Header from '../components/Header';

import { useDispatch, useSelector } from 'react-redux';
import { postActions } from '../redux/modules/post';
import { imgActions } from '../redux/modules/image';
import { history } from '../redux/configureStore';

import styled from 'styled-components';

const RequestEdit = (props) => {
    const dispatch = useDispatch();
    // 현재 리덕스 상에 있는 요청글의 데이터 가져옴
    const requestData = useSelector(state => state.post.request);
    // params로 넘겨받은 해당 요청글의 아이디
    const postId = props.match.params.postId;
    // 내용을 다루기위한 state
    const [content,setContent] = useState('');

    React.useEffect(()=>{
        // params로 넘겨받은 아이디와 리덕스 상의 아이디가 다르다면 다시 데이터 요청
        if(Number(postId) !== requestData.postId){
            dispatch(postActions.getOneRequest(postId));
            return
        }
        // 수정하기위해 해당 요청글의 데이터로 초기화
        setContent(requestData.content);
        dispatch(imgActions.setEdit(requestData.fileList));
    },[])

    React.useEffect(()=>{
        // 새로고침 시 리덕스 상의 데이터가 다 사라짐으로
        // 데이터 요청 후 다시 초기화 해주기위한 함수
        if(requestData.fileList){
            setContent(requestData.content);
            dispatch(imgActions.setEdit(requestData.fileList));
        }
    },[requestData])

    // 수정버튼을 누를 시 작동하는 함수
    const editing = () => {
        if(!content){
            window.alert('내용이 비어있으면 수정할 수 없어요.')
            return
        }
        dispatch(postActions.editRequestDB(postId,content));
    }

    return(
        <React.Fragment>
        <Header />
        <Grid>
        {/* 제목과 내용 */}
             
            <Titles>
                제목
            </Titles>
            <TitleInput value={requestData.title} disabled={true} />
               
            <Contents>
                내용
            </Contents>
            <ContentArea
            value={content}
            onChange={(e)=>{setContent(e.target.value)}}
            placeholder='요청할 내용을 작성해 주세요.'
            rows={15}/>
   
            {/* 이미지 업로드 */}
            <h3>이미지</h3>
            <ImageUploader is_edit={true} />
            
            {/* 작성버튼 */}
            <BtnGrid>
                <Btn onClick={()=>{history.goBack()}}>취소</Btn>
                <Btn onClick={editing}>등록</Btn>
            </BtnGrid>
        </Grid>
        </React.Fragment>
    )
};

const Grid = styled.div`
    padding: 0 ${({theme})=> theme.paddings.default};
`;

const Titles = styled.div`
    margin: 1.4rem 0 ${({theme})=>theme.paddings.small};
    font-size: 1.2rem;
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

const Contents = styled.div`
    margin: 1.5rem 0 ${({theme})=>theme.paddings.small};
    font-size: 1.2rem;
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

export default RequestEdit;