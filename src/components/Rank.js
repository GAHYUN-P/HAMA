import React from 'react';
import { useSelector,useDispatch } from 'react-redux';
import styled from 'styled-components';
import { pointActions } from '../redux/modules/point';
import { rankActions } from '../redux/modules/rank';

const Rank = (props) => {

    return (
    <RankBox>
        <div>{props.rank}</div>
        <div>
            <div>{props.nickname}</div>
            <div>{props.hippoName}</div>
        </div>
        <div>{props.status}</div>
    </RankBox>
    );
};

const RankBox = styled.div`
    display: flex;
    justify-content: space-between;
    background-color: #fff;
    width: 100%;
    height: 3.5rem;
    border-radius: 10px;
    box-shadow: 0px 1px 6px 1px rgba(0, 0, 0, 0.05);
    padding: ${({ theme }) => theme.paddings.base};
    margin: ${({ theme }) => theme.margins.base} auto;
`;

export default Rank;