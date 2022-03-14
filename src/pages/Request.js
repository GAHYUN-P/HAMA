import React, { useState } from 'react';

// 최소단위 컴포넌트
import Tag from '../elements/Tag';
import Level from '../elements/Level';
import ImageUploader from '../components/ImageUploader';
import Header from '../components/Header';

import { useDispatch } from 'react-redux';
import { postActions } from '../redux/modules/post';

import styled from 'styled-components';

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
    const timeset = ['기한없음','3시간','6시간','12시간','24시간'];

    const posting = () => {
        const title = titleRef.current.value;
        const content = contentRef.current.value;
        const timeSet = time === '기한없음' ? 0 : Number(time.split('시')[0]);
        if(!title || !content || !category || !level){
            window.alert('제목,내용,분야,난이도는 필수 선택사항입니다!')
            return
        }
        const data = {
            title: title,
            content: content,
            category: category,
            level: level,
            timeSet: timeSet,
        }
        console.log(data)
        // dispatch(postActions.makeRequest(data));
    }

    return(
    <React.Fragment>
        <Header />   
        <Grid>
            <div style={{width:'100%', margin:'0 auto'}} >
                {/* 제목 */}
                <Titles>
                    <h3>제목</h3>
                </Titles>
                <TitleInput 
                ref={titleRef}
                placeholder='제목을 입력해주세요(최대 25자)' />
                
                {/* 내용 */}
                <Contents>
                    <h3>내용</h3>
                </Contents>
                <div style={{width:'100%'}} >
                    <ContentArea
                    ref={contentRef}
                    placeholder='요청할 내용을 작성해 주세요.'
                    rows={25}/>
                </div>
            </div>

            {/* 이미지 업로드 */}
            <Selections>
                <h3>사진등록</h3>
            </Selections>
                <ImageUploader />

            {/* 태그 */}
            <Selections>
                <h3>카테고리</h3>
            </Selections>
            <div style={{width:'100%', margin:'0.85rem auto 0'}} >
                {categoies.map((c,i)=>{
                    return (<Tag
                            key={i}
                            tag={category}
                            _onClick={(e)=>{setCategory(e.target.innerHTML)}}
                            >{c}</Tag>)
                })}
            </div>
            
            {/* 시간설정 */}
            <Selections>
                <h3>시간설정</h3>
            </Selections>
            <div style={{width:'100%', margin:'10px auto 0'}} >
                <div>
                {timeset.map((t,i)=>{
                    return(
                        <Tag 
                        key={i}
                        tag={time}
                        _onClick={(e)=>{setTime(e.target.innerHTML)}}>{t}</Tag>
                    )
                })}
                </div>
            </div>
            
            {/* 난이도 */}
            <Selections >
                <h3>난이도</h3>
            </Selections>
            <Level />
            <div style={{fontSize:'0.72rem',color:'#ff5e5e',marginTop:'0.75rem',fontWeight:'100'}} >
                ※요청을 등록한 이후에는 삭제할 수 없습니다.
            </div>
            <div style={{display:'flex', justifyContent:'space-evenly', margin:'50px 0 0'}} >
                <button onClick={()=>{}} style={{width:'80px', height:'30px',border:'none',}} >취소</button>
                <button onClick={posting} style={{width:'80px', height:'30px',border:'none',}} >작성</button>
            </div>
        </Grid>
    </React.Fragment>
    )
};

const Grid = styled.div`
    padding: 0 ${({theme})=> theme.paddings.default};
`;

const Titles = styled.div`
    margin: 1.4rem 0 ${({theme})=>theme.paddings.small};
`;
const Contents = styled.div`
    margin: 1.5rem 0 ${({theme})=>theme.paddings.small};
`;

const Selections = styled.div`
margin: 3rem 0 ${({theme})=>theme.paddings.small};
`

const TitleInput = styled.input`
    width: 100%;
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
    width: 100%;
    border: none;
    border-radius: .5rem;
    outline: none;
    padding: ${({theme})=>theme.paddings.xxl};
    background-color: #f5f5f5;
    &::placeholder{
        color: #dcdcdc;
        font-size: ${({theme})=> theme.fontSizes.base};
    }
`;

export default Request;