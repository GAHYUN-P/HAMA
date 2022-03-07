import React, {useState} from 'react';

import ImageUploader from '../components/ImageUploader';

import { useDispatch, useSelector } from 'react-redux';
import { postActions } from '../redux/modules/post';
import { imgActions } from '../redux/modules/image';

const RequestEdit = (props) => {
    const dispatch = useDispatch();
    const requestData = useSelector(state => state.post.request);
    const postId = props.match.params.postId;
    const [content,setContent] = useState(requestData.content);

    React.useEffect(()=>{
        if(Number(postId) !== requestData.postId){
            dispatch(postActions.getOneRequest(postId));
            return
        }
        setContent(requestData.content);
        dispatch(imgActions.setEdit(requestData.fileList));
    },[])

    const editing = () => {
        if(!content){
            window.alert('내용이 비어있으면 수정할 수 없어요.')
            return
        }
        dispatch(postActions.editRequestDB(postId,content));
    }

    return(
        <React.Fragment>
            <div style={{width:'90%',padding:'8px 4px'}} >
        {/* 제목과 내용 */}
        <div style={{width:'90%', margin:'0 auto'}} >
            <div style={{margin:'10px 0'}} >
                <h3>제목</h3>
                <p>{requestData.title}</p>
            </div>
            <h3>내용</h3>
            <div style={{width:'100%'}} >
                <textarea
                value={content}
                onChange={(e)=>{setContent(e.target.value)}}
                placeholder='요청할 내용을 작성해 주세요.'
                rows={5} 
                style={{
                    width:'100%', padding:'16px 12px', fontSize:'1.25rem',
                    border:'none', outline:'none', backgroundColor:'#ddd',
                    boxSizing:'border-box' }} />
            </div>
        </div>

        {/* 이미지 업로드 */}
        <div style={{width:'90%', margin:'0 auto'}} >
            <h3>이미지</h3>
            <ImageUploader is_edit={true} />
        </div>
        {/* 작성버튼 */}
        <div style={{display:'flex', justifyContent:'center', margin:'50px 0 0'}} >
            <button onClick={editing} style={{width:'80px', height:'30px',border:'none',}} >완료</button>
        </div>
        </div>
        </React.Fragment>
    )
};

export default RequestEdit;