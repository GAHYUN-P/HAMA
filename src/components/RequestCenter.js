import React from 'react';

import { useDispatch } from 'react-redux';
import { postActions } from '../redux/modules/post';
import { IsLike, canWrite } from '../shared/conditions';
import { plzLogin } from '../shared/getPages';

import SharedBtn from '../elements/SharedBtn';
import AnswerWriteBtn from '../elements/AnswerWriteBtn';

import { FiHeart } from 'react-icons/fi';
import { FaHeart } from 'react-icons/fa';

import styled from 'styled-components';

const RequestCenter = (props) => {
    const dispatch = useDispatch();
    const { postId, request } =props;

    const pushlike = () => {
        // 로그인을 하지않으면 좋아요를 누를 수 없음 이 때 원한다면 
        // 로그인 페이지로 이동시켜주는 조건식
        if(plzLogin()){return}
        dispatch(postActions.pushLikeDB(props.request.postId));
    };

    return (
        <React.Fragment>
            <Wrap>
                <CenterContainer>
                    <div onClick={pushlike} >
                        {/* 해당 유저가 게시글에 대해 좋아요를 눌렀는지 판단해주는 조건식 */}
                        { IsLike(props.like) ? 
                        <FaHeart style={{color:'#ff7a7a',fontSize:'1.05rem'}} />
                        :
                        <FiHeart style={{color:'#666',fontSize:'1.05rem'}} />  }  
                    </div>
                    <Texts>
                        좋아요 {props.like.length}개
                    </Texts>
                    <Texts>
                        응답 {props.request.answerCount}개
                    </Texts>
                </CenterContainer>
                <SharedBtn {...request} />
            </Wrap>
                {/* 글쓰기 버튼 */}
                {/* 답변글을 작성할 수 있는지 판단하는 조건식: 글이 마감되지않고 해당 요청글을 
                작성하지않은 유저만이 답변글 작성 버튼을 볼 수 있음 */}
                { canWrite(request.status,request.user_id) &&
                <AnswerWriteBtn postId={postId} /> }
        </React.Fragment>
    )
}

const Wrap = styled.div`
    display: flex;
    padding: ${({theme})=> theme.paddings.small} 0 0;
    margin: 0 0 ${({theme})=> theme.margins.xxxl};
`;

const CenterContainer = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
`;

const Texts = styled.div`
    color: #666;
    font-size: ${({theme})=> theme.fontSizes.small};
    padding: 0 0 .2rem .4rem;
`;

export default RequestCenter;