import React, {useState,useRef} from 'react';

import { useSelector, useDispatch } from 'react-redux'; 
import { answerActions } from '../redux/modules/answer';
import { canRate } from '../shared/conditions'; 

import AnswerContent from '../components/AnswerContent';
import CommentList from '../components/CommentList';
import RateBox from '../components/RateBox';
import SharedBtn from '../elements/SharedBtn';
import Header from '../components/Header';
import Footer from '../components/Footer';
import WaitForAMoment from '../components/WaitForAMoment';

import {FiChevronRight} from 'react-icons/fi';

import styled from 'styled-components';

const AnswerDetail = (props) => {
    const dispatch = useDispatch();
    // 댓글창 열기위한 스테이트
    const [open, setOpen] = useState(false);

    // 타임스탬프용 Ref
    const videoRef = useRef();

    // 해당 응답글의 아이디, 내용
    const answerId = Number(props.match.params.answerId);
    const answer = useSelector(state => state.answer.answer);

    console.log(answer);

    // 응답글의 내용 서버에서 받아오기
    React.useEffect(()=>{
        dispatch(answerActions.getOneAnswer(answerId));
    },[])

    if(answer.answerId !== answerId){
        return(
            <div style={{width:'100%',height:'100vh',position:'relative'}} >
                <WaitForAMoment is_loading />
            </div>
        )
    }

    return (
        <React.Fragment>
            <Header />
            <Grid>
                <AnswerContent {...answer} videoRef={videoRef} />
                { canRate(answer.requestWriterId) &&
                <RateBox answerId={answerId} />}
            </Grid>
            {/* <CommentGrid2>
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
            </CommentGrid2> */}
            <ShareGrid>
                <SharedBtn {...answer} />
            </ShareGrid>
            <CommentList answerId={answerId} videoRef={videoRef} commentCount={answer.commentCount} />
            <div style={{height:'4.6rem',borderTop:'.08rem solid #efefef'}} ></div>
            <Footer />
        </React.Fragment>
    )
}

const Grid = styled.div`
    padding: 0 ${({theme})=> theme.paddings.default};
`;

const ShareGrid = styled.div`
    padding: ${({theme})=> theme.paddings.base} ${({theme})=> theme.paddings.default};
    display: flex;
    justify-content: right;
`;

export default AnswerDetail;