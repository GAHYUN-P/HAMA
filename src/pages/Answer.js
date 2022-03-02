import React, { useState, useRef } from 'react';
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';

import ComplexUpload from '../components/ComplexUpload';

const Answer = (props) => {
    const [value, setValue] = useState('');    
    const [contents, setContents] = useState('');
    const [title, setTitle] = useState(''); 
    const inputRef = React.useRef();

    const modules = {
        toolbar: [
        // 폰트 꾸미기   
          ['bold', 'underline','strike'],
        // 폰트 색 지정 []은 기본 설정 value에 할당함으로 커스텀 가능  
          [{'color':[]}, {'background':[]}]
        ],
        // handlers: {

        // }
      }

    const formats = [
        // 폰트 꾸미기
        'bold', 'underline', 'strike', 'background','color',
      ]

    return (
        <React.Fragment>
            <div style={{width:'80%', margin: '16px auto', padding:'16px',}}>
              <div style={{margin:'5px 0'}} >
                <h3>제목</h3>
                <input placeholder='제목을 입력해주세요.' value={title} onChange={(e)=>{setTitle(e.target.value)}}
                style={{width:'100%',border:'none',outline:'none',borderBottom:'1px solid black', padding:'4px'}} />
            </div>
            <div style={{margin:'15px 0'}} >
              <h3>내용</h3>
              <ReactQuill 
              placeholder="당신이 해낸 일을 보여주세요."
              ref={inputRef}
              modules={modules} formats={formats}
              theme="snow" value={value} onChange={setValue} />
            </div>
            <div style={{margin:'10px 0'}} >
              <h3>사진/동영상 등록</h3>
              <ComplexUpload />
            </div>
            </div>
        </React.Fragment>
    )
}

export default Answer;