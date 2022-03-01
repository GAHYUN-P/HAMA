import React from 'react';
import { useSelector,useDispatch } from 'react-redux';
import styled from 'styled-components';
import { pointActions } from '../redux/modules/point';
import { rankActions } from '../redux/modules/rank';

const RankList = (props) => {

    // 컴포넌트 불러질때 처음에 리스트 불러오기
    // 배열에 넣고 map 돌리기
    // 새로고침 버튼 누르면 다시 리스트 불러오기
    

    const point = useSelector((state) => state.point.point);

    const rank = useSelector((state) => state.rank.rank);
    const nickname = useSelector((state) => state.rank.nickname);
    const status = useSelector((state) => state.rank.status);
    const is_changed = useSelector((state) => state.rank.is_changed);



    const dispatch = useDispatch();
    const increment = () => {
        const new_point = point + 1;
        dispatch(pointActions.gainpoint(new_point));
    };

    // 포인트 변경될때마다 새랭크 리스트 리랜더링
    React.useEffect(() => {
        const new_rank = rank + 1;
        dispatch(rankActions.setRank(new_rank));
    }, [point]);

    

    return (
    <div>
        <div>{rank} | {nickname} | {status}</div>
        <div>{point}점</div>
        <button onClick={increment}>증가</button>
    </div>
    );
};

export default RankList;