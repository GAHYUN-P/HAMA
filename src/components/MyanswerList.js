import React, { useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import styled from 'styled-components';
import MypageListEach from './MypageListEach';
import { mypageActions } from '../redux/modules/mypage';

const MyanswerList = (props) => {

    const dispatch = useDispatch();

    // 전체 리스트 불러오기
    React.useEffect(() => {
        dispatch(mypageActions.getMyanswer());
    }, []);

    const myanswer_list = useSelector((state) => state.mypage.myanswer);
    const prev_list = myanswer_list.slice(0,2);
    console.log(myanswer_list);

    return (
        <div>
            <Title>내가 답변한 글</Title>
            {prev_list.map((info, idx) => {
                return (
                <MypageListEach
                    key={idx}
                    idx={idx}
                    title={info.title}
                    Id={info.answerId}
                    modifiedAt={info.modifiedAt}
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

export default MyanswerList;