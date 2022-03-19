import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { answerActions } from "../redux/modules/answer";

import Star_c from '../assets/Star_c.svg'
import Star_g from '../assets/Star_g.svg'

import styled from "styled-components";
import { style } from "@mui/system";

const RateBox = (props) => {
    const dispatch = useDispatch();
    const starPoint = useSelector(state => state.answer.answer.star);
    const [point, setPoint] = React.useState(0);

    const rating = () => {
        if(point === 0){
            window.alert('적어도 1점은 주셔야 합니다!')
            return
        }
        const data = {
            answerId: props.answerId,
            star: point
        }
        dispatch(answerActions.starDB(data));
    }

    if(starPoint > 0){
        return (
            <React.Fragment>
            <div style={{padding:'10px 0'}} >
                <div style={{ display:'flex' }} >
                    <div>평가완료</div>
                </div>
                <StarBox>
                    <Elstar url={starPoint > 0 ? Star_c:Star_g} />
                    <Elstar url={starPoint > 1 ? Star_c:Star_g} />
                    <Elstar url={starPoint > 2 ? Star_c:Star_g} />
                    <Elstar url={starPoint > 3 ? Star_c:Star_g} />
                    <Elstar url={starPoint > 4 ? Star_c:Star_g} />
                </StarBox>
            </div>
        </React.Fragment>
        )
    }

    return (
        <React.Fragment>
            <div style={{padding:'10px 0'}} >
                <div style={{ display:'flex',justifyContent:'space-between'}} >
                    <Please>
                        답변이 만족스러웠다면 평가를 남겨주세요!
                    </Please>
                    <PlzBtn onClick={rating} >
                        등록
                    </PlzBtn>
                </div>
                <StarBox>
                    <Elstar onClick={()=>{setPoint(1)}} url={point > 0 ? Star_c : Star_g } />
                    <Elstar onClick={()=>{setPoint(2)}} url={point > 1 ? Star_c : Star_g } />
                    <Elstar onClick={()=>{setPoint(3)}} url={point > 2 ? Star_c : Star_g } />
                    <Elstar onClick={()=>{setPoint(4)}} url={point > 3 ? Star_c : Star_g } />
                    <Elstar onClick={()=>{setPoint(5)}} url={point > 4 ? Star_c : Star_g } />
                    <Point>{point}점</Point>
                </StarBox>
            </div>
        </React.Fragment>
    )
};

const StarBox = styled.div`
    display: flex;
    padding: ${({theme})=> theme.margins.xxl} 0;
    margin-top: .3rem;
    justify-content: center;
    align-items: center;
    width: 100%;
    border-radius: .3rem;
    background-color: #f8f8fa;
`;

const Please = styled.div`
    font-size: ${({theme})=> theme.fontSizes.small};
`;

const PlzBtn = styled.button`
    border: none;
    background-color: #fff;
    font-size: ${({theme})=> theme.fontSizes.xsmall};
    color: #9e9e9e;
`;

const Point = styled.div`
    font-size: ${({theme})=> theme.fontSizes.small};
    margin-left: .25rem;
    color: #666;
`;

const Elstar = styled.div`
    width: 1.5rem;
    height: 1.5rem;
    margin: 0 .25rem;
    box-sizing: border-box;
    background-image: url(${props => props.url});
    background-size: cover;
`;

export default RateBox;