import React from "react";

import { history } from '../redux/configureStore';
import { useDispatch, useSelector } from "react-redux";
import { postActions } from "../redux/modules/post";

import Viewer from "./Viewer";
import { requestCanEdit } from "../shared/conditions";  
import { categoryEncoder } from '../shared/categoryEncoder';

import styled from "styled-components";

import good_c from '../assets/good_c.svg'
import fair_c from '../assets/fair_c.svg'
import poor_c from '../assets/poor_c.svg'

const RequestContents = (props) => {
    const dispatch = useDispatch();
    const { category, title, level, content, fileList, nickname, modifiedAt,
        postId, timeSet, user_id } = props;
        // 마감 상태를 따로 리덕스로 가져온 이유는 props로 넘겨받는 데이터로는 
        // 실제 state로 삼을 수 없기에 컴포넌트 상 변화가 일어나지 않기 때문임  
    const _conclusion = useSelector(state => state.post.request.status);

    // 마감 버튼을 누르면 발동하는 함수
    const conclusion = () => {
        if(window.confirm('마감을 누르시면 되돌릴 수 없습니다. 마감하시겠습니까?')){
            dispatch(postActions.concluseRequestDB(postId));
            return;
        };
        console.log('마감이 취소되었습니다.');
    };

    return(
        <React.Fragment>
            <div style={{width:'100%'}} >
                <CategoryTitle>
                    {categoryEncoder(category)}
                </CategoryTitle>
                {/* 상위 버튼들 */}
                <Buttons>
                    <div style={{ display:'flex' }} >
                        <TimeLimit>{timeSet}</TimeLimit>
                        <LevelBox>
                            {/* 난이도에 따라 나오는 이미지가 달라짐 */}
                            {level === '상' && <LevelImg url={good_c} /> }
                            {level === '중' && <LevelImg url={fair_c} /> }
                            {level === '하' && <LevelImg url={poor_c} /> }
                        </LevelBox>
                    </div>
                    {/* 요청글을 수정 및 마감을 할 수 있는 조건식: 마감이 되지않고 해당글을 작성한
                    유저여야만 수정 및 마감을 할 수 있음 */}
                    {requestCanEdit(_conclusion,user_id) &&
                    <div style={{ display:'flex' }} >
                        <BtnPair onClick={conclusion} style={{marginRight:'0.4rem'}} >마감</BtnPair>
                        <BtnPair onClick={()=>{history.push(`/request/${postId}`)}} >수정</BtnPair>
                    </div>}
                </Buttons>  
                <ContentBox>
                        <ContentTitle>{title}</ContentTitle>
                        <ContentText>{content}</ContentText>
                        <ContentFrom>{nickname}  {modifiedAt}</ContentFrom>             
                </ContentBox>
                {fileList.length !== 0 &&
                <div style={{marginTop:'.7rem'}} >
                    <Viewer type='post' id={postId} fileList={fileList}/>
                </div>}
            </div>
        </React.Fragment>
    )
}

const CategoryTitle = styled.div`
    font-size: 1.1rem;
    font-weight: 600;
`;

const Buttons = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin: ${({theme})=>theme.margins.xxxl} 0 ${({theme})=>theme.margins.base};
`;

const TimeLimit = styled.button`
    border: none;
    padding: ${({theme})=> theme.paddings.small} ${({theme})=> theme.paddings.xxl};
    margin-right: 0.55rem;
    font-weight: 600;
    color: #ff7a7a;
    background-color: #f8f8fa;
    border-radius: 0.3rem;
`;

const LevelBox = styled.div`
    width: 2.8rem;
    display: felx;
    justify-content: center;
    align-items: center;
    background-color: #f8f8fa;
    border-radius: 0.3rem;
`;

const LevelImg = styled.div`
    width: 1.5rem;
    height: 1.5rem;
    background-image: url(${props => props.url});
    background-size: cover;
`;

const BtnPair = styled.button`
    border: none;
    font-size: ${({theme})=>theme.fontSizes.small};
    font-weight: 600;
    padding: ${({theme})=> theme.paddings.small} ${({theme})=> theme.paddings.base};
    color: #666;
    background-color: #f8f8fa;
    border-radius: 0.3rem;
    &:hover {
        color: #fff;
        background-color: #ff7a7a;
    }
`;

const ContentBox = styled.div`
    width: 100%;
    background-color: #f5f5f5;
    border-radius: 0.3rem;
    padding: ${({theme})=> theme.paddings.xxl} ${({theme})=> theme.paddings.default} ${({theme})=> theme.paddings.default};
`;

const ContentTitle = styled.div`
    border-bottom: 1px solid #9e9e9e;
    padding-bottom: ${({theme})=> theme.paddings.lg};
`;

const ContentText = styled.div`
    width: 100%;
    font-size: ${({theme})=> theme.fontSizes.small};
    color: #666;
    padding-top: ${({theme})=> theme.paddings.small};
    margin-bottom: ${({theme})=> theme.margins.divGap};
    white-space: pre-line;
`;

const ContentFrom = styled.div`
    font-size: ${({theme})=> theme.fontSizes.xsmall};
    color: #9e9e9e;
`;

export default RequestContents;