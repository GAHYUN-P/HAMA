import React from 'react';
import { useSelector,useDispatch } from 'react-redux';
import styled from 'styled-components';
import { pointActions } from '../redux/modules/point';
import { rankActions } from '../redux/modules/rank';

import Profile from '../elements/ProfileImg';

import No_1 from '../assets/1.svg';
import No_2 from '../assets/2.svg';
import No_3 from '../assets/3.svg';
import No_4 from '../assets/4.svg';
import No_5 from '../assets/5.svg';

import { statusColor } from '../shared/categoryEncoder';

const Rank = (props) => {
    let { rank, nickname, hippoName, imgUrl, status, point } =props;
    const rankArr = [No_1,No_2,No_3,No_4,No_5]; 
    imgUrl = imgUrl.split('circle')[0] + imgUrl.split('circle')[1];


    return (
    <RankBox>
        <div style={{position:'relative'}} >
            <RankImg src={rankArr[rank - 1]} />
            <Profile shape='square' src={imgUrl} size='3rem' />
        </div>
        <UserGrid>
            <div id='nick' >{nickname}</div>
            <div id='hippo' >{point} exp</div>
        </UserGrid>
        <Status color={statusColor(status)} >{status.toUpperCase()}</Status>
    </RankBox>
    );
};

const RankImg = styled.img`
    width: 1.5rem;
    position :absolute;
    top: -.8rem;
    left: -.4rem;
`;

const UserGrid = styled.div`
    width: 15rem;
    padding: 0 ${({theme})=> theme.paddings.base};
    #nick{
        color: #212121;
        font-size: ${({theme})=> theme.fontSizes.lg};
    }
    #hippo{
        padding-top: .3rem;
        color: #666;
        font-size: ${({theme})=> theme.fontSizes.base};
    }
`;

const Status = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 3.8rem;
    height: 3rem;
    color: ${props => props.color};
    border-radius: .3rem;
    background-color: #f5f5f5;
`;

const RankBox = styled.div`
    display: flex;
    background-color: #fff;
    width: 100%;
    border-radius: 10px;
    box-shadow: 0px 1px 6px 1px rgba(0, 0, 0, 0.05);
    padding: ${({ theme }) => theme.paddings.base};
    margin: ${({ theme }) => theme.margins.base} auto;
`;

export default Rank;