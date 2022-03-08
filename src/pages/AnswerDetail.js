import React, {useState} from 'react';

import { useSelector, useDispatch } from 'react-redux'; 
import { answerActions } from '../redux/modules/answer';
import { getUserId } from '../shared/cookie';

import AnswerContent from '../components/AnswerContent';
import CommentList from '../components/CommentList';
import RateBox from '../components/RateBox';

const AnswerDetail = (props) => {
    const dispatch = useDispatch();
    // 댓글창 열기위한 스테이트
    const [open, setOpen] = useState(false);

    // 해당 응답글의 아이디, 내용
    const answerId = props.match.params.answerId;
    const answer = useSelector(state => state.answer.answer);

    // 응답글의 내용 서버에서 받아오기
    React.useEffect(()=>{
        dispatch(answerActions.getOneAnswer(answerId));
    },[])

    return (
        <React.Fragment>
            <div style={{width:'90%', margin:'0 auto'}}>
                <AnswerContent {...answer} />
                {answer.requestWriterId === Number(getUserId()) &&
                <RateBox answerId={answerId} />}
                <button onClick={()=>{setOpen(!open)}} >
                    {open ? '닫기':'댓글'}{!open ? answer.commentCount : ''}
                </button>
                {open &&
                <CommentList />}
            </div>
        </React.Fragment>
    )
}

export default AnswerDetail;