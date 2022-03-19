import React, {useState,useRef} from 'react';

import { useSelector, useDispatch } from 'react-redux'; 
import { answerActions } from '../redux/modules/answer';
import { getUserId } from '../shared/cookie';
import { canWrite } from '../shared/conditions'; 

import AnswerContent from '../components/AnswerContent';
import CommentList from '../components/CommentList';
import RateBox from '../components/RateBox';
import Header from '../components/Header';

import {FiChevronRight} from 'react-icons/fi';

import styled from 'styled-components';

const AnswerDetail = (props) => {
    const dispatch = useDispatch();
    // 댓글창 열기위한 스테이트
    const [open, setOpen] = useState(false);

    // 타임스탬프용 Ref
    const videoRef = useRef();

    // 해당 응답글의 아이디, 내용
    const answerId = props.match.params.answerId;
    const answer = useSelector(state => state.answer.answer);

    // 응답글의 내용 서버에서 받아오기
    React.useEffect(()=>{
        dispatch(answerActions.getOneAnswer(answerId));
        return()=>{
            dispatch(answerActions.resetAnswer());
        }
    },[])

    if(!answer){
        return(
            <div>잠시만 기다려주시오</div>
        )
    }

    return (
        <React.Fragment>
            <Header />
            <Grid>
                <AnswerContent {...answer} videoRef={videoRef} />
                { canWrite(answer.requestWriterId) &&
                <RateBox answerId={answerId} />}
            </Grid>
            <CommentGrid>
                <OnOffBtn onClick={()=>{setOpen(!open)}} >
                    <Com>
                        댓글
                    </Com>
                    <Num>
                        {answer.commentCount}
                    </Num>
                    <Icon>
                        <FiChevronRight />
                    </Icon>
                </OnOffBtn>
            </CommentGrid>
            {open &&    
            <CommentList answerId={answerId} videoRef={videoRef} />}
            <div style={{height:'3rem',borderTop:'.08rem solid #efefef'}} ></div>
        </React.Fragment>
    )
}

const Grid = styled.div`
    padding: 0 ${({theme})=> theme.paddings.default};
`;

const CommentGrid = styled.div`
    padding: 0 ${({theme})=> theme.paddings.default};
    border-top: .08rem solid #efefef;
`;

const OnOffBtn = styled.div`
    font-size: ${({theme})=> theme.fontSizes.small};
    display: flex;
    padding: .5rem 0;
`;

const Com = styled.div`
    font-weight: 600;
`;

const Num = styled.div`
    margin-left: .2rem;
    color: #666;
`;

const Icon = styled.div`
    font-size: ${({theme})=>theme.fontSizes.base};
    color: #9e9e9e;
    padding-top: .1rem;
`

export default AnswerDetail;