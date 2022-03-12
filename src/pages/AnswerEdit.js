import React, {useState} from "react";

import { useDispatch, useSelector } from 'react-redux';
import { answerActions } from '../redux/modules/answer';
import { imgActions } from "../redux/modules/image";
import { getUserId } from "../shared/cookie";

import ImageUploader from '../components/ImageUploader';
import VideoUploader from '../components/VideoUploader';
import Header from '../components/Header';

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
            <div style={{width:'80%', margin: '16px auto', padding:'16px'}} >
                
                <div style={{margin:'5px 0'}} >
                    <h3>제목</h3>
                    <input placeholder='제목을 입력해주세요.' 
                    value={title} onChange={(e)=>{setTitle(e.target.value)}}
                    style={{width:'100%',border:'none',outline:'none',borderBottom:'1px solid black', padding:'4px'}} />
                </div>

                <div style={{margin:'15px 0'}} >
                    <h3>내용</h3>
                    <textarea placeholder='내용을 작성해 주세요.' rows={5}
                    value={content} onChange={(e)=>{setContent(e.target.value)}}
                    style={{ width:'100%',border:'none',outline:'none',
                    backgroundColor:'#eee',padding:'24px 8px',borderRadius:'8px' }} />
                </div>

                <div style={{margin:'10px 0'}} >
                    <h3>이미지</h3>
                    <ImageUploader is_edit={true} />
                    <VideoUploader is_edit={true} />
                </div>

                <div style={{display:'flex', justifyContent:'space-evenly', margin:'50px 0 0'}} >
                    <button onClick={()=>{}} style={{width:'80px', height:'30px',border:'none',}} >취소</button>
                    <button onClick={edit} style={{width:'80px', height:'30px',border:'none',}} >완료</button>
                </div>

            </div>
        </React.Fragment>
    )
};

export default AnswerEdit;