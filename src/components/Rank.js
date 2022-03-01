import React from 'react';
import { useSelector,useDispatch } from 'react-redux';
import styled from 'styled-components';
import { pointActions } from '../redux/modules/point';
import { rankActions } from '../redux/modules/rank';

const Rank = (props) => {
    
    // 포인트 가져와서
    const point = useSelector((state) => state.point.point);

    const rank = useSelector((state) => state.rank.rank);
    const nickname = useSelector((state) => state.rank.nickname);
    const status = useSelector((state) => state.rank.status);
    const is_changed = useSelector((state) => state.rank.is_changed);    

    return (
    <div>
        <div>{rank} | {nickname} | {status}</div>
    </div>
    );
};

export default Rank;