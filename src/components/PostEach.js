import React, { useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { history } from '../redux/configureStore';
import styled from 'styled-components';

const PostEach = (props) => {

    const titleOnClick = () => {
        history.push(`/requestdetail/${props.id}`);
    }

    return (
        <TitleEach onClick = {titleOnClick}>
        <div>{props.title}</div>
        <div></div>
         | {props.content} | {props.modifiedAt} | {props.answerCount} | 좋아요{props.postLikeCount}
        </TitleEach>
    );
};

const TitleEach = styled.div`
    font-size: ${({ theme }) => theme.fontSizes.base};
`;

export default PostEach;