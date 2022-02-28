import React, { useState, useMemo } from "react";
import ReactQuill, { Quill } from "react-quill";
import 'react-quill/dist/quill.snow.css';

const QuillEditor = (props) => {
    const [value, setValue] = useState('');    
    const inputRef = React.useRef();

    const loging = (editor) =>{
        const _editor = inputRef.current.getEditorContents();
        console.log(_editor);
    }

    const modules = useMemo(()=>{
        return {
            toolbar: [
                // 제목용 
                  [{ 'header': [1, 2, false] }],
                // 폰트 꾸미기   
                  ['bold', 'underline','strike'],
                // 폰트 색 지정 []은 기본 설정 value에 할당함으로 커스텀 가능  
                  [{'color':[]}, {'background':[]}],
                // 서식 꾸미기  
                  ['blockquote',],
                // 글자외 부분들  
                  ['link', 'image','video'],
                ],
        }
    });
      

    const formats = [
        // 제목 느낌 주는 header
        'header',
        // 폰트 꾸미기
        'bold', 'underline', 'strike', 'background','color',
        // 서식 꾸미기
        'blockquote',
        // 서식 이외의 것들
        'link', 'image' , 'video'
      ]

    return (
        <>
        <ReactQuill 
            placeholder="당신이 해낸 일을 보여주세요."
            ref={inputRef}
            modules={modules} formats={formats}
            theme="snow" value={value} 
            onChange={setValue} />
            <button onClick={loging} >check</button>
        </>
    )
};

export default QuillEditor;