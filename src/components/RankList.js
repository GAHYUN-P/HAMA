import React from 'react';
import { useSelector,useDispatch } from 'react-redux';
import styled from 'styled-components';
import { pointActions } from '../redux/modules/point';
import { rankActions } from '../redux/modules/rank';
import Rank from './Rank';

const RankList = (props) => {

    // 컴포넌트 불러질때 처음에 리스트 불러오기
    // 배열에 넣고 map 돌리기
    // 새로고침 버튼 누르면 다시 리스트 불러오기
    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(rankActions.getRankList());
    }, []);

    const rankList = useSelector((state) => state.rank.data);
    // console.log(rankList);
    // console.log(rankList[0].rank);

    const updateRank = () => {
        dispatch(rankActions.getRankList());
        console.log('업뎃됨!');
    }

    return (
    <div>
        <TitleWrap>
          <div>유저 랭킹 TOP 5</div>
          <button onClick={updateRank}>refresh</button>
        </TitleWrap>
        {rankList.map((info, idx) => {
          return (
            <Rank
              key={idx}
              rank={info.rank}
              nickname={info.nickname}
              point={info.point}
              status={info.status}
              is_changed={info.is_changed}
            />
          );
        })}
    </div>
    );
};

const TitleWrap = styled.div`
    display: flex;
    font-size: ${({ theme }) => theme.fontSizes.lg};
    font-weight: 600;
`;

export default RankList;