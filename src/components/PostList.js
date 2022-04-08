import React, { useEffect, useState, intersectionObserver, IntersectionObserverEntry } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import styled from 'styled-components';
import PostEach from './PostEach';
import { postActions } from '../redux/modules/post';
import ReactLoading from "react-loading";

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
    
    const [target, setTarget] = useState(""); // target
    const [isLoading, setIsLoading] = useState(false); // isloading
    const [length, setLength] = useState(0);

    const increase = () => {
        setLength(lengths => lengths + 10);
    };
    

    // postlist 리덕스로부터 가져오기
    const post_list = useSelector((state) => state.post.list);

    const itemList = useSelector((state) => state.post.itemList);
    console.log(post_list);

    

    const onIntersect = async ([entry], observer) => {
        if (entry.isIntersecting && !isLoading) {
          observer.unobserve(entry.target);
          setIsLoading(true);
          dispatch(postActions.cutItemList());
          await new Promise((resolve) => setTimeout(resolve, 500));
          setIsLoading(false);
          observer.observe(entry.target);
        }
      };

    useEffect(() => {
        let observer;
        if (target) {
          // callback 함수, option
          observer = new IntersectionObserver(onIntersect, {
            threshold: 0.4,
          });
          observer.observe(target); // 타겟 엘리먼트 지정
        }
        return () => observer && observer.disconnect();
    }, [target]);

    
    

    return (
        <Grid>
            {itemList.map((info, idx) => {
                return (
                    <PostEach key={idx} {...info}/>
                );
            })}
            {isLoading ? (
              <LoaderWrap>
                <ReactLoading type="balls" color="#FAA3A2" />
              </LoaderWrap>
            ) : (
              ""
            )}
            <div ref={setTarget}/>
        </Grid>   
    );
};

const Grid = styled.div`
    padding-bottom: 3.5rem;
`;

const LoaderWrap = styled.div`
  width: 100%;
  height: 80%;
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
`;

export default PostList;