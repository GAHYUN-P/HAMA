import React, { useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import styled from 'styled-components';
import MypageListEach from './MypageListEach';
import { mypageActions } from '../redux/modules/mypage';
import user from '../redux/modules/user';
import { history } from '../redux/configureStore';
import { IoIosArrowForward } from "react-icons/io";

const MypostList = (props) => {

    const dispatch = useDispatch();

    // 전체 리스트 불러오기
    React.useEffect(() => {
        dispatch(mypageActions.getMypost());
    }, []);

    
    const mypost_list = useSelector((state) => state.mypage.mypost);
    const prev_list = mypost_list.slice(0,2);
    console.log(prev_list);
    
    const onClickMypost = (e) => {
        dispatch(mypageActions.setDetail(e.target.value));
        console.log(e.target.value);
        history.push('/mypage_detail');
    }

    return (
        <div>
            <TitleWrap>
                <Title>내가 요청한 글</Title>
                <GotoDetail onClick={(e)=>{onClickMypost(e)}} value='mypost'>더보기<IconWrap><IoIosArrowForward/></IconWrap></GotoDetail>
            </TitleWrap>
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

const TitleWrap = styled.div`
  display: flex;
  justify-content: space-between;
  padding: ${({ theme }) => theme.paddings.xxxl} 0px;
`;

const Title = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.lg};
`;

const GotoDetail = styled.button`
  background-color: #fff;
  font-size: ${({ theme }) => theme.fontSizes.small};
  color: #6B6B6B;
  display: flex;
`;

const IconWrap = styled.div` 
    justify-content: center;
    align-items: center;
`;

export default MypostList;