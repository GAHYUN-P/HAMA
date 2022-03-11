import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { answerActions } from "../redux/modules/answer";

import styled from "styled-components";

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
                <div>
                    <Elstar starColor={starPoint > 0 ? '#ffcd48':'#eee'} />
                    <Elstar starColor={starPoint > 1 ? '#ffcd48':'#eee'} />
                    <Elstar starColor={starPoint > 2 ? '#ffcd48':'#eee'} />
                    <Elstar starColor={starPoint > 3 ? '#ffcd48':'#eee'} />
                    <Elstar starColor={starPoint > 4 ? '#ffcd48':'#eee'} />
                </div>
            </div>
        </React.Fragment>
        )
    }

    return (
        <React.Fragment>
            <div style={{padding:'10px 0'}} >
                <div style={{ display:'flex' }} >
                    <div>평가해 주세요</div>
                    <button onClick={rating} >등록</button>
                </div>
                <div>
                    <Elstar onClick={()=>{setPoint(1)}} starColor={point > 0 ? '#ffcd48':'#eee'} />
                    <Elstar onClick={()=>{setPoint(2)}} starColor={point > 1 ? '#ffcd48':'#eee'} />
                    <Elstar onClick={()=>{setPoint(3)}} starColor={point > 2 ? '#ffcd48':'#eee'} />
                    <Elstar onClick={()=>{setPoint(4)}} starColor={point > 3 ? '#ffcd48':'#eee'} />
                    <Elstar onClick={()=>{setPoint(5)}} starColor={point > 4 ? '#ffcd48':'#eee'} />
                </div>
            </div>
        </React.Fragment>
    )
};

const Elstar = styled.div`
    width: 20px;
    margin: 10px;
    display: inline-block;
    height: 20px;
    border: 1px solid black;
    border-radius: 20px;
    box-sizing: border-box;
    background-color: ${props => props.starColor};
`;

export default RateBox;