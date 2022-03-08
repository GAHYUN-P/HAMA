import React from 'react';

import { useDispatch } from 'react-redux';
import { postActions } from '../redux/modules/post';
import { getUserId, getToken } from '../shared/cookie';

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

    const likeColor = props.like.includes(Number(getUserId())) ? 'coral' : '#ccc';
    return (
        <React.Fragment>
            <div style={{ width:'90%', margin:'10px auto 0' }} >
                <LikeBtn onClick={pushlike} likeColor={likeColor} >좋아요 {props.like.length}</LikeBtn>
                <div style={{display:'inline-block'}} >응답 {props.request.answerCount}</div>
            </div>
        </React.Fragment>
    )
}

const LikeBtn = styled.div`
    display: inline-block;
    background-color: ${props => props.likeColor};
`

export default RequestCenter;