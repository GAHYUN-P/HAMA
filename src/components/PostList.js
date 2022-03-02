import React, { useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import styled from 'styled-components';
import PostEach from './PostEach';
import { postActions } from '../redux/modules/post';
import { postAPI } from '../shared/api';

const PostList = (props) => {
    // post 모듈에 처음에 전체 데이터 넣어주는 thunk 함수 만들어준담에
    // 아예 여기서 thunk써서 이니셜 데이터 쑤셔넣어 useEffect써

    const dispatch = useDispatch();

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