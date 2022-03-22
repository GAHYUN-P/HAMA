import React, { useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import styled from 'styled-components';
import PostEach from '../components/PostEach';
import { Wrapper } from '../elements';
import { postActions } from '../redux/modules/post';

const HMpost = (props) => {
    // 트러블 슈팅: 카테고리 누르면 나오는데 안누르고 딱 로딩됐을때
    // 전체페이지가 안나왔었음
    // post 모듈에 처음에 전체 데이터 넣어주는 thunk 함수 만들어준담에
    // 아예 여기서 thunk써서 이니셜 데이터 쑤셔넣어 useEffect써

    const dispatch = useDispatch();

    // 전체 리스트 불러오기
    React.useEffect(() => {
        dispatch(postActions.getHMPostList());
    }, []);

    // postlist 리덕스로부터 가져오기
    const post_list = useSelector((state) => state.post.HMlist);
    console.log(post_list);

    return (
        <div>
            <Wrapper>
                <Grid>
                    {post_list.map((info, idx) => {
                        return (<PostEach key={info.id} {...info}/>);
                    })}
                </Grid> 
            </Wrapper>
        </div>
    );
};

const Grid = styled.div`
    padding-bottom: 3.5rem;
`;

export default HMpost;