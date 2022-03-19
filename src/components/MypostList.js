import React, { useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import styled from 'styled-components';
import MypageListEach from './MypageListEach';
import { mypageActions } from '../redux/modules/mypage';
import user from '../redux/modules/user';
import { history } from '../redux/configureStore';

const MypostList = (props) => {

    const dispatch = useDispatch();

    // 전체 리스트 불러오기
    React.useEffect(() => {
        dispatch(mypageActions.getMypost());
    }, []);

    
    const mypost_list = useSelector((state) => state.mypage.mypost);
    const prev_list = mypost_list.slice(0,2);
    console.log(prev_list);
    

    return (
        <div>
            <Title>내가 요청한 글</Title>
            {prev_list.map((info, idx) => {
                return (
                <MypageListEach
                    key={idx}
                    idx={idx}
                    Id={info.requestId}
                    title={info.title}
                    modifiedAt={info.modifiedAt}
                    imgUrl={info.imgUrl}
                    category={info.category}
                    like={info.likes}
                    contents={info.contents}
                    />
                );
            })}
        </div>   
    );
};

const Title = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  padding: ${({ theme }) => theme.paddings.xxxl} 0px;
`;

export default MypostList;