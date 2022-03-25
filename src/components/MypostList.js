import React, { useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import styled from 'styled-components';
import MypageListEach from './MypageListEach';
import { mypageActions } from '../redux/modules/mypage';
import { userpageActions } from '../redux/modules/userpage';
import user from '../redux/modules/user';
import { history } from '../redux/configureStore';
import { IoIosArrowForward } from "react-icons/io";


const MypostList = (props) => {

    console.log(props.userpage);

    const dispatch = useDispatch();


    // 전체 리스트 불러오기
    React.useEffect(() => {
        if(props.userpage) {
            dispatch(userpageActions.getMypost(props.id));
        }
        if(props.mypage) {
            dispatch(mypageActions.getMypost());
        }
    }, []);

    
    const mypost_list = useSelector((state) => state.mypage.mypost);
    const userpost_list = useSelector((state) => state.userpage.mypost);

    const prev_list = [];
    if(props.mypage) {
        prev_list.push(...mypost_list.slice(0,2));
    }
    if(props.userpage) {
        prev_list.push(...userpost_list.slice(0,2));
    }
    console.log(prev_list);
    
    const onClickMypost = (e) => {
        if(props.mypage) {
            dispatch(mypageActions.setDetail(e.target.value));
            console.log(e.target.value);
            history.push('/mypage_detail');
        }
        if(props.userpage) {
            dispatch(userpageActions.setDetail(e.target.value));
            console.log(e.target.value);
            history.push(`/userpage_detail/${props.id}`);
        }
    }

    return (
        <div>
            <TitleWrap>
                {props.mypage &&
                    <Title>내가 요청한 글</Title>
                }
                {props.userpage &&
                    <Title>{props.nickname}님이 요청한 글</Title>
                }
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