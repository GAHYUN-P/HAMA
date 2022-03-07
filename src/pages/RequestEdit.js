import React, {useState} from 'react';

import ImageUploader from '../components/ImageUploader';

import { useDispatch } from 'react-redux';
import { postActions } from '../redux/modules/post';

const RequestEdit = (props) => {
    const dispatch = useDispatch();
    const postId = props.match.params.postId;
    const [content,setContent] = useState('내용입니다.');

    const editing = () => {
        
    }

    return(
        <React.Fragment>
            <div style={{width:'90%',padding:'8px 4px'}} >
        {/* 제목과 내용 */}
        <div style={{width:'90%', margin:'0 auto'}} >
            <div style={{margin:'10px 0'}} >
                <h3>제목</h3>
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
            <ImageUploader />
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