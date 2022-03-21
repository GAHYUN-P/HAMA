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
    const requestData = useSelector(state => state.post.request);
    const postId = props.match.params.postId;
    const [content,setContent] = useState('');

    React.useEffect(()=>{
        if(Number(postId) !== requestData.postId){
            dispatch(postActions.getOneRequest(postId));
            return
        }
        setContent(requestData.content);
        dispatch(imgActions.setEdit(requestData.fileList));
    },[])

    React.useEffect(()=>{
        if(requestData.fileList){
            setContent(requestData.content);
            dispatch(imgActions.setEdit(requestData.fileList));
        }
    },[requestData])

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