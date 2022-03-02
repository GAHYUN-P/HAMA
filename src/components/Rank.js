import React from 'react';
import { useSelector,useDispatch } from 'react-redux';
import styled from 'styled-components';
import { pointActions } from '../redux/modules/point';
import { rankActions } from '../redux/modules/rank';

const Rank = (props) => {

    return (
    <div>
        <div>{props.rank} | {props.nickname} | {props.point} | {props.status}</div>
    </div>
    );
};

export default Rank;