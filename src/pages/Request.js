import React, { useState } from 'react';
import ReactQuill from 'react-quill';

import Tag from '../elements/Tag';
import Level from '../elements/Level';

import { useDispatch } from 'react-redux';
import { postActions } from '../redux/modules/post';
import axios from 'axios';

const Request = (props) => {
    const dispatch = useDispatch();

    const [title, setTitle] = useState(''); 
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');
    const [level, setLevel] = useState('');

    const token = document.cookie.split('=')[1];    

    // 카테고리와 레벨 배열
    const categoies = [
        '먹방/요리','운동','지식','창작','방문','직업',
        '반려동물','패션/뷰티','고민상담','가전','생활','기타'
    ]
    const levels = ['상','중','하']

    const modules = {
        toolbar: [
            ['bold','underline','strike',{'color':[]},{'background':[]}]
        ]
    };

    const formats = [
        'bold', 'underline', 'strike', 'background','color',
      ];

    const posting = () => {
        if(!title || !content || !category || !level){
            window.alert('모든 항목을 채워주세요.')
            return
        }
        const data = {
            title: title,
            content: content,
            category: category,
            level: level
        }

        dispatch(postActions.makeRequest(data));

        // const config = {
        //     headers:{
        //         'token':token
        //     }
        // }

        // axios.post('/api/post',data,config)
        // .then(res => {
        //     window.alert('성공')
        // })
        // .catch(err => {
        //     window.alert('error')
        // })
    }

    console.log(token);

    return(
    <React.Fragment>
        <div>
        {/* 제목과 내용 */}
        <div style={{width:'90%', padding:'8px', margin:'0 auto'}} >
            <div style={{margin:'10px 0'}} >
                <h3>제목</h3>
            </div>
            <input placeholder='제목을 입력해주세요.' value={title} onChange={(e)=>{setTitle(e.target.value)}}
            style={{width:'100%',border:'none',outline:'none',borderBottom:'1px solid black', padding:'4px'}} />
            <div style={{margin:'10px 0'}} >
                <h3>내용</h3>
            </div>
            <ReactQuill 
            value={content}
            onChange={setContent}
            modules={modules}
            formats={formats}
            style={{height:'200px',}} />
        </div>

        {/* 태그 */}
        <div style={{width:'90%', margin:'50px auto 0'}} >
            <div style={{margin:'10px 0 20px'}} >
                <h3>카테고리</h3>
            </div>
            {categoies.map((c,i)=>{
                return (<Tag
                            key={i}  
                            _onClick={(e)=>{setCategory(e.target.innerHTML)}} >
                            {c}</Tag>)
            })}
        </div>
        {/* 난이도 */}
        <div style={{width:'90%', margin:'0 auto'}}>
            <div style={{margin:'10px 0'}} >
                <h3>난이도</h3>
            </div>
            <div style={{width:'auto', margin:'auto'}} >
            {levels.map((l,i)=>{
                return (<Level key={i} _onClick={(e)=>{setLevel(e.target.innerHTML)}} >{l}</Level>)
            })}
            </div>
        </div>
        <div style={{display:'flex', justifyContent:'center', margin:'50px 0 100px'}} >
            <button onClick={posting} style={{width:'80px', height:'30px',border:'none',}} >작성</button>
        </div>
        </div>
    </React.Fragment>
    )
};

export default Request;