import React from "react";

import { useDispatch, useSelector } from "react-redux";
import {history} from '../redux/configureStore';
import { answerActions } from "../redux/modules/answer";

import WriteUser from "./WriteUser";
import Viewer from '../components/Viewer'
import Div from "../elements/Div";

import { getUserId } from "../shared/cookie";
import { plzLogin } from "../shared/getPages";
import { IsLike, requestCanEdit } from "../shared/conditions";
import { categoryEncoder } from "../shared/categoryEncoder";

import { FiHeart } from 'react-icons/fi';
import { FaHeart } from 'react-icons/fa';

import styled from "styled-components";

const AnswerContent = (props) => {
    const dispatch = useDispatch();
    const { videoRef, fileList, videoUrl, answerId, answerWriterId, imgUrl } = props;

    // 리덕스 상 따로 빼온 이유는 props로 전달받은 인자로는 화면상 변화가 일어나지않기 때문임
    const likeList = useSelector(state => state.answer.answer.likeUserList);

    // 좋아요 버튼을 누를 시 작동하는 함수
    const push = () => {
        // 로그인 요청 식
        if(plzLogin()){return}
        const data = {
            answerId: props.answerId,
            userId: getUserId(),
        }
        dispatch(answerActions.pushLikeDB(data));
    }

    // 답변글 삭제 버튼을 누를 시 작동하는 함수
    const delAnswer =() => {
        if(window.confirm('정말로 삭제하시겠습니까?')){
            dispatch(answerActions.deleteAnswerDB(answerId));
        }
    }

    return (
        <React.Fragment>
            <div>
                {/* 상단 */}
                <Div display='flex'justify='space-between'>
                    <div>
                        <Div fontSize='.75rem' color='#666' padding='0 0 .4rem' >
                            {/* 영어로 전달받은 카테고리를 다시 한글로 바꿔주는 함수 */}
                            {categoryEncoder(props.category)}
                        </Div>
                        <Div fontSize='1rem' >
                            {props.title}
                        </Div>
                    </div>
                    
                    <Div _onClick={push}
                    display='flex' justify='center' items='center' fontSize='.75rem'
                    width='1.5rem' height='1.5rem' border='.08rem solid #efefef' Bradius='1.5rem'
                    padding='.1rem 0 0' margin='.3rem 0 0' Bsizing='border-box'
                    // 좋아요를 했는지 판단해주는 함수 이에 따라 버튼의 뷰가 달라짐
                    bc={IsLike(likeList) ? '#efefef' : '#fff'}
                    color={IsLike(likeList) ? '#ff7a7a' : '#9e9e9e'}>
                        {IsLike(likeList) ?<FaHeart /> : <FiHeart />}
                    </Div>
                    
                </Div>

                {/* 중단 */}
                <Div display='flex' justify='space-between' borderB='.1rem solid #f5f5f5' padding='0 0 .6rem' margin='.6rem 0 0' >
                    <WriteUser profile={imgUrl} writer={props.answerWriter} modifiedAt={props.modifiedAt} answerWriterId={props.answerWriterId}/>
                    {/* 요청글의 수정삭제 판단해주는 식에 마감 부분을 opened로 고정하여 답변글 작성자만이
                    수정 삭제할 수 있는 조건식으로 사용 */}
                    { requestCanEdit('opened',answerWriterId) &&
                    <div>
                        <BtnPair style={{marginRight:'0.4rem'}} onClick={()=>{history.push(`/answeredit/${props.answerId}`)}} >수정</BtnPair>
                        <BtnPair onClick={delAnswer} >삭제</BtnPair>
                    </div>}
                </Div>

                {/* 하단 */}
                <Div padding='5px 0' >
                    <Div width='100%' padding='.6rem  0' fontSize='.75rem' color='#666' whiteSpace='pre-line' >
                        {props.content}
                    </Div>
                    {/*  영상 또는 이미지를 보여주는 뷰어 is_answer에 따라 보여주는 점이 달라짐 */}
                    <Viewer type='answer' id={answerId} videoRef={videoRef} fileList={fileList} video={videoUrl} is_answer/>
                </Div>
            </div>
        </React.Fragment>
    )
}

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

export default AnswerContent;