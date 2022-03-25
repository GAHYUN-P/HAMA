import React, { useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import styled from 'styled-components';
import MypageListEach from './MypageListEach';
import { mypageActions } from '../redux/modules/mypage';
import { userpageActions } from '../redux/modules/userpage';
import { history } from '../redux/configureStore';
import { IoIosArrowForward } from "react-icons/io";

const MyanswerList = (props) => {

    const dispatch = useDispatch();

    // 전체 리스트 불러오기
    React.useEffect(() => {
        if(props.userpage) {
            dispatch(userpageActions.getMyanswer(props.id));
        }
        if(props.mypage) {
            dispatch(mypageActions.getMypost());
        }
    }, []);


    const myanswer_list = useSelector((state) => state.mypage.myanswer);
    const useranswer_list = useSelector((state) => state.userpage.myanswer);
    
    const prev_list = [];
    if(props.mypage) {
        prev_list.push(...myanswer_list.slice(0,2));
    }
    if(props.userpage) {
        prev_list.push(...useranswer_list.slice(0,2));
    }
    console.log(prev_list);

    const onClickMyanswer = (e) => {
        dispatch(mypageActions.setDetail(e.target.value));
        history.push('/mypage_detail');
    }
    
    return (
        <div>
            <TitleWrap>
                {props.mypage &&
                    <Title>내가 답변한 글</Title>
                }
                {props.userpage &&
                    <Title>{props.nickname}님이 답변한 글</Title>
                }
                <GotoDetail onClick={(e)=>{onClickMyanswer(e)}} value='myanswer'>더보기<IconWrap><IoIosArrowForward/></IconWrap></GotoDetail>
            </TitleWrap>
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

export default MyanswerList;