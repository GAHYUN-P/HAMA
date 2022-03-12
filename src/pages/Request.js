import React, { useState } from 'react';

// 최소단위 컴포넌트
import Tag from '../elements/Tag';
import Level from '../elements/Level';
import ImageUploader from '../components/ImageUploader';
import Header from '../components/Header';

import { useDispatch } from 'react-redux';
import { postActions } from '../redux/modules/post';

const Request = (props) => {
    const dispatch = useDispatch();

    const contentRef = React.useRef();
    const titleRef = React.useRef();
    const [category, setCategory] = useState('');
    const [level, setLevel] = useState('');
    const [time,setTime] = useState('기한없음');

    // 카테고리와 레벨 배열
    const categoies = [
        '먹방/요리','운동','지식','창작','방문','직업',
        '반려동물','패션/뷰티','고민상담','가전','생활','기타'
    ];
    const levels = ['상','중','하'];
    const timeset = ['기한없음','3','6','12','24'];

    const posting = () => {
        const title = titleRef.current.value;
        const content = contentRef.current.value;
        const timeSet = time === '기한없음' ? 0 : Number(time)
        if(!title || !content || !category || !level){
            window.alert('제목,내용,분야,난이도는 필수 선택사항이다 이 새꺄!')
            return
        }
        const data = {
            title: title,
            content: content,
            category: category,
            level: level,
            timeSet: timeSet,
        }
        dispatch(postActions.makeRequest(data));
    }

    return(
    <React.Fragment>
         <Header />   
        <div style={{width:'90%', height:'100%',padding:'8px 4px',overflowY:'scroll'}} >
        {/* 제목과 내용 */}
        <div style={{width:'100%', margin:'0 auto'}} >
            <div style={{margin:'10px 0'}} >
                <h3>제목</h3>
            </div>
            <input 
            ref={titleRef}
            placeholder='제목을 입력해주세요.' 
            style={{width:'100%',border:'none',outline:'none',borderBottom:'1px solid black', padding:'4px',boxSizing:'border-box'}} />
            
            <div style={{margin:'10px 0',display:'flex',justifyContent:'space-between'}} >
                <h3>내용</h3>
            </div>
            <div style={{width:'100%'}} >
                <textarea
                ref={contentRef}
                placeholder='요청할 내용을 작성해 주세요.'
                rows={5} 
                style={{
                    width:'100%', padding:'16px 12px', fontSize:'1.25rem',
                    border:'none', outline:'none', backgroundColor:'#efe',
                    boxSizing:'border-box' }} />
            </div>
        </div>

        {/* 이미지 업로드 */}
        <div style={{width:'100%', margin:'0 auto'}} >
            <h3>사진등록</h3>
            <ImageUploader />
        </div>

        {/* 태그 */}
        <div style={{width:'100%', margin:'10px auto 0'}} >
            <div style={{margin:'10px 0 10px'}}>
                <h3>카테고리</h3>
            </div>
            {categoies.map((c,i)=>{
                return (<Tag
                        key={i}
                        tag={category}
                        _onClick={(e)=>{setCategory(e.target.innerHTML)}}
                        >{c}</Tag>)
            })}
        </div>
        
        {/* 시간설정 */}
        <div style={{width:'100%', margin:'10px auto 0'}} >
            <div style={{margin:'10px 0 10px'}}>
                <h3>시간설정</h3>
            </div>
            <div>
            {timeset.map((t,i)=>{
                return(
                    <Tag 
                    key={i}
                    tag={time}
                    value={t}
                    _onClick={(e)=>{setTime(e.target.innerHTML)}}>{t}</Tag>
                )
            })}
            </div>
        </div>
        
        {/* 난이도 */}
        <div style={{width:'100%', margin:'0 auto'}}>
            <div style={{margin:'10px 0'}} >
                <h3>난이도</h3>
            </div>
            <div style={{width:'auto', margin:'auto'}} >
            {levels.map((l,i)=>{
                return (<Level 
                        key={i}
                        level={level}
                        _onClick={(e)=>{setLevel(e.target.innerHTML)}}
                        >{l}</Level>)
            })}
            </div>
            <span style={{fontSize:'0.8rem',color:'red'}} >요청을 등록한 이후에는 삭제할 수 없습니다.</span>
        </div>
        <div style={{display:'flex', justifyContent:'space-evenly', margin:'50px 0 0'}} >
            <button onClick={()=>{}} style={{width:'80px', height:'30px',border:'none',}} >취소</button>
            <button onClick={()=>{}} style={{width:'80px', height:'30px',border:'none',}} >임시작성</button>
            <button onClick={posting} style={{width:'80px', height:'30px',border:'none',}} >작성</button>
        </div>
        </div>
    </React.Fragment>
    )
};

export default Request;