import React from "react";

import { useDispatch, useSelector } from "react-redux";
import {history} from '../redux/configureStore';
import { answerActions } from "../redux/modules/answer";

import WriteUser from "./WriteUser";
import Viewer from '../components/Viewer'

import { getUserId } from "../shared/cookie";
import { plzLogin } from "../shared/getPages";
import { IsLike, requestCanEdit } from "../shared/conditions";
import { categoryEncoder } from "../shared/categoryEncoder";

import { FiHeart } from 'react-icons/fi';
import { FaHeart } from 'react-icons/fa';

import styled from "styled-components";

const AnswerContent = (props) => {
    const dispatch = useDispatch();
    // 이미지 리스트
    const { videoRef, fileList, videoUrl, answerId, answerWriterId, imgUrl } = props;

    // 좋아요 작용
    const likeList = useSelector(state => state.answer.answer.likeUserList);

    const push = () => {
        if(plzLogin()){return}
        const data = {
            answerId: props.answerId,
            userId: getUserId(),
        }
        dispatch(answerActions.pushLikeDB(data));
    }

    const delAnswer =() => {
        dispatch(answerActions.deleteAnswerDB(answerId));
    }

    return (
        <React.Fragment>
            <div>
                {/* 상단 */}
                <div style={{display:'flex',justifyContent:'space-between'}} >
                    <div>
                        <CategoryTitle>
                            {categoryEncoder(props.category)}
                        </CategoryTitle>
                        <ContentTitle>
                            {props.title}
                        </ContentTitle>
                    </div>

                    <Likebtn onClick={push}
                    bg={IsLike(likeList) ? '#efefef' : '#fff'}
                    fc={IsLike(likeList) ? '#ff7a7a' : '#9e9e9e'}>
                        {IsLike(likeList) ?<FaHeart /> : <FiHeart />}
                    </Likebtn>
                    
                </div>

                {/* 중단 */}
                <CenterGrid>
                    <WriteUser profile={imgUrl} writer={props.answerWriter} modifiedAt={props.modifiedAt} />
                    { requestCanEdit('opened',answerWriterId) &&
                    <div>
                        <BtnPair style={{marginRight:'0.4rem'}} onClick={()=>{history.push(`/answeredit/${props.answerId}`)}} >수정</BtnPair>
                        <BtnPair onClick={delAnswer} >삭제</BtnPair>
                    </div>}
                </CenterGrid>

                {/* 하단 */}
                <div style={{padding:'5px 0'}} >
                    <ContentBox>
                        {props.content}
                    </ContentBox>
                    
                    <Viewer type='answer' id={answerId} videoRef={videoRef} fileList={fileList} video={videoUrl} is_answer/>
                </div>

            </div>
        </React.Fragment>
    )
}

const CenterGrid = styled.div`
    margin-top: ${({theme})=> theme.margins.lg};
    display: flex;
    justify-content: space-between;
    border-bottom: .1rem solid #f5f5f5;
    padding-bottom: ${({theme})=>theme.paddings.base};
`;

const Likebtn = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: ${({theme})=> theme.fontSizes.small};
    color: ${props => props.fc};
    width: 1.5rem;
    height: 1.5rem;
    border: .08rem solid #efefef;
    border-radius: 1.5rem;
    padding-top: .1rem;
    margin-top: .3rem;
    background-color: ${props => props.bg};
    box-sizing: border-box;
`;

const BtnPair = styled.button`
    border: none;
    font-size: ${({theme})=>theme.fontSizes.small};
    padding: .28rem ${({theme})=> theme.paddings.base};
    color: #666;
    background-color: #f8f8fa;
    border-radius: 0.3rem;
    &:hover {
        color: #fff;
        background-color: #ff7a7a;
    }
`;

const CategoryTitle = styled.div`
    font-size: ${({theme})=> theme.fontSizes.small};
    color: #666;
    padding-bottom: .4rem;
`;

const ContentTitle = styled.div`
    font-size: ${({theme})=> theme.fontSizes.lg};
`;

const ContentBox = styled.div`
    padding: ${({theme})=>theme.paddings.lg} 0;
    font-size: ${({theme})=>theme.fontSizes.small};
    color: #666;
    white-space: pre-line:
`;

export default AnswerContent;