import React, { useRef } from 'react';

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

import styled from 'styled-components';

const AnswerDetail = (props) => {
    const dispatch = useDispatch();

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

    // 리덕스 상의 답변글의 아이디와 파람즈로 넘겨받은 아이디가 다를 경우 로딩창을 띄워줌
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
                {/* 답변글의 내용을 담아내는 컴포넌트 따라서 응답글의 데이터와 댓글과의 타임스탬프 연동을
                위한 viideoRef를 props로 넘겨줌 */}
                <AnswerContent {...answer} videoRef={videoRef} />
                {/* 현재 로그인한 유저가 요청글의 작성자의 아이디와 같다면 평가박스를 열어주는 조건식 */}
                { canRate(answer.requestWriterId) &&
                // 어떤 글을 평가해야하는지 알기위한 답변글 아이디를 넘겨줌
                <RateBox answerId={answerId} />}
            </Grid>
            <ShareGrid>
                {/* 공유 시 띄워줄 정보를 위해 답변글의 정보를 넘겨줌 */}
                <SharedBtn {...answer} />
            </ShareGrid>
            {/* 댓글 리스트 작성 시 필요한 답변글의 아이디와 비디오와의 타임스탬프 연동을 위한 
            videoRef, 전체 댓글의 갯수를 알려주는 commentCount를 props로 넘겨줌 */}
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