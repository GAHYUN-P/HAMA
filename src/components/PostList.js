import React, { useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import styled from 'styled-components';
import PostEach from './PostEach';
import { postActions } from '../redux/modules/post';
import { postAPI } from '../shared/api';

const PostList = (props) => {

    // const dispatch = useDispatch();

    // React.useEffect(() => {
    //     const totalList = postAPI.getPostList();
    //     dispatch(postActions.setList(totalList.data));
    // }, []);

    // postlist 리덕스로부터 가져오기
    const post_list = useSelector((state) => state.post.list);
    console.log(post_list);

    return (
        <div>
            {post_list.map((info, idx) => {
                return (
                <PostEach
                    key={info.postId}
                    title={info.title}
                    content={info.content}
                    modifiedAt={info.modifiedAt}
                    answerCount={info.answerCount}
                    postLikeCount={info.postLikeCount}
                    />
                );
            })}
        </div>   
    );
};

export default PostList;