import React, { useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import styled from 'styled-components';
import PostEach from './PostEach';
import { postActions } from '../redux/modules/post';
import { postAPI } from '../shared/api';
import { push } from 'connected-react-router';

const PostList = (props) => {
    // 트러블 슈팅: 카테고리 누르면 나오는데 안누르고 딱 로딩됐을때
    // 전체페이지가 안나왔었음
    // post 모듈에 처음에 전체 데이터 넣어주는 thunk 함수 만들어준담에
    // 아예 여기서 thunk써서 이니셜 데이터 쑤셔넣어 useEffect써

    const dispatch = useDispatch();

    // 전체 리스트 불러오기
    React.useEffect(() => {
        dispatch(postActions.getPostList());
    }, []);

    // postlist 리덕스로부터 가져오기
    const post_list = useSelector((state) => state.post.list);
    console.log(post_list);

    const sort = useSelector((state) => state.post.sort);

    const selectTag = async (e) => {
        dispatch(postActions.setTag(e.target.value));
        
        if (e.target.value === 'all') {
          dispatch(postActions.setTag(e.target.value));
          // 전체조회를 선택한 경우 전체조회 API 호출
          const totalList = await postAPI.getPostList();
          dispatch(postActions.setList(totalList.data));
          return
        }

        dispatch(postActions.setTag(e.target.value));
        const tagChatList = await postAPI.selectPostCategory(e.target.value);
        dispatch(postActions.setList(tagChatList.data))
    }

    return (
        <div>
            <button onClick={(e) => { selectTag(e) }} value='latest'>최신순</button>
            <button onClick={(e) => { selectTag(e) }} value='time'>잔여시간</button>
            <button onClick={(e) => { selectTag(e) }} value='like'>좋아요순</button>
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