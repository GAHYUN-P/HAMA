import React from 'react';
import { history } from '../redux/configureStore';

import edit_pencil from '../assets/Edit_Pencil_Line_01.svg'

import styled from 'styled-components';

const AnswerWriteBtn = (props) => {
    const { postId } =props;

    if(1){
        return(
            <React.Fragment>
                <Locater2>
                    <PenIcon url={edit_pencil} />
                    <AnswerBtn 
                    onClick={()=>{history.push(`/answer/${postId}`)}}>
                        답글쓰기
                    </AnswerBtn>
                </Locater2>
            </React.Fragment>
        )
    }

    return (
    <React.Fragment>   
        <Locater>
            <PenIcon url={edit_pencil} />
            <AnswerBtn 
            onClick={()=>{history.push(`/answer/${postId}`)}}>
                답글쓰기
            </AnswerBtn>
        </Locater>
    </React.Fragment>
    )
}

const Locater = styled.div`
    display: flex;
    justify-content: right;
    margin: ${({theme})=>theme.margins.xxxl} 0 ${({theme})=>theme.margins.divGap};
`;
const Locater2 = styled.div`
    width: 100%;
    display: flex;
    justify-content: right;
    margin-bottom: .5rem;
`;

const PenIcon = styled.div`
    width: 1.3rem;
    height: 1.3rem;
    background-image: url(${props => props.url});
    background-size: cover;
`;

const AnswerBtn = styled.button `
    font-size: ${({theme})=>theme.fontSizes.lg};
    padding: 0 .3rem 0;
    border: none;
    background-color: #fff;
    color: #666;
    cursor: pointer;
`;

export default AnswerWriteBtn;