import React from 'react';

import { useSelector, useDispatch } from 'react-redux'; 
import { answerActions } from '../redux/modules/answer';

import AnswerContent from '../components/AnswerContent';
import RateBox from '../components/RateBox';
import AnswerComments from '../components/AnswerComments';

const AnswerDetail = (props) => {
    const dispatch = useDispatch();
    // 댓글 내용 받아오기
    const commentRef = React.useRef();
    
    // 해당 응답글의 아이디, 내용, 댓글
    const answerId = props.match.params.answerId;
    const answer = useSelector(state => state.answer.answer);
    const commnetList = useSelector(state => state.answer.comments);

    // 응답글의 내용 서버에서 받아오기
    React.useEffect(()=>{
        dispatch(answerActions.getOneAnswer(answerId));
    },[])

    // 댓글 추가하기 버튼
    const addComment = () => {
        const data = {
            answerId: answerId,
            comment: commentRef.current.value,
            parentCommentId: commentRef.current.parentId ? commentRef.current.parentId : null ,
        }
        console.log(data);
        dispatch(answerActions.addCommentDB(data));
        commentRef.current.value = '';
        commentRef.current.placeholder = '댓글을 작성해주세요.';
    }
    

    return (
        <React.Fragment>
            <div style={{width:'90%', margin:'0 auto'}}>
                <AnswerContent {...answer} />
                <RateBox answerId={answerId} />
                <div style={{display:'flex'}} >
                    <input 
                    type='text'
                    placeholder='댓글을 작성해주세요.' 
                    ref={commentRef}
                    style={{ borderRadius:'10px', padding:'4px' }}/>
                    <button onClick={addComment} >작성</button>
                </div>
                {commnetList.map((c,i)=>{
                    return (<AnswerComments commentRef={commentRef} {...c} key={i} />)
                })}
            </div>
        </React.Fragment>
    )
}

export default AnswerDetail;