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
    // 작성 시 로딩을 띄우기위한 리덕스 스테이트
    const { loading } = useSelector(state=> state.post);
    // 사진 갯수를 알려주기 위해 현재 올라간 이미지의 배열을 가져옴
    const { files } = useSelector(state => state.image);
    
    // 제목 내용은 ref로 카테고리 난이도 시간은 state로 가져옴
    const titleRef = React.useRef();
    const contentRef = React.useRef();
    const [category, setCategory] = useState('');
    const [level, setLevel] = useState('');
    const [time,setTime] = useState('기한없음');

    const timeset = ['기한없음','3시간','6시간','12시간','24시간'];

    // 작성 시 작동하는 함수
    const posting = () => {
        const title = titleRef.current.value;
        const content = contentRef.current.value;
        const timeSet = time === '기한없음' ? 0 : Number(time.split('시')[0]);
        // 제목과 내용 카테고리 난이도를 고르지 않으면 작성할 수 없음
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
        // 디스패치로 미들웨어의 함수를 호출
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
                <div>사진등록<Explain>{files.length}/5</Explain></div>
            </Selections>
                <ImageUploader />

            {/* 태그 */}
            <Selections>
                <div>카테고리</div>
            </Selections>
            <div style={{width:'100%', margin:'0.85rem auto 0'}} >
                {Categories.map((c,i)=>{
                    // 태그가 선택된것임을 나타내기위해 카테고리 스테이트를 넘겨줌
                    return (<Tag
                            key={i}
                            tag={category}
                            _onClick={(e)=>{setCategory(e.target.innerHTML)}}
                            >{c}</Tag>)
                })}
            </div>
            
            {/* 시간설정 */}
            <Selections>
                시간설정
            </Selections>
            <div style={{width:'100%', margin:'10px auto 0'}} >
                <div>
                {timeset.map((t,i)=>{
                    // 태그가 선택된것임을 나타내기위해 시간 스테이트를 넘겨줌
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
            {/* 로딩이 진행되는 경우 등록이나 취소버튼을 누를 수 없게 조건을 달아줌 */}
            { !loading && 
            <BtnGrid>
                <Btn onClick={()=>{history.goBack()}}>취소</Btn>
                <Btn onClick={posting}>등록</Btn>
            </BtnGrid>}
        </Grid>
        {/* 로딩 시 보여줄 컴포넌트 */}
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
    
const Explain = styled.span`
    font-size: ${({theme})=> theme.fontSizes.small};
    margin-left: ${({theme})=> theme.margins.small};
    color: #ff7a7a;
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