import React, { useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import styled from 'styled-components';
import MypageListEach from './MypageListEach';
import { mypageActions } from '../redux/modules/mypage';

const MypostList = (props) => {

    const dispatch = useDispatch();

    // 전체 리스트 불러오기
    React.useEffect(() => {
        dispatch(mypageActions.getMypost());
    }, []);

    const mypost_list = useSelector((state) => state.mypage.mypost);
    const prev_list = mypost_list.slice(0,2);
    
    

    return (
        <div>
            <div>내가 요청한 글</div>
            {prev_list.map((info, idx) => {
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
};

export default MypostList;