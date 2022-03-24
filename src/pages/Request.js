import React, { useState } from 'react';

// 최소단위 컴포넌트
import Tag from '../elements/Tag';
import Level from '../elements/Level';
import ImageUploader from '../components/ImageUploader';
import Header from '../components/Header';
import WaitForAMoment from '../components/WaitForAMoment';

import { useDispatch, useSelector } from 'react-redux';
import { postActions } from '../redux/modules/post';
import { history } from '../redux/configureStore';

import { Categories, EngCategoryEncoder } from '../shared/categoryEncoder';

import styled from 'styled-components';

const Request = (props) => {
    const dispatch = useDispatch();
    const { loading } = useSelector(state=> state.post);

    const contentRef = React.useRef();
    const titleRef = React.useRef();
    const [category, setCategory] = useState('');
    const [level, setLevel] = useState('');
    const [time,setTime] = useState('기한없음');

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
            category: EngCategoryEncoder(category),
            level: level,
            timeSet: timeSet,
        }
        dispatch(postActions.makeRequest(data));
    }

    return(
    <React.Fragment>
        <Header />   
        <Grid>
            <div style={{width:'100%', margin:'0 auto'}} >
                {/* 제목 */}
                <Titles>
                    제목
                </Titles>
                <TitleInput 
                ref={titleRef}
                placeholder='제목을 입력해주세요(최대 25자)' />
                
                {/* 내용 */}
                <Contents>
                    <div>내용</div>
                </Contents>
                <div style={{width:'100%'}} >
                    <ContentArea
                    ref={contentRef}
                    placeholder='요청할 내용을 작성해 주세요.'
                    rows={15}/>
                </div>
            </div>

            {/* 이미지 업로드 */}
            <Selections>
                <div>사진등록</div>
            </Selections>
                <ImageUploader />

            {/* 태그 */}
            <Selections>
                <div>카테고리</div>
            </Selections>
            <div style={{width:'100%', margin:'0.85rem auto 0'}} >
                {Categories.map((c,i)=>{
                    return (<Tag
                            key={i}
                            tag={category}
                            _onClick={(e)=>{setCategory(e.target.innerHTML)}}
                            >{c}</Tag>)
                })}
            </div>
            
            {/* 시간설정 */}
            <Selections>
                <div>시간설정</div>
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
                <div>난이도</div>
            </Selections>
            <Level level={level} setLevel={setLevel} />
            <div style={{fontSize:'0.72rem',color:'#ff5e5e',marginTop:'0.75rem',fontWeight:'100'}} >
                ※요청을 등록한 이후에는 삭제할 수 없습니다.
            </div>
            { !loading && 
            <BtnGrid>
                <Btn onClick={()=>{history.goBack()}}>취소</Btn>
                <Btn onClick={posting}>등록</Btn>
            </BtnGrid>}
        </Grid>
        { loading && <WaitForAMoment /> }
    </React.Fragment>
    )
};

const Grid = styled.div`
    padding: 0 ${({theme})=> theme.paddings.default};
`;

const Contents = styled.div`
    margin: 1.5rem 0 ${({theme})=>theme.paddings.small};
    font-size: 1.2rem;
`;

const Selections = styled.div`
    margin: 3rem 0 ${({theme})=>theme.paddings.small};
    font-size: 1.15rem;
`
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

export default Request;