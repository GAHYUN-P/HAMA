import React, { useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import styled from 'styled-components';
import MypageListEach from './MypageListEach';
import { utilActions } from '../redux/modules/util';
import { utilAPI } from '../shared/api';

const MypageList = (props) => {
    // 트러블 슈팅: 카테고리 누르면 나오는데 안누르고 딱 로딩됐을때
    // 전체페이지가 안나왔었음
    // post 모듈에 처음에 전체 데이터 넣어주는 thunk 함수 만들어준담에
    // 아예 여기서 thunk써서 이니셜 데이터 쑤셔넣어 useEffect써

    const dispatch = useDispatch();

    // 전체 리스트 불러오기
    React.useEffect(() => {
        dispatch(utilActions.getMypost());
    }, []);

    
    const category = useSelector((state) => state.util.category);
    const mypost_list = useSelector((state) => state.util.mypost);
    const myanswer_list = useSelector((state) => state.util.myanswer);
    

    if(category === 'mypost') {
        return (
            <div>
                {mypost_list.map((info, idx) => {
                    return (
                    <MypageListEach
                        key={info.requestId}
                        title={info.title}
                        modifiedAt={info.modifiedAt}
                        likeCount={info.postLikeCount}
                        />
                    );
                })}
            </div>   
        );
    }


    return (
        <div>
            {myanswer_list.map((info, idx) => {
                return (
                <MypageListEach
                    key={info.answerId}
                    title={info.title}
                    modifiedAt={info.modifiedAt}
                    likeCount={info.postLikeCount}
                    />
                );
            })}
        </div>   
    );
};

export default MypageList;