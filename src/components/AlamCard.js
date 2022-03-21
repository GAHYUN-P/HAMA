import React from "react";
import styled from "styled-components";

import { useDispatch } from "react-redux";
import { alamActions } from "../redux/modules/alam";

import { setAlamContent } from "../shared/setAlamcontent";
import { typeEncoder } from "../shared/categoryEncoder";

import {BsX} from 'react-icons/bs';

import { history } from "../redux/configureStore";

const AlamCard = (props) => {
    const dispatch = useDispatch();
    const { alarmId ,id, senderNickName, alarmType, title, modifiedAt, readingStatus } = props;

    const MoveTo = () => {
        if(['likeP','answer'].includes(alarmType)){
            history.push(`/requestdetail/${id}`);
        }
        if(['comment','rate','rated','likeA'].includes(alarmType)){
            history.push(`/answerdetail/${id}`);
        }
        if(alarmType === 'child'){
            history.push(`/comment/${id}`);
        }
        if(alarmType === 'level'){
            history.push('/mypage');
        }
    }

    console.log(props);

    const deletAlarm = () => {
        dispatch(alamActions.deleteAlamDB(alarmId));
    }

    return (
        <React.Fragment>
            <Grid color={ readingStatus === 'N' ? '#000' : '#9e9e9e'} >
                <BtnGrid>
                    <TypeBtn>   
                        {typeEncoder(alarmType)}
                    </TypeBtn>
                </BtnGrid>
                <div onClick={MoveTo} style={{width:'70%'}}>
                    {setAlamContent(props)}
                </div>
                <ExBox onClick={deletAlarm}>
                    <BsX />
                </ExBox>
            </Grid>
        </React.Fragment>
    )
}

const Grid = styled.div`
    color: ${props => props.color};
    display: flex;
    padding: 1rem 0;
    border-bottom: 1px solid #ccc;
`;

const BtnGrid = styled.div`
    width: 20%;
    display: flex;
    justify-content: left;
    align-items: start;
`;

const TypeBtn = styled.div`
    color: #9e9e9e;
    padding: .15rem ${({theme})=> theme.paddings.small};
    border: .1rem solid #e4e4e4;
    border-radius: .8rem;
`;

const ExBox = styled.div`
    font-size: ${({theme})=> theme.fontSizes.xxxxl};
    color: #747474;
    width: 10%;
    display: flex;
    justify-content: right;
    align-items: center;
`;



export default AlamCard;