import React, { useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { history } from '../redux/configureStore';
import styled from 'styled-components';

const PostEach = (props) => {
    const { title, content, modifiedAt, answerCount, postLikeCount, id } = props
    
    const titleOnClick = () => {
        history.push(`/requestdetail/${id}`);
    }

    return (
        <TitleEach onClick = {titleOnClick}>
        <div>{title}</div>
        <div></div>
         | {content} | {modifiedAt} | {answerCount} | 좋아요{postLikeCount}
        </TitleEach>
    );
};

const TitleEach = styled.div`
    font-size: ${({ theme }) => theme.fontSizes.base};
`;

export default PostEach;