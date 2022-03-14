import React, { useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { history } from '../redux/configureStore';
import styled from 'styled-components';

const PostEach = (props) => {

    const titleOnClick = () => {
        history.push(`/requestdetail/${props.postId}`);
    }

    return (
        <div onClick = {titleOnClick}>
        {props.title} | {props.content} | {props.modifiedAt} | {props.answerCount} | 좋아요{props.postLikeCount}
        </div>
    );
};

export default PostEach;