import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { answerActions } from "../redux/modules/answer";

import Star_c from '../assets/Star_c.svg'
import Star_g from '../assets/Star_g.svg'

import styled from "styled-components";

const RateBox = (props) => {
    const dispatch = useDispatch();
    // 따로 점수를 빼온 이유는 리덕스상 구독을 통해 변화를 만들기 위함
    const starPoint = useSelector(state => state.answer.answer.star);
    // 점수를 설정해주는 스테이트
    const [point, setPoint] = React.useState(0);

    // map함수를 사용하기위한 배열
    const arr = [1,2,3,4,5];

    // 점수를 줄 때 작동하는 함수
    const rating = () => {
        // 점수는 최소 1점 이상을 주어야 한다.
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

    // 이미 평가가 된 상태라면 적어도 1이상이기 때문에 평가가 끝난 상태임을 알 수 있다.
    // 이를 바탕으로 점수를 표기해줌
    if(starPoint > 0){
        return (
            <React.Fragment>
            <div style={{padding:'10px 0'}} >
                <div style={{ display:'flex' }} >
                    <div>평가완료</div>
                </div>
                <StarBox>
                    {arr.map((m,i)=>{
                        return(<Elstar key={m} url={starPoint > i ? Star_c:Star_g} />)
                    })}
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
                    {arr.map((n,i)=>{
                        return (<Elstar key={i} onClick={()=>{setPoint(n)}} url={point > i ? Star_c : Star_g } />)
                    })}
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