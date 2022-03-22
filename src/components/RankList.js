import React from 'react';
import { useSelector,useDispatch } from 'react-redux';
import styled from 'styled-components';
import { pointActions } from '../redux/modules/point';
import { rankActions } from '../redux/modules/rank';
import { IoRefresh } from "react-icons/io5";

import Rank from './Rank';
import moment from 'moment';

const RankList = (props) => {

    // 컴포넌트 불러질때 처음에 리스트 불러오기
    // 배열에 넣고 map 돌리기
    // 새로고침 버튼 누르면 다시 리스트 불러오기
    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(rankActions.getRankList());
    }, []);

    const rankList = useSelector((state) => state.rank.data);
    const nowTime = moment().format('YYYY.MM.DD HH:mm');

    const updateRank = () => {
        dispatch(rankActions.getRankList());
        console.log('업뎃됨!');
    }

    return (
    <div>
        <TitleWrap>
          <div>유저 랭킹 TOP 5</div>
          <Icon>
            <IoRefresh onClick={updateRank}/>
          </Icon>
        </TitleWrap>
        <Nowtime>{nowTime} 기준</Nowtime>
        {rankList.map((info, idx) => {
          return (<Rank key={idx} {...info}/>);
        })}
    </div>
    );
};

const TitleWrap = styled.div`
    display: flex;
    font-size: ${({ theme }) => theme.fontSizes.lg};
    font-family: Noto-Sans-KR-M;
    margin-top: ${({ theme }) => theme.margins.xxl};;
`;

const Icon = styled.div`
    color: ${({ theme }) => theme.fontColors.gray};
    margin-left: 5px;
    padding-bottom: 1px;
    transform: rotate(35deg);
`;

const Nowtime = styled.div`
    color: ${({ theme }) => theme.fontColors.gray};
    font-size: ${({ theme }) => theme.fontSizes.small};
`;

export default RankList;