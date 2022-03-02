import React, { useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import styled from 'styled-components';

const PostEach = (props) => {
    // postlist 리덕스로부터 가져오기
    const post_list = useSelector((state) => state.post.list);
    console.log(post_list);

    // onclick에 history.push로 상세페이지로 이동하게 하기
    return (
        <div>
        {props.title} | {props.content} | {props.modifiedAt} | {props.answerCount} | {props.postLikeCount}
        </div>
    );
};

export default PostEach;