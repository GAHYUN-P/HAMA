import React, { useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import styled from 'styled-components';

const PostEach = (props) => {

    // onclick에 history.push로 상세페이지로 이동하게 하기
    return (
        <div>
        {props.title} | {props.content} | {props.modifiedAt} | {props.answerCount} | 좋아요{props.postLikeCount}
        </div>
    );
};

export default PostEach;