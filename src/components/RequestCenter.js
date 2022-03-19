import React from 'react';

import { useDispatch } from 'react-redux';
import { postActions } from '../redux/modules/post';
import { getUserId, getToken } from '../shared/cookie';

import { FiHeart } from 'react-icons/fi';
import { FaHeart } from 'react-icons/fa';

import styled from 'styled-components';

const RequestCenter = (props) => {
    const dispatch = useDispatch();

    const pushlike = () => {
        if(!getToken()){
            window.alert('로그인 후 시도해주세요.')
            return
        }
        dispatch(postActions.pushLikeDB(props.request.postId));
    }

    const is_like = props.like.includes(Number(getUserId())) ? true : false;
    return (
        <React.Fragment>
            <CenterContainer>
                <div onClick={pushlike} >
                    { is_like ? 
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
        </React.Fragment>
    )
}

const CenterContainer = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    padding: ${({theme})=> theme.paddings.small} 0 0;
    margin: 0 0 ${({theme})=> theme.margins.divGap};
`;

const Texts = styled.div`
    color: #666;
    font-size: ${({theme})=> theme.fontSizes.small};
    padding: 0 0 .2rem .4rem;
`;

export default RequestCenter;